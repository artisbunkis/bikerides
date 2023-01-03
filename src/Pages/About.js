import Hero from "../Components/Hero"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export default function About() {
  return (
    <Box margin="auto" maxWidth="1920px">
      <Hero title="About"></Hero>
      <Box style={{ width: 'auto', margin: 'auto', backgroundColor: 'white', padding: 10, borderRadius: 16, maxWidth: '1380px' }}>
        <Grid container bgcolor="white" width="auto" paddingTop="20px" height="auto" borderRadius="16px" display="flex" justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8} sm={7}>
        <Typography variant="body1">
          Bikerides is a web based cyclist forum. I made this project as I really enjoy road cycling and everything about it. This forum is made for everyone who wants to socialize with other cycling fanatics.
        </Typography>
        <Typography variant="body1">
          This forum has such functionalities:
        </Typography>

        <List
          sx={{ width: 'auto', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}
        >


          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-phone" primary="Sign-Up (Email, Password, Username)" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-phone" primary="Sign-Up with Google" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Sign-In" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Sign-In with Google" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Create Group" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Request to Join a Group" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Viev Group Info" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Send Group Messages" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Receive Group Messages" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Create Shopping Items" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="View Shopping Items (With Contact info)" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText id="list-label-email" primary="Edit Profile" />
          </ListItem>

        </List>
          </Grid>
        </Grid>
      </Box>
    </Box>


  )
}