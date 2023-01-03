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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { UserAuth } from '../Config/AuthContext';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "../Config/firebase-config";
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";


// Create a group dialog function:
function SimpleDialog(props) {
  const [loading, setLoading] = useState(true);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  const { user, updateProfile } = UserAuth();
  const [groupName, setGroupName] = useState();

  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([]);

  const [selectedFile, setSelectedFile] = useState('');
  const storage = getStorage();


  const handleSave = async (e) => {
    setLoading(true);

    if (selectedFile) {
      const imagesRef = ref(storage, `shoppingImages/${user.uid}/${selectedFile.name}`);
      uploadBytes(imagesRef, selectedFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(urlis =>
          addDoc(collection(db, "shopping"), {
            title: title,
            desc: desc,
            category: category,
            price: price,
            user_id: user.uid,
            sellerName: user.displayName,
            sellerPhoto: user.photoURL,
            image: urlis
          })
        )
      });

    }

    // Sets initial data in groups collection for group with id:






    setLoading(false);
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create new shopping item</DialogTitle>
      <Box sx={{ padding: "0px 30px 30px 30px" }}>
        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227, paddingBottom: "15px" }}>

              <TextField
                onChange={(e) => setTitle(e.target.value)}
                required
                id="outlined-required"
                label="Title"
                defaultValue={null}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                onChange={(e) => setDesc(e.target.value)}
                required
                id="outlined-required"
                label="Description"
                defaultValue={null}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                onChange={(e) => setCategory(e.target.value)}
                required
                id="outlined-required"
                label="Category"
                defaultValue={null}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                onChange={(e) => setPrice(e.target.value)}
                required
                id="outlined-required"
                label="Price"
                defaultValue={null}
                sx={{ marginBottom: 2 }}
              />

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <label htmlFor="raised-button-file">
                <img
                  alt="Remy Sharp"
                  src="default-thumbnail.jpg" //{user.photoURL ? user.photoURL : null}
                  style={{ width: 227, borderRadius: 6 }}

                />
              </label>
            </Box>
          </Grid>

        </Grid>

        <Button onClick={handleSave} sx={{ width: 227 }} variant="contained">List Item</Button>
      </Box>


    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};



export default function Shopping() {

  const { user, updateProfile } = UserAuth();
  const [groupLists, setGroupList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const getSearchData = async () => {
    const q = query(collection(db, "shopping"));
    const data = onSnapshot(q, (querySnapshot) => {
      setShoppingList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  // Handle dialog open:
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle dialog close:
  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    getSearchData();
  }, []);

  return (
    <Box margin="auto" maxWidth="1920px">
      <Hero title="Shopping" desc="This is page for shopping items." />

      <SimpleDialog open={open} onClose={handleClose} />

      <Fab color="primary" onClick={handleClickOpen} aria-label="add" sx={{
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed"
      }}>
        <AddIcon />
      </Fab>


      <Box style={{ width: 'auto', margin: 'auto', backgroundColor: 'white', padding: 10, borderRadius: 16, maxWidth: '1380px' }}>



        <Box sx={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 1.5 }} >
          <Box sx={{ minWidth: 380, margin: 'auto' }} >
            <Box id="Text-Input-Box" sx={{ backgroundColor: '#f3f5f8', height: 60, borderRadius: 6, margin: "auto", paddingLeft: 3, paddingRight: 3, paddingTop: "15px", width: "auto" }}>

              <TextField
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                fullwidth="true" placeholder="Search..." width="1000px" variant="standard" InputProps={{ disableUnderline: true }} sx={{ width: "100%", '& legend': { display: 'none' }, '& fieldset': { top: 0 }, }}
              />
            </Box>


          </Box>
        </Box>



        <Box style={{ borderRadius: 16, padding: 20 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 0 }}
            sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            {shoppingList.filter((val) => {
              if (searchValue == "") {
                return val
              } else if (val.title.toLowerCase().includes(searchValue.toLowerCase()) || val.desc.toLowerCase().includes(searchValue.toLowerCase())) {
                return val
              }
            }).map((listItem) => {
              return (
                <ActionAreaCard title={listItem.title} alt="Kirzaka" image={listItem.image} sellerName={listItem.sellerName} category={listItem.category} price={listItem.price} desc={listItem.desc} sellerPhoto={listItem.sellerPhoto} />

              );
            })}

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