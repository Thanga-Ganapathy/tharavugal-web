import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ActionMenu from './ActionMenu';

export default function List({ data = [], isLoading }) {
  const columns = [
    { field: 'msg', headerName: 'Msg', width: 300 },
    { field: 'url', headerName: 'URL', width: 150 },
    { field: 'createdAt', headerName: 'Date', width: 150 },
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
      <DataGrid rows={data} columns={columns} autoHeight loading={isLoading} />
    </Box>
  );
}
