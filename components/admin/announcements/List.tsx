import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ActionMenu from './ActionMenu';

interface ListProps {
  data: Array<{ id: string; [key: string]: any }>;
}

export default function List({ data = [] }: ListProps) {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => <ActionMenu row={params.row} />,
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight />
    </Box>
  );
}
