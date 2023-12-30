import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';
import { RESOUCE_TYPES } from '@/constants';

export default function List({ data = [], mutate }) {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      valueGetter: (params) => params.row.name,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      valueGetter: (params) => RESOUCE_TYPES[params.row.type],
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell(params) {
        return (
          <ModelActionMenu
            mutate={mutate}
            url="/api/admin/resources"
            row={params.row}
            Edit={Edit}
            actions={[
              {
                label: 'Copy ID',
                handler: () => {
                  navigator.clipboard.writeText(params.row.id);
                },
              },
              {
                label: 'Copy file location',
                handler: () => {
                  navigator.clipboard.writeText(params.row.file.loc);
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
