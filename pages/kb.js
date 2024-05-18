import SearchForm from '@/components/SearchForm';
import Layout from '@/components/layouts/DefaultLayout';
import kbData from '@/data/kb';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function KB() {
  const renderKBs = () => {
    return kbData.map((kb, i) => (
      <Card key={i} sx={{ m: 1 }}>
        <CardContent>
          <Typography variant="h6">{kb.title}</Typography>
          <Box
            component="div"
            sx={{ mt: 2, maxWidth: '300px' }}
            dangerouslySetInnerHTML={{ __html: kb.content }}
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <Layout title="Knowledge Base">
      <Box textAlign="center">
        <Typography variant="h5">Knowledge Base</Typography>
      </Box>
      <Box>
        <SearchForm />
        <Box
          sx={{
            p: 2,
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {renderKBs()}
        </Box>
      </Box>
    </Layout>
  );
}
