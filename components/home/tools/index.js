import { Box, Divider, Typography } from '@mui/material';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import { FcBarChart, FcBinoculars, FcBiomass, FcServices } from 'react-icons/fc';

import ToolBox from './ToolBox';
import Hamburger from '@/components/icons/Hamburger';

export default function Tools() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <FcServices
          style={{ width: '35px', height: '35px', marginRight: '10px' }}
        />{' '}
        Tools
      </Typography>
      <Divider sx={{ borderColor: 'darkgray' }} />

      <Divider sx={{ mt: 2 }}>Real-Time Events</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          icon={FcBinoculars}
          label="Explore"
          path="/explore"
          active
        />
        <ToolBox
          icon={FcBarChart}
          label="Visualizer"
          path="/visualizer"
          active
        />
        <ToolBox icon={ScienceOutlinedIcon} label="Research" path="/research" />
      </Box>

      <Divider sx={{ mt: 2 }}>Health</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          active
          icon={Hamburger}
          label="Food Ingredients"
          path="/food-ingredients"
        />
        <ToolBox
          icon={FcBiomass}
          label="Sitha Medicines"
          path="/sitha-medicines"
        />
      </Box>

      <Divider sx={{ mt: 2 }}>Environment</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          icon={WaterDropOutlinedIcon}
          label="Water Bodies"
          path="/water-bodies"
        />
      </Box>

      <Divider sx={{ mt: 2 }}>Geo</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          icon={TravelExploreOutlinedIcon}
          label="Geo Name Finder"
          path="/geo-name-finder"
        />
      </Box>

      <Divider sx={{ mt: 2 }}>Others</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          icon={PushPinOutlinedIcon}
          label="On This Day"
          path="/on-this-day"
        />
        <ToolBox
          icon={TempleHinduOutlinedIcon}
          label="Temples"
          path="/temples"
        />
      </Box>
    </Box>
  );
}
