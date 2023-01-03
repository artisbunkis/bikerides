import Hero from "../Components/Hero"
import { useLocation, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { amber } from '@mui/material/colors';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ListSubheader from '@mui/material/ListSubheader';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { collection, getDocs, doc, getDoc, where, orderBy, query, onSnapshot } from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import app from '../Config/firebase-config.js';
import { useState, useEffect } from 'react';
import SplashScreen from "../Components/SplashScreen";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};

const styleImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  bgcolor: 'background.paper',
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
const theme = createTheme();

export default function ShoppingItem({ route, navigate }) {
  const location = useLocation();

  const db = getFirestore(app);
  const [user, setUser] = useState([]);
  const usersCollectionRef = collection(db, "users");


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const [shoppingData, setShoppingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇️ get ID from url
  const params = useParams();



    

  // Get data from Firestore:
  const getData = async (e) => {
    setLoading(true);
    const shoppingItemRef = doc(db, "shopping", params.id);
    const docSnap = await getDoc(shoppingItemRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data())
      setShoppingData(docSnap.data())
      const docRef = doc(db, "users", docSnap.data().user_id);
      const docSnap2 = await getDoc(docRef);

      if (docSnap2.exists()) {
        console.log("Document data:", docSnap2.data());
        setUser(docSnap2.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
    setLoading(false);
   
  }

 
  useEffect(() => {
    getData();
    //console.log(params.id)
    console.log(params.id);
  }, [])


  return (
    loading ? <SplashScreen/> :
    <Box>
      <Grid container bgcolor="white" width="auto" height="auto" borderRadius="16px" display="flex" justifyContent="center" alignItems="center">
        <Grid

          item
          height='700px'
          xs={12}
          sm={12}
          md={7}
          sx={{
            position: "relative",
            padding: 2,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.white : t.palette.white,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px 0px 0px 16px',
            [theme.breakpoints.down('sm')]: {
              height: 400,
              borderRadius: '16px 16px 0px 0px',

            },

          }}
        >

          <img src={shoppingData.image}
            width={"100%"} height={"100%"} style={{ objectFit: "cover", borderRadius: "20px 20px 20px 20px" }}></img>


          <IconButton style={{ position: 'absolute', top: 40, right: 40 }} onClick={handleOpenImage}>
            <ZoomInIcon style={{ color: "white", maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} />
          </IconButton>

          <Modal
            open={openImage}
            onClose={handleCloseImage}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleImage}>
              <img src={shoppingData.image}
                width={"100%"} height={"100%"} style={{ objectFit: "cover", borderRadius: "20px 20px 20px 20px" }}></img>
            </Box>
          </Modal>

        </Grid>


        <Grid item xs={12} md={5} sm={12} height="auto" width="auto" alignItems="center" sx={{ verticalAlign: "center" }}>
          <Stack textAlign="start" padding="6%" spacing={2} >
            <h1>{shoppingData.title}</h1>
            <Divider variant="middle" width="20%" />
            <Typography variant="body2" color="text.secondary" textAlign={"left"} paddingRight="16px">
              {shoppingData.desc}
            </Typography>

            <Grid container justifyContent="left" alignItems="center" marginLeft={0} marginBottom={1}>
              <Grid item paddingRight="10px">
                <Chip icon={<MonetizationOnIcon />} label={shoppingData.price} color="primary" />
              </Grid>
              <Grid item paddingRight="10px" >
                <Chip icon={<DirectionsBikeRoundedIcon />} label={shoppingData.category} sx={{ paddingLeft: 1, backgroundColor: amber[300] }} />
              </Grid>
              <Grid item>
                <Box>
                  <Chip

                    avatar={<Avatar src={shoppingData.sellerPhoto} />}
                    label={shoppingData.sellerName}
                    variant="filled"
                    onClick={handleOpen}
                  />
                </Box>
              </Grid>
            </Grid>



            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box sx={{ margin: "auto" }} >


                  <List
                    sx={{ width: 'auto', maxWidth: 360, margin: "auto", bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>Contact:</ListSubheader>}
                  >
                    <ListItem>
                      <Grid container justifyContent="start" alignItems="center">
                        <Grid item paddingRight="10px">
                          <Avatar src={shoppingData.sellerPhoto} />
                        </Grid>
                        <Grid item padding="0" >
                          <ListItemText primary={shoppingData.sellerName} />


                        </Grid>
                      </Grid>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText id="list-label-phone" primary={user ? user.phoneNumber : 'No phone provided!'} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText id="list-label-email" primary={user ? user.email : 'No email provided!'} />
                    </ListItem>
                  </List>

                </Box>


              </Box>
            </Modal>





          </Stack>
        </Grid>
      </Grid >

    </Box>

  )
}