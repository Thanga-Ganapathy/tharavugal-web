import Layout from '@/components/layouts/DefaultLayout';
import { aathichoodi } from '@/data/aathichoodi';
import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AathichoodiBox({ data, index }) {
  const renderExplanations = (explanations) => {
    return explanations.map((exp, i) => (
      <Accordion key={i}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {exp.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{exp.author}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert icon={false} severity="success">
            <Box dangerouslySetInnerHTML={{ __html: exp.text }} />
          </Alert>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography sx={{ mr: 2 }} variant="body1">
          {index + 1}.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '16px', sm: '24px', md: '26px' },
            textAlign: 'center',
            color: (t) => t.palette.primary.main,
          }}
        >
          {data.text}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>{renderExplanations(data.explanations)}</Box>
    </Paper>
  );
}

export default function Aathichoodi() {
  return (
    <Layout title="Thirukkural">
      <Box textAlign="center">
        <Typography variant="h5">ஆத்திசூடி (Aathichoodi)</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {aathichoodi.map((a, i) => (
          <AathichoodiBox key={i} data={a} index={i} />
        ))}
      </Box>
    </Layout>
  );
}
