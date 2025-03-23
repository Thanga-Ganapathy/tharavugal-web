import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ProgressiveImgProps {
  src: string;
  alt: string;
  [key: string]: any;
}

export default function ProgressiveImg({ src, alt, ...otherProps }: ProgressiveImgProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  if (imgSrc) {
    return (
      <Box
        component="img"
        src={imgSrc}
        alt={alt}
        {...otherProps}
        sx={{ maxInlineSize: '100%', blockSize: 'auto' }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="body1">Loading Image...</Typography>
    </Box>
  );
}
