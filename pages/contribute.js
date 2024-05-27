import Layout from '@/components/layouts/DefaultLayout';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Alert,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HeadingWithDivider from '@/components/HeadingWithDivider';
import Feedback from '@/components/app/Feedback';
import Link from '@/components/app/Link';

export default function Contribute() {
  return (
    <Layout title="Contribute">
      <Typography variant="h5" textAlign="center">
        🙏 Contribute
      </Typography>
      <Paper sx={{ mt: 2, p: { xs: 1, sm: 1, md: 2 } }}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Share</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              If you really found this useful, please share it with the world
              through any medium.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Create Real-Time events</Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              ></Chip>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              You can create real-time events based on your knowledge. The more
              data we have, the more reliable results we get.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Report, update or verify Real-Time events
              </Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              ></Chip>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              We want our data to be reliable, so if you find any event data
              that needs to be reported or corrected, please help us.
              <br />
              <br />
              Every event in the system needs to be cross-verified by multiple
              members, so you can verify it according to your knowledge.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Help translate</Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              ></Chip>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              We want our data to be accessible to anyone around the world, so
              if you are good at any language, please help us translate.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Participate in open-discussions
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              There are many things in society that conflict with each other, so
              please participate if you are experienced in particular fields.
              <br />
              <br />
              <Link href="/open-discussions">
                Click here for open discussions
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">File Issues</Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              ></Chip>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Members can file issues of any kind, track updates, etc.
              <br />
              <br />
              <Link href="/open-issues">Please file your issues here.</Link>.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">PRs are welcome</Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              If you are a developer or technical person, please report any bugs
              or issues you encounter while using the app.
              <br />
              <br />
              Try to code or fix any issues reported on{' '}
              <Link href="https://github.com/Tharavugal/web">GitHub</Link>.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Support Accessibility</Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Help people with disabilities use the app.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Health Care</Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              />
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              If you are a health professional, please help us review or make
              corrections to the health-related data here.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Language Scholars</Typography>
              <Chip
                color="info"
                size="small"
                icon={<InfoIcon />}
                label="Members Only"
              />
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              We need scholars of any language to improve, correct, and have
              meaningful text content.
              <br />
              <br />
              Some of the areas like:
              <ul>
                <li>
                  We need <strong>Thamizhl</strong> language scholars to verify{' '}
                  <strong>Thirukkural</strong> here.
                </li>
                <li>
                  We need <strong>Thamizhl</strong> language scholars to have
                  more thamizhl dictionary words here.
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Mobile Apps</Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Daily, the number of users accessing the app is increasing, and
              most of them are accessing it through their mobile devices.
              <br />
              <br />
              Though our app is made responsive for various screen sizes from
              the start, we need dedicated mobile apps to simplify their usage
              instead of opening a browser to access the website.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Application Infrastructure upgrade
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Currently, our system runs on low resources, and due to this, we
              are limiting user access to these web app features.
              <br />
              <br />
              Please <Link href="/contact-us">contact us</Link> for more
              details.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Your feedback matters</Typography>
            </Box>

            <Box variant="body1" sx={{ mt: 2 }}>
              Your suggestions are always welcome, which will help us improve.
              <br />
              <br />
              Feel free to send us your feedback via email to{' '}
              <Link href="mailto:admin@tharavugal.org">
                admin@tharavugal.org
              </Link>
              <Box sx={{ mt: 2 }}>
                (Or else send it anonymously via the feedback form below.)
              </Box>
              <Box sx={{ mt: 2 }}>
                <Feedback />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <HeadingWithDivider title="Other Works" sx={{ mt: 3 }} />
        <Box>
          <ul>
            <li>
              We need people to record press releases information from both
              private & government bodies.
            </li>
            <li>
              We need graphics designers to make the organization logo after
              design aproval from the Core-Members.
            </li>
          </ul>
        </Box>

        <Alert severity="info">
          Please visit the{' '}
          <Link href="/contribution-logs">Contribution Logs</Link> for any
          contributions made to the organization.
        </Alert>
      </Paper>
    </Layout>
  );
}
