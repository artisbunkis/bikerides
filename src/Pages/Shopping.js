import Button from '@mui/material/Button';
import ActionAreaCard from '../Components/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Hero from "../Components/Hero"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';


export default function Shopping() {



  return (
    <Box margin="auto" maxWidth="1920px">
      <Hero title="Shopping" />

      <Box style={{ width: 'auto', margin: 'auto', backgroundColor: 'white', padding: 10, borderRadius: 16, maxWidth: '1380px' }}>



        <Box sx={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1.5}} >
          <Box sx={{  minWidth: 380, margin: 'auto' }} >
            <Grid container spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
              <Grid item>
                <TextField
                  id="free-solo-demo"
                  label="Search..."
                />
              </Grid>
              <Grid item>
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
              </Grid>
              <Grid item>
              <IconButton aria-label="add">
                <AddCircleIcon />
              </IconButton>
              </Grid>
            </Grid>


          </Box>
        </Box>



        <Box style={{ borderRadius: 16, padding: 20 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 0 }}
            sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <ActionAreaCard title="Trek" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, handling." />
            <ActionAreaCard title="Trek Madone" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="From a legacy of greatness comes a new standard of speed. Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, pushing the boundaries of what’s possible with a triple threat of unprecedented aerodynamics, exceptional ride quality, and lightweight design. This race-ready bike is complete with never-before-seen IsoFlow technology that gives you every advantage in speed and handling." />
            <ActionAreaCard title="Trek Domane" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="From a legacy of greatness comes a new standard of speed. Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, pushing the boundaries of what’s possible with a triple threat of unprecedented aerodynamics, exceptional ride quality, and lightweight design. This race-ready bike is complete with never-before-seen IsoFlow technology that gives you every advantage in speed and handling." />

            <ActionAreaCard title="Trek" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, handling." />
            <ActionAreaCard title="Trek Madone" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="From a legacy of greatness comes a new standard of speed. Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, pushing the boundaries of what’s possible with a triple threat of unprecedented aerodynamics, exceptional ride quality, and lightweight design. This race-ready bike is complete with never-before-seen IsoFlow technology that gives you every advantage in speed and handling." />
            <ActionAreaCard title="Trek Domane" alt="Kirzaka" image="trek-madone.jpg" sellerName="Artis Bunkis" category="Road Bike" price="4999.99" desc="From a legacy of greatness comes a new standard of speed. Seven generations in the making, Madone SLR is our fastest and lightest Madone disc ever, pushing the boundaries of what’s possible with a triple threat of unprecedented aerodynamics, exceptional ride quality, and lightweight design. This race-ready bike is complete with never-before-seen IsoFlow technology that gives you every advantage in speed and handling." />

          </Stack>
        </Box>


        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 5,
            m: 1,
            bgcolor: 'background.paper'
          }}
        >

        </Grid>
      </Box>

    </Box>
  )
}