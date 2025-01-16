import {
  Box,
  Paper,
  Typography,
  Alert,
  AlertTitle,
  Divider,
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ProgressiveImg from './ProgressiveImg';
import DialogWindow from './DialogWindow';
import { useState } from 'react';
import { filesize } from 'filesize';

export default function Resource({ domain, data }) {
  const [open, setOpen] = useState(false);

  const renderThumb = () => {
    if (data.thumb) {
      return (
        <ProgressiveImg alt={data.name} src={`${domain}/${data.thumb.loc}`} />
      );
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ImageOutlinedIcon
          sx={{ width: '50px', height: '50px', color: 'lightgray' }}
        />
      </Box>
    );
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{ m: 2, p: 2, cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        {renderThumb()}
        <Typography variant="subtitle1">{data.name}</Typography>
      </Paper>
      <DialogWindow
        variant="lg"
        title="Preview"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'grid' },
            gridTemplateColumns: { md: '25fr 10px 75fr' },
            flexDirection: { xs: 'column', sm: 'column' },
          }}
        >
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
            {data.publicAccess && (
              <ProgressiveImg
                alt={data.name}
                src={`${domain}/${data.thumb?.loc}`}
              />
            )}
            {!data.publicAccess && (
              <Alert severity="error">
                <AlertTitle>Preview not available</AlertTitle>
                Sorry, due to our current infrastructure limitations, only
                members can access this content.
              </Alert>
            )}
          </Box>
          <Divider orientation="vertical" />
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6">{data.name}</Typography>
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              {data.desc}
            </Alert>
            <table>
              <tbody>
                <tr>
                  <Box component="td" sx={{ p: 1 }}>
                    Size
                  </Box>
                  <Box component="td" sx={{ px: 2 }}>
                    {data.file ? filesize(data.file?.size) : 'N/A'}
                  </Box>
                </tr>
                <tr>
                  <Box component="td" sx={{ p: 1 }}>
                    Uploaded By
                  </Box>
                  <Box component="td" sx={{ px: 2 }}>
                    Admin
                  </Box>
                </tr>
              </tbody>
            </table>
            <Alert severity="warning">
              Currently, only members can view original content.
            </Alert>
          </Box>
        </Box>
      </DialogWindow>
    </>
  );
}
