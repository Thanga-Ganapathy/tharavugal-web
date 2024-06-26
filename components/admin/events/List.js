import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';
import APIClient from '@/utils/APIClient';
import { EVENTS_STATUS } from '@/constants';

export default function List({
  data = [],
  rowCount,
  page,
  setPage,
  isLoading,
  mutate,
}) {
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell(params) {
        return (
          <ModelActionMenu
            url="/api/admin/events"
            row={params.row}
            Edit={Edit}
            actions={[
              {
                label: 'Publish',
                handler: async () => {
                  await APIClient.post(
                    '/api/admin/events',
                    { id: params.row.id, status: EVENTS_STATUS.PUBLISHED },
                    true
                  );
                  if (process.env.NODE_ENV === 'production') {
                    const indexNowResponse = await fetch(
                      'https://www.bing.com/indexnow?url=https://tharavugal.org/&key=d166f00bf74c43f39e61a3fd848ee389',
                      {
                        mode: 'no-cors',
                      }
                    );
                  }
                },
              },
              {
                label: 'Copy URL',
                handler: () => {
                  navigator.clipboard.writeText(
                    `https://tharavugal.org/events/${params.row.slug}`
                  );
                },
              },
            ]}
            mutate={mutate}
          />
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        pageSizeOptions={[10]}
        rowCount={rowCount}
        loading={isLoading}
        paginationModel={{ page, pageSize: 10 }}
        paginationMode="server"
        onPaginationModelChange={(o) => setPage(o.page)}
      />
    </Box>
  );
}
