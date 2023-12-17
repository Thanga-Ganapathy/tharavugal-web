import { Box, Divider, Typography } from '@mui/material';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';

import ToolBox from './ToolBox';

export default function Tools() {
  return (
    <Box p={1}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        <ChevronRightIcon /> Tools
      </Typography>
      <Divider />

      <Divider sx={{ mt: 2 }}>Real-Time Events</Divider>
      <Box
        py={2}
        sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
      >
        <ToolBox
          icon={ExploreOutlinedIcon}
          label="Explore"
          path="/explore"
          active
        />
        <ToolBox
          icon={InsertChartOutlinedTwoToneIcon}
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
          icon={FastfoodIcon}
          label="Food Ingredients"
          path="/food-ingredients"
        />
        <ToolBox
          icon={MedicationLiquidOutlinedIcon}
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
