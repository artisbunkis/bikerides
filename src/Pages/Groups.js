import Hero from "../Components/Hero"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, onSnapshot, query } from "firebase/firestore";
import GroupCard from '../Components/GroupCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { UserAuth } from '../Config/AuthContext';
import { db, storage } from "../Config/firebase-config";
import Stack from '@mui/material/Stack';
import SplashScreen from "../Components/SplashScreen";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';




// Create a group dialog function:
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  // Izveidot jaunu grupu:
  const handleCreateGroup = async (e) => {
    // Tiek aktivizēts lādēšanās skats:
    setLoading(true);

    // Izveido dokumentu grupas kolecijā ar automātiski ģenerētu grupas ID:
    const docRef = await addDoc(collection(db, "groups"), {
      group_name: groupName,
      group_admin: user.uid,
      group_admin_username: user.displayName,
      group_admin_photoUrl: user.photoURL,
      group_description: groupDescription,
      group_category: groupCategory
    }).then(function (docRef) {

      // Kad grupas dokuments ir izveidots, tiek ierakstīts arī ģenerētais grupas ID: 
      const groupRef = doc(db, "groups", docRef.id);
      updateDoc(groupRef, {
        group_id: docRef.id
      })
      setDoc(
        doc(db, `groups/${docRef.id}/groupUsers`, user.uid),
        { user_id: user.uid, username: user.displayName }
      );
    }).then(response => {
      // Kad grupa izveidota, tiek ielādēta lapa, lai atjaunotu datus:
      window.location.reload(false);
    });

    //Tiek aizvērti dialogi un deaktivizēts lādēšanās skats:
    handleClose();
    setLoading(false);

  }

  const { user, updateProfile } = UserAuth();
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [groupCategory, setGroupCategory] = useState("None");

  const formRef = React.useRef();

  return (
    loading ? <SplashScreen /> :
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create new group</DialogTitle>
        <Box sx={{ padding: "0px 30px 30px 30px" }}>
          <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
            <Grid item>
              <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227, paddingBottom: "15px" }}>
                <form ref={formRef} onSubmit={handleCreateGroup}>
                  <TextField
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                    id="outlined-required"
                    label="Group Name"
                    defaultValue={null}
                    sx={{ marginBottom: 2 }}
                    error={groupName == '' ? true : false}
                    helperText={groupName == '' && groupName}
                  />
                  <TextField
                    onChange={(e) => setGroupDescription(e.target.value)}
                    required
                    id="outlined-required"
                    label="Group Description"
                    defaultValue={null}
                    multiline
                    sx={{ marginBottom: 2 }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupCategory}
                      label="Category"
                      sx={{ marginBottom: 2 }}
                      onChange={(e) => setGroupCategory(e.target.value)}
                    >
                      <MenuItem value={"Road Cycling"}>Road Cycling</MenuItem>
                      <MenuItem value={"MTB"}>MTB</MenuItem>
                      <MenuItem value={"Gravel"}>Gravel</MenuItem>
                      <MenuItem value={"All Around"}>All Around</MenuItem>
                      <MenuItem value={"None"}>None</MenuItem>
                    </Select>
                  </FormControl>

                  <Button type="submit" sx={{ width: 227 }} variant="contained">Create Group</Button>
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




export default function Groups() {

  const { user, updateProfile } = UserAuth();
  const [groupLists, setGroupList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);


  // Handle dialog open:
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle dialog close:
  const handleClose = (value) => {
    setOpen(false);
  };

  // Get all groups list:
  const getGroups = async () => {
    setLoading(true);
    const q = query(collection(db, "groups"));
    const data = onSnapshot(q, (querySnapshot) => {
      setGroupList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  }

  useEffect(() => {
    getGroups();
    setLoading(false);
  }, []);



  return (
    <Box>
      <Hero title="Groups"></Hero>

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

      <Box style={{ borderRadius: 16, padding: 20, minHeight: "400px", backgroundColor: "white" }}>
        {loading ?
          <CircularProgress color="primary" sx={{ margin: "auto" }} /> :
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 0 }}
            sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            {groupLists.map((group) => {

              return (
                <Box key={group.group_id} padding="0px">
                  <GroupCard key={group.group_id} title={group.group_name} group_id={group.group_id} group_admin_photoURL={group.group_admin_photoUrl} group_admin_username={group.group_admin_username}></GroupCard>
                </Box>

              );
            })}

          </Stack>
        }
      </Box>





    </Box>

  )
}