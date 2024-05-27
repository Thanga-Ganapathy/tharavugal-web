import Link from '@/components/app/Link';
import Layout from '@/components/layouts/DefaultLayout';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';

export default function GlobalMaps() {
  return (
    <Layout title="Global Maps">
      <Box textAlign="center">
        <Typography variant="h4">Global Maps</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity="warning">This is an experimental project.</Alert>
      </Box>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="info" variant="standard" sx={{ my: 2 }}>
            We are looking for sponsors for this project; please{' '}
            <Link href="/contact-us">contact us</Link> for more information.
          </Alert>
          <Typography variant="h5">
            Already, many maps exist on the internet. Why another?
          </Typography>
          <Box sx={{ mt: 2 }}>
            The main reason for starting this project is that there are issues
            with the currently available maps and its projections.
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Common World Map</strong>:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This is a globaly well known map, but here the continents are very
            much distorted.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            For Eg: The Greenland is shown as bigger than its actual size, the
            same for russia and the Africa is shrink than its actual size.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Winkel_triple_projection_SW.jpg"
              alt="wiki global map"
              height={320}
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            source:{' '}
            <Link href="https://en.wikipedia.org/wiki/World_map">
              Wikipedia
            </Link>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>AuthaGraph World Map</strong>:
          </Typography>
          <Typography variant="body1">
            This is a another type of projected maps.
          </Typography>
          <Typography variant="body1">
            {' '}
            It is made by dividing a spherical surface into 96 triangles. And
            then transferring it to a tetrahedron while keeping the area&apos;s
            proportions. Finally unfolding it to a rectangle.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
              src="/images/AuthaGraph.gif"
              alt="authagraph map"
              height={500}
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            source: <Link href="http://www.authagraph.com/">AuthaGraph</Link>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>The double-sided Map</strong>:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            This double-sided map has smaller distance errors than any
            single-sided flat map — the previous record-holder being a 2007 map
            by Gott with Charles Mugnolo, a 2005 Princeton alumnus. In addition,
            areas at the edge are only 1.57 times larger than at the center.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            It minimizes all six types of map distortions. They used an
            equidistant azimuthal projection: a compromise projection, like the
            Winkel Tripel, with small errors in both local shapes and areas,
            instead of optimizing one at the expense of the other. Antarctica
            and Australia are more accurately represented than in most other
            maps, and distances across oceans or across poles are both accurate
            and easy to measure, unlike one-sided flat maps. Goldberg-Gott error
            score: 0.881 Map by J. Richard Gott, Robert Vanderbei and David
            Goldberg
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
              src="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2021/02/equidistant_azimuthal_projection.jpg"
              alt="prinston map"
              height={500}
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            source:{' '}
            <Link href="https://www.princeton.edu/">Princeton University</Link>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5">Our proposal</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Considering with all the constraints, we want all the land mass
            regions to be equally respected based on their sizes, and fair
            projections should be made.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tasks:
          </Typography>
          <ul>
            <li>Identify each land mass region and record it as a block.</li>
            <li>Record size, shapes & distance.</li>
            <li>Make relationship between blocks.</li>
            <li>
              Render each block on a given rectangle area by giving each block a
              percentage of size with aspect ratio.
            </li>
            <li>The new maps should be made interactive.</li>
          </ul>
        </CardContent>
      </Card>
    </Layout>
  );
}
