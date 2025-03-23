import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';
import { RESOUCE_TYPES } from '@/constants';

interface Resource {
  id: number;
  name: string;
  type: number;
  file: { loc: string };
}

interface ListProps {
  data: Resource[];
  mutate: () => void;
}

export default function List({ data = [], mutate }: ListProps) {
  const columns: GridColDef[] = [
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
      renderCell: (params) => (
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
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight />
    </Box>
  );
}
