import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import DialogWindow from '@/components/DialogWindow';
import New from '@/components/admin/foodIngredients/New';
import List from '@/components/admin/foodIngredients/List';

export default function FoodIngredients() {
  const [open, setOpen] = useState(false);
  const {
    data: foodIngredients,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/food-ingredients');

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Food Ingredients</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              New
            </Button>
          </Box>
          <Paper sx={{ mt: 2 }}>
            <List data={foodIngredients?.data} />
          </Paper>

          <DialogWindow
            open={open}
            onClose={handleClose}
            title="New Food Ingredient"
          >
            <New onClose={handleClose} />
          </DialogWindow>
        </Box>
      </Box>
    </Layout>
  );
}
