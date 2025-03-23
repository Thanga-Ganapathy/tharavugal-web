import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import ActionMenu from './ActionMenu';

interface ListProps {
  data: Array<{ id: string; msg: string; url: string; createdAt: string }>;
  isLoading: boolean;
}

export default function List({ data = [], isLoading }: ListProps) {
  const columns: GridColDef[] = [
    { field: 'msg', headerName: 'Msg', width: 300 },
    { field: 'url', headerName: 'URL', width: 150 },
    { field: 'createdAt', headerName: 'Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
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
