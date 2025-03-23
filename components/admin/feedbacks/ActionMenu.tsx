import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import APIClient from '@/utils/APIClient';
import useAlert from '@/hooks/useAlert';

interface ActionMenuProps {
  row: { id: number };
}

export default function ActionMenu({ row }: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const showAlert = useAlert();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleClose();
    if (window.confirm('Delete?')) {
      const result = await APIClient.delete('/api/admin/feedbacks', {
        id: row.id,
      });
      if (result.ok) {
        showAlert('success', result.data.message);
      } else {
        showAlert('error', result.data.message);
      }
    }
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon
            fontSize="small"
            sx={(theme) => ({
              mr: 1,
              color: theme.palette.text.secondary,
            })}
          />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
