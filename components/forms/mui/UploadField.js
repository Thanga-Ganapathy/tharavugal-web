import APIClient from '@/utils/APIClient';
import { Box, Button, LinearProgress } from '@mui/material';
import { useField } from '@opentf/react-form';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filesize } from 'filesize';
import { percentage } from '@opentf/utils';

const FIVE_MB = 1024 ** 2 * 5;

export default function UploadField({
  name,
  label,
  uploadPath,
  disabled = false,
}) {
  const { field, error } = useField(name);
  const [state, setState] = useState({
    file: null,
    isUploading: false,
    uploadProgress: 0,
    multipart: false,
    done: false,
  });

  const handleChange = async (e) => {
    setState({ ...state, file: e.target.files[0] });
  };

  async function upload(key) {
    setState({ ...state, isUploading: true });

    try {
      const urlRes = await APIClient.post('/api/uploads', {
        key,
      });
      const res = await fetch(urlRes.data.signedUrl, {
        method: 'PUT',
        body: state.file,
        mode: 'cors',
      });
      setState({ ...state, done: true });
      field.onChange({
        loc: key,
        size: state.file.size,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateState(newState) {
    return new Promise((resolve) => {
      setState((s) => ({ ...s, ...newState }));
      resolve();
    });
  }

  async function uploadParts(key) {
    setState({ ...state, isUploading: true, multipart: true });

    const chunks = Math.ceil(state.file.size / FIVE_MB);
    const multiPartRes = await APIClient.post('/api/uploads', {
      key,
      multiPart: true,
    });

    for (let i = 0; i < chunks; i++) {
      const blob = state.file.slice(FIVE_MB * i, FIVE_MB * (i + 1));
      const uploadPartSignedURLRes = await APIClient.post('/api/uploads', {
        key,
        uploadPart: true,
        partNumber: i + 1,
        uploadID: multiPartRes.data.uploadID,
      });
      await fetch(uploadPartSignedURLRes.data.signedUrl, {
        method: 'PUT',
        body: blob,
        mode: 'cors',
      });
      await updateState({
        uploadProgress: Math.round(percentage(i + 1, chunks)),
      });
    }

    await APIClient.post('/api/uploads', {
      key,
      completePart: true,
      uploadID: multiPartRes.data.uploadID,
    });
    setState({ ...state, done: true });
    field.onChange({
      loc: key,
      size: state.file.size,
    });
  }

  const handleUpload = async () => {
    const key =
      uploadPath + '/' + uuidv4() + '.' + state.file.name.split('.').pop();

    if (state.file.size > FIVE_MB) {
      uploadParts(key);

      return;
    }

    upload(key);
  };

  const renderUploadBtn = () => {
    if (state.file && !state.isUploading && !state.done) {
      const fsz = filesize(state.file.size);
      return (
        <Button variant="outlined" size="small" onClick={handleUpload}>
          {`Upload ${fsz}`}
        </Button>
      );
    }
  };

  if (field.value) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          ✔️ {typeof field.value === 'string' ? field.value : field.value.loc}
        </Box>
        <Box>
          <Button variant="outlined" color="error" size="small">
            Remove
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="fieldset"
      sx={{
        borderColor: Boolean(error)
          ? (t) => t.palette.error.light
          : 'lightgray',
      }}
    >
      <legend>{label}</legend>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <input disabled={disabled} type="file" onChange={handleChange} />
        {renderUploadBtn()}
      </Box>
      {state.done && <Box mt={2}>✔️ Uploaded</Box>}
      {state.isUploading && (
        <LinearProgress
          variant={state.multipart ? 'determinate' : 'indeterminate'}
          value={state.uploadProgress}
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
}
