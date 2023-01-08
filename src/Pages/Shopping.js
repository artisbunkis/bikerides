import Button from '@mui/material/Button';
import ActionAreaCard from '../Components/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Hero from "../Components/Hero"
import usePagination from "../Components/Pagination"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { UserAuth } from '../Config/AuthContext';
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Config/firebase-config";
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Pagination from '@mui/material/Pagination';


// Izveidot sludinājumu dialogs:
function SimpleDialog(props) {

  const [loading, setLoading] = useState(true);
  const { onClose, selectedValue, open } = props;

  const { user } = UserAuth();
  const formRef = React.useRef();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("None");
  const [price, setPrice] = useState([]);


  const [selectedFile, setSelectedFile] = useState('');
  const [preview, setPreview] = useState()
  const storage = getStorage();

  // Aizvērt dialogu:
  const handleClose = () => {
    onClose(selectedValue);
  };

  // Klausīšanās funkcija sludinājuma attēlam:
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    } else {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  // Saglabāt jeb izveidot sludinājumu:
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sets initial data in groups collection for group with id:
    await uploadBytes(ref(storage, `shoppingImages/${user.uid}/${selectedFile.name}`), selectedFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(urlis =>
        addDoc(collection(db, "shopping"), {
          title: title,
          desc: desc,
          category: category ? category : "Bike",
          price: price,
          user_id: user.uid,
          sellerName: user.displayName,
          sellerPhoto: user.photoURL,
          image: urlis,
          sold: false,
          user_id: user.uid
        }).then(response => {
          handleClose();
          setLoading(false);
          window.location.reload(false);
        })
      )
    })

  }

  return (

    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create new shopping item</DialogTitle>
      <Box sx={{ padding: "0px 30px 30px 30px" }}>
        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227, paddingBottom: "15px" }}>
              <form onSubmit={handleSave} ref={formRef}>

                <FormControl fullWidth >
                  <TextField

                    onChange={(e) => setTitle(e.target.value)}
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue={null}
                    sx={{ marginBottom: 2 }}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <TextField

                    onChange={(e) => setDesc(e.target.value)}
                    required
                    id="outlined-required"
                    label="Description"
                    defaultValue={null}
                    sx={{ marginBottom: 2 }}
                    multiline
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Category *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    required
                    id="demo-simple-select"
                    label="Category"
                    value={category}
                    sx={{ marginBottom: 2 }}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"Road Bike"}>Road Bike</MenuItem>
                    <MenuItem value={"MTB"}>MTB</MenuItem>
                    <MenuItem value={"Gravel Bike"}>Gravel Bike</MenuItem>
                    <MenuItem value={"TT Bike"}>TT Bike</MenuItem>
                    <MenuItem value={"BMX"}>BMX</MenuItem>
                    <MenuItem value={"Children Bike"}>Children Bike</MenuItem>
                    <MenuItem value={"None"}>None</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Price *</InputLabel>
                  <OutlinedInput
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    id="outlined-required"
                    label="Price"
                    defaultValue={null}
                    sx={{ marginBottom: 2 }}
                  />
                </FormControl>

                <Grid container sx={{ verticalAlign: "center" }}>
                  <Grid item sx={{ verticalAlign: "center", marginTop: "auto", marginBottom: "auto", paddingRight: "10px" }}>
                    <InputLabel sx={{ verticalAlign: "center" }} htmlFor="outlined-adornment-amount">Select Image *</InputLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>


                      <label htmlFor="raised-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            required
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                          />
                          <PhotoCamera />
                        </IconButton>

                      </label>

                    </FormControl>
                  </Grid>
                </Grid>
                <img
                  alt="Error"
                  src={selectedFile ? preview : "/default-thumbnail.jpg"}
                  style={{ width: 227, borderRadius: 6 }}

                />



                <Button type="submit" sx={{ width: 227, marginTop: "10px" }} variant="contained">List Item</Button>
              </form>

            </Box>
          </Grid>

        </Grid>

      </Box>


    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};



export default function Shopping() {

  // Pagination mainīgie:
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const [count, setCount] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const _DATA = usePagination(shoppingList, PER_PAGE);

  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState([]);


  // Iegūt sludinājumus:
  const getSearchData = async () => {
    const q = query(collection(db, "shopping"), where("sold", "==", false));
    const data = onSnapshot(q, (querySnapshot) => {
      setCount(Math.ceil(querySnapshot.docs.length / PER_PAGE));
      setShoppingList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  // Atvērt dialogu::
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Aizvērt dialogu:
  const handleClose = (value) => {
    setOpen(false);
  };

  // Pagination mainīt page:
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  // Klausīšanās funkcija:
  useEffect(() => {
    getSearchData();
  }, []);



  return (
    <Box margin="auto" maxWidth="1920px">
      <SimpleDialog open={open} onClose={handleClose} />
      <Hero title="Shopping" desc="This is page for shopping items." />

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
            {searchValue == ""
              ? _DATA.currentData()
                .filter((val) => {
                  if (searchValue == "") {
                    return val
                  } else if (val.title.toLowerCase().includes(searchValue.toLowerCase()) || val.category.toLowerCase().includes(searchValue.toLowerCase()) || val.desc.toLowerCase().includes(searchValue.toLowerCase())) {
                    return val
                  }
                })
                .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
                .map(listItem => {
                  return (
                    <ActionAreaCard key={listItem.id} id={listItem.id} title={listItem.title} alt={listItem.title} sellerUserId={listItem.user_id} image={listItem.image} sellerName={listItem.sellerName} category={listItem.category} price={listItem.price} desc={listItem.desc} sellerPhoto={listItem.sellerPhoto} />

                  );
                })
              : shoppingList
                .filter((val) => {
                  if (searchValue == "") {
                    return val
                  } else if (val.title.toLowerCase().includes(searchValue.toLowerCase()) || val.category.toLowerCase().includes(searchValue.toLowerCase()) || val.desc.toLowerCase().includes(searchValue.toLowerCase())) {
                    return val
                  }
                })
                .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
                .map(listItem => {
                  return (
                    <ActionAreaCard key={listItem.id} id={listItem.id} title={listItem.title} alt={listItem.title} sellerUserId={listItem.user_id} image={listItem.image} sellerName={listItem.sellerName} category={listItem.category} price={listItem.price} desc={listItem.desc} sellerPhoto={listItem.sellerPhoto} />

                  );
                })
            }
          </Stack>
        </Box>

        {searchValue == "" ? <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        /> : null}

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