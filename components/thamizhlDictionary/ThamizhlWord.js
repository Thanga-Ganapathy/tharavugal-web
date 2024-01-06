import { Alert, Card, CardContent, Typography } from '@mui/material';

export default function ThamizhlWord({ data }) {
  return (
    <Card variant="outlined" sx={{ m: 2, minWidth: '200px' }}>
      <CardContent>
        <Typography variant="h6">{data.word}</Typography>
        {data.definitions.map((def, i) => (
          <Alert key={i} icon={false} severity="info" sx={{ mt: 1 }}>
            <pre>{def.definition}</pre>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
