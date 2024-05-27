import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ActionMenu from './ActionMenu';

export default function List({ data = [], loading }) {
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell(params) {
        return <ActionMenu row={params.row} />;
      },
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight loading={loading} />
    </Box>
  );
}
