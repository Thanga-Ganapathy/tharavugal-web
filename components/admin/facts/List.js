import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';

export default function List({ data = [], mutate }) {
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      valueGetter: (params) => params.row.title,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell(params) {
        return (
          <ModelActionMenu
            mutate={mutate}
            url="/api/admin/facts"
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
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight />
    </Box>
  );
}
