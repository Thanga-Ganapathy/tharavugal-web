import {
  Box,
  Card,
  CardContent,
  Alert,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Kural({ data, index }) {
  const renderExplanations = (lang) => {
    const taExplanations = data.translations.find((t) => t.id === lang);
    return taExplanations.explanations.map((exp, i) => (
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
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          {!isNaN(index) && <Typography>{index + 1}.</Typography>}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: { md: 2 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '16px', sm: '24px', md: '26px' },
                color: (t) => t.palette.primary.main,
              }}
            >
              {data.kural.l1}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '16px', sm: '24px', md: '26px' },
                color: (t) => t.palette.primary.main,
              }}
            >
              {data.kural.l2}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronRightIcon /> தமிழ்
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>{renderExplanations('ta')}</Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronRightIcon /> English
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>{renderExplanations('en')}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
