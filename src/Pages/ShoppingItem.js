import { useLocation, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
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
import { collection, doc, getDoc, where, query, onSnapshot } from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import app from '../Config/firebase-config.js';
import { useState, useEffect } from 'react';
import SplashScreen from "../Components/SplashScreen";
import ActionAreaCard from '../Components/Card';


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

  const db = getFirestore(app);
  const [user, setUser] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const [shoppingData, setShoppingData] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Iegūt saites URL ID:
  const params = useParams();

  // Iegūt sludinājuma datus:
  const getData = async (e) => {
    
    setLoading(true);
    const shoppingItemRef = doc(db, "shopping", params.id);
    const docSnap = await getDoc(shoppingItemRef);

    if (docSnap.exists()) {
      setShoppingData(docSnap.data())
      const docRef = doc(db, "users", docSnap.data().user_id);
      const docSnap2 = await getDoc(docRef);

      if (docSnap2.exists()) {
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

  // Iegūt visus sludinājumus tādai pašai sludinājuma kategorijai:
  const getSearchData = async () => {
    const q = query(collection(db, "shopping"), where("sold", "==", false));
    const data = onSnapshot(q, (querySnapshot) => {
      setShoppingList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  // Klausīšanās funkcija konkrētajam sludinājumam:
  useEffect(() => {
    getData();
    getSearchData();
  }, [params])

  return (
    loading ? <SplashScreen /> :
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


            <IconButton style={{  background: 'rgba(0,0,0,0.1)', position: 'absolute', top: 40, right: 40 }} onClick={handleOpenImage}>
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

        <Box bgcolor="white" width="auto" height="auto" borderRadius="16px"  style={{ marginTop: "20px", borderRadius: 16, padding: 20, }}>
        <h1>You might like:</h1>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 0 }}
                  sx={{  overflowX: "scroll", display: 'flex', flexDirection: 'row' }}
                >
              
                  {shoppingList.sort((a, b) => a.itemM > b.itemM ? 1 : -1)
                    .filter((val) => {
                      if(val.category == shoppingData.category) return val
                    })
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .filter((val) => {
                      if(val.id != params.id) return val
                    })
                    .map((listItem) => {
                      return (
                        <ActionAreaCard key={listItem.id} id={listItem.id} title={listItem.title} alt={listItem.title} sellerUserId={listItem.user_id} image={listItem.image} sellerName={listItem.sellerName} category={listItem.category} price={listItem.price} desc={listItem.desc} sellerPhoto={listItem.sellerPhoto} />

                      );
                    })}

                </Stack>
              </Box>
      </Box>

  )
}