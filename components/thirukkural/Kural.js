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
import ThamizhlWord from '../thamizhlDictionary/ThamizhlWord';

export default function Kural({ data, index }) {
  const renderExplanations = (lang, langID) => {
    const explns = data.translations.find((t) => t.id === langID);
    const explnsArr = explns.explanations.map((exp, i) => (
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

    return (
      <Box sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: (t) => t.palette.info.main,
          }}
        >
          <ChevronRightIcon /> {lang}
        </Typography>
        <Divider sx={{ borderColor: 'darkgray' }} />
        <Box sx={{ mt: 2 }}>{explnsArr}</Box>
      </Box>
    );
  };

  const renderAgarathi = () => {
    return (
      <Box
        sx={{
          p: { xs: 1, sm: 1, md: 2 },
        }}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>அகராதி</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {data.agarathi.map((a, i) => (
                <ThamizhlWord data={a} key={i} />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        mb: 2,
        '& .MuiCardContent-root:last-child': {
          paddingBottom: 0,
        },
      }}
      variant="outlined"
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            backgroundColor: 'black',
            color: 'gold',
            p: 1,
          }}
        >
          {!isNaN(index) && <Typography>{index + 1}.</Typography>}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: { xs: 1, sm: 1, md: 2 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '16px', sm: '24px', md: '26px' },
              }}
            >
              {data.kural.l1}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '16px', sm: '24px', md: '26px' },
              }}
            >
              {data.kural.l2}
            </Typography>
          </Box>
        </Box>
        <Box>{renderExplanations('தமிழ்', 'ta')}</Box>
        {data.agarathi && renderAgarathi()}
        <Box>{renderExplanations('English', 'en')}</Box>
      </CardContent>
    </Card>
  );
}
