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
import HeadingWithDivider from './HeadingWithDivider';
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
        maxWidth="lg"
        title="Preview"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'grid' },
            gridTemplateColumns: { md: '75fr 10px 25fr' },
            flexDirection: { xs: 'column', sm: 'column' },
          }}
        >
          <Box sx={{ p: 1 }}>
            {data.publicAccess && (
              <ProgressiveImg
                alt={data.name}
                src={`${domain}/${data.file?.loc}`}
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
            <HeadingWithDivider title="Details" />
            <table>
              <tbody>
                <tr>
                  <Box component="td" sx={{ p: 1 }}>
                    Name
                  </Box>
                  <Box component="td" sx={{ px: 2 }}>
                    {data.name}
                  </Box>
                </tr>
                <tr>
                  <Box component="td" sx={{ p: 1 }}>
                    Description
                  </Box>
                  <Box component="td" sx={{ px: 2 }}>
                    {data.desc}
                  </Box>
                </tr>
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
          </Box>
        </Box>
      </DialogWindow>
    </>
  );
}
