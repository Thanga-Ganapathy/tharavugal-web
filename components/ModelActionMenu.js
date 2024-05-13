import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import APIClient from '@/utils/APIClient';
import useAlert from '@/hooks/useAlert';
import DialogWindow from '@/components/DialogWindow';

export default function ActionMenu({ row, url, Edit, actions = [], mutate }) {
  const [editOpen, setEditOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const showAlert = useAlert();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleClose();
    if (window.confirm('Delete?')) {
      const result = await APIClient.delete(url, {
        id: row.id,
      });
      if (result.ok) {
        showAlert('success', result.data.message);
        mutate();
      } else {
        showAlert('error', result.data.message);
      }
    }
  };

  const handleEdit = () => {
    handleClose();
    setEditOpen(true);
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
        <MenuItem onClick={handleEdit}>
          <EditIcon
            fontSize="18"
            sx={{ mr: 1, color: (theme) => theme.palette.text.secondary }}
          />{' '}
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon
            fontSize="18"
            sx={{ mr: 1, color: (theme) => theme.palette.text.secondary }}
          />{' '}
          Delete
        </MenuItem>
        {actions.map((a, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              a.handler();
              handleClose();
            }}
          >
            {a.label}
          </MenuItem>
        ))}
      </Menu>
      <DialogWindow
        title="Update"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        variant="md"
      >
        <Edit record={row} mutate={mutate} />
      </DialogWindow>
    </div>
  );
}
