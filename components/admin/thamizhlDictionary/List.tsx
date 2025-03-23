import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';

interface ListProps {
  data: Array<{ id: number; word: string }>;
  mutate: () => void;
}

export default function List({ data = [], mutate }: ListProps) {
  const columns: GridColDef[] = [
    {
      field: 'word',
      headerName: 'Word',
      width: 150,
      valueGetter: (params) => params.row.word,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <ModelActionMenu
          mutate={mutate}
          url="/api/admin/thamizhl-dictionary"
          row={params.row}
          Edit={Edit}
          actions={[
            {
              label: 'Copy ID',
              handler: () => {
                navigator.clipboard.writeText(params.row.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight />
    </Box>
  );
}
