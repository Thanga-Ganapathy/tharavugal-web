import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DialogWindow({
  title,
  open,
  onClose,
  children,
  variant = 'default',
}) {
  const variants = {
    default: 'xs',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    full: false,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={variants[variant]}
    >
      <DialogTitle variant="h6" color="primary" align="center">
        {title}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minHeight: '500px' }}>{children}</DialogContent>
    </Dialog>
  );
}
