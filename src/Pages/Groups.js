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


// Create a group dialog function:
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleCreateGroup = async (e) => {

    // Sets initial data in groups collection for group with id:
    const docRef = await addDoc(collection(db, "groups"), {
      group_name: groupName,
      group_admin: user.uid,
      group_admin_username: user.displayName,
      group_admin_photoUrl: user.photoURL
    }).then(function (docRef) {
      const groupRef = doc(db, "groups", docRef.id);
      updateDoc(groupRef, {
        group_id: docRef.id
      })
      setDoc(doc(db, `groups/${docRef.id}/groupUsers`, user.uid), { user_id: user.uid, username: user.displayName });


    });

    handleClose();
  }

  const { user, updateProfile } = UserAuth();
  const [groupName, setGroupName] = useState();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create new group</DialogTitle>
      <Box sx={{ padding: "0px 30px 30px 30px" }}>
        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227, paddingBottom: "15px" }}>

              <TextField
                onChange={(e) => setGroupName(e.target.value)}
                required
                id="outlined-required"
                label="Group Name"
                defaultValue={null}
              />

            </Box>
          </Grid>

        </Grid>

        <Button onClick={handleCreateGroup} sx={{ width: 227 }} variant="contained">Create Group</Button>
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
    const q = query(collection(db, "groups"));
    const data = onSnapshot(q, (querySnapshot) => {
      setGroupList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }

  useEffect(() => {
    getGroups();
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

      <Grid container justifyContent="center" padding="10px" columns={{ xs: 4, sm: 8, md: 12 }}>
        {groupLists.map((group) => {
          console.log(group)
          return (
            <Box padding="10px">
              <GroupCard title={group.group_name} group_id={group.group_id} group_admin_photoURL={group.group_admin_photoUrl} group_admin_username={group.group_admin_username}></GroupCard>
            </Box>

          );
        })}
      </Grid>

    </Box>

  )
}