
import Hero from "../Components/Hero"
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { UserAuth } from '../Config/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, where, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebase-config";
import * as React from 'react';
import SplashScreen from "../Components/SplashScreen";
import TextField from '@mui/material/TextField';
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../Config/firebase-config";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Chip from '@mui/material/Chip';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { amber } from '@mui/material/colors';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';


export default function GroupItem({ route, navigate }) {
    const location = useLocation();
    const { user, updateProfile } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [groupData, setGroupData] = useState([null]);
    const [groupUsersList, setGroupUsersList] = useState([]);
    const [isRequested, setIsRequested] = useState(true);
    const [isAccepted, setIsAccepted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [groupRequestLists, setGroupRequestList] = useState([]);
    const [messageText, setMessageText] = useState([]);

    const bottomRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState('');

    const handleSave = async (file) => {
        setLoading(true);

        if (file) {


            const imagesRef = ref(storage, `group/${location.state.group_id}/${file.name}`);
            const docReference = doc(db, "groups", location.state.group_id);

            await uploadBytes(imagesRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(urlis =>

                    updateDoc(docReference, {
                        image: urlis
                    })

                )
            });

        }
        setLoading(false);
        getData();
    }



    // Strava:
    const [stats, setStats] = useState(null);

    // Request button:
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#1976d2"),
        width: "100%",
        boxShadow: "none",
        borderRadius: 8,
        backgroundColor: "#1976d2",
        '&:hover': {
            backgroundColor: "#1976d2",
        },
        marginBottom: 20
    }));

    // Waiting for request approval button:
    const AccentButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#231f20"),
        width: "100%",
        boxShadow: "none",
        borderRadius: 8,
        backgroundColor: "#231f20",
        '&:hover': {
            backgroundColor: "#231f20",
        },
        marginBottom: 20
    }));


    // Get data from Firestore:
    const getData = async (e) => {

        // Get & Set Group data:
        const q = query(collection(db, "groups"), where("group_id", "==", location.state.group_id));
        const data = onSnapshot(q, (querySnapshot) => {
            setGroupData(querySnapshot.docs[0].data());
        });

        // Get Requested & Accepted data:
        const gr = query(collection(db, "groupRequests"), where("user_id", "==", user.uid), where("group_id", "==", location.state.group_id));
        const querySnapshot = await getDocs(gr);
        if (querySnapshot.size == 0) {
            setIsRequested(false)
        } else {
            setIsRequested(true)
            setIsAccepted(querySnapshot.docs[0].data().request_accepted);
        }

        // Set All messages list in ascending order by date:
        const msgs = query(collection(db, `groups/${location.state.group_id}/messages`), orderBy("message_sent", "asc"));
        const unsub = onSnapshot(msgs, (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        setLoading(false);
    }

    const getRequests = async () => {
        const q = query(collection(db, "groupRequests"), where("group_admin", "==", user.uid), where("request_accepted", "==", null), where("group_id", '==', location.state.group_id));

        const unsub = onSnapshot(q, (querySnapshot) => {
            setGroupRequestList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });


    };

    const getGroupUsers = async () => {
        // Group user id's:
        const q = query(
            collection(db, `groups/${location.state.group_id}/groupUsers`)
        );
        const unsub = onSnapshot(q, (querySnapshot) => {
            setGroupUsersList(querySnapshot.docs.map((doc) => ({ id: doc.id, user_id: doc.id, username: doc.data().username })));
        });



    };

    // Set a new request to firebase:
    const handleRequestJoin = async (e) => {

        e.preventDefault();
        setError('')

        try {
            setLoading(true);
            addDoc(collection(db, "groupRequests"), {
                group_id: groupData.group_id,
                group_admin: groupData.group_admin,
                user_id: user.uid,
                username: user.displayName,
                request_sent_date: serverTimestamp(),
                request_accepted: null,
                request_accepted_date: null
            });
            await getData();
            setLoading(false);
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    };

    // Accept the request as admin:
    const handleRequestAccept = async (e, isAccepted, user_id) => {

        const q = query(
            collection(db, "groupRequests"),
            where("group_id", "==", groupData.group_id),
            where("user_id", "==", user_id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docu) => {
            const docReference = doc(db, "groupRequests", docu.id);
            updateDoc(docReference, {
                request_accepted: isAccepted,
                request_accepted_date: serverTimestamp()
            });
            setDoc(doc(db, `groups/${docu.data().group_id}/groupUsers`, docu.data().user_id), { user_id: docu.data().user_id, username: docu.data().username });
        });


    };

    // Send a message: 
    const sendMessage = async (messageText) => {

        addDoc(collection(db, `groups/${groupData.group_id}/messages`), {
            user_id: user.uid,
            message: messageText,
            message_sent: serverTimestamp(),
            group_id: groupData.group_id,
            photoURL: user.photoURL,
            user_alt: user.displayName.charAt(0).toUpperCase(),
            username: user.displayName
        });

    };

    // Strava:
    async function fetchStats() {
        if (stats == null) {
            const response = await fetch(
                'https://www.strava.com/api/v3/athletes/30631816/stats',
                {
                    headers: {
                        Authorization: 'Bearer cd10e298dcb4b0c330407e009c70b7c5b5424bd6'
                    }
                }
            );
            const data = await response.json();
            setStats(data);
        }

    }



    useEffect(() => {
        if (messages) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [messages])

    useEffect(() => {
        getData();
        getRequests();
        getGroupUsers();
        console.log("now:");
        console.log(messages);
    }, [])



    return (
        loading ? <SplashScreen /> :
            <Box>

                <Hero type="group-item" image={groupData.image} title={location.state.title} desc="Riteņbraucēju grupas lapa, kurā iespējams sarakstīties ar citiem grupas lietotājiem un uzzināt jaunāko informāciju par un ap treniņiem." ></Hero>



                <Grid container spacing={3}>


                    <Grid item md={4} sm={12} xs={12}>
                        {groupData.group_admin != user.uid ?
                            (!loading && (groupData.group_admin == user.uid) ? null :
                                (isRequested && !isAccepted ? <AccentButton onClick={(e) => null} variant="contained">Requested Join</AccentButton>
                                    : !isRequested ? <ColorButton onClick={(e) => handleRequestJoin(e)} variant="contained">Request Join</ColorButton> : null)
                            )


                            :
                            groupRequestLists.length > 0 ? <Box sx={{ width: "auto", borderRadius: 6, backgroundColor: 'white', textAlign: 'left', padding: 3, marginBottom: 2 }} >
                                <h1 style={{ marginBottom: 15 }}>Requests</h1>
                                {groupRequestLists.map((request) => {
                                    return (
                                        <Box padding="10px" sx={{ backgroundColor: '#f3f5f8', borderRadius: 5 }}>

                                            <Grid container>
                                                <Grid item xs sx={{ margin: "auto", paddingLeft: 1.5 }}>
                                                    <h3>{request.username}</h3>
                                                </Grid>
                                                <Grid item>
                                                    <Button onClick={(e) => handleRequestAccept(e, 1, request.user_id)}>Accept</Button>
                                                </Grid>
                                                <Grid item xs={2} sx={{ marginRight: 2 }}>
                                                    <Button color="warning" onClick={(e) => handleRequestAccept(e, 0, request.user_id)}>Reject</Button>
                                                </Grid>
                                            </Grid>



                                        </Box>

                                    );
                                })}
                            </Box> : null
                        }
                        <Box sx={{ width: "auto", borderRadius: 6, backgroundColor: 'white', textAlign: 'left', padding: 3, marginBottom: 2 }} >
                            <Grid container>
                                <Grid item>
                                    <h1 style={{ marginBottom: 15 }}>Group Information</h1>
                                </Grid>
                                <Grid item>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            type="file"
                                            onChange={(e) => handleSave(e.target.files[0])}
                                        />
                                        <PhotoCamera />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Box padding="10px" sx={{ backgroundColor: '#f3f5f8', borderRadius: 5 }}>
                                <Box padding="10px">
                                    <h5>Group Category</h5>
                                    <Chip icon={<DirectionsBikeRoundedIcon />} label={groupData.group_category} sx={{ marginTop: 1, paddingLeft: 1, fontWeight: 'bold', backgroundColor: amber[300] }} />
                                </Box>
                                <Box padding="10px">
                                    <h5>Description</h5>
                                    <p>{groupData.group_description}</p>
                                </Box>


                            </Box>
                        </Box>


                        <Box sx={{ width: "auto", borderRadius: 6, backgroundColor: 'white', textAlign: 'left', padding: 3 }} >
                            <h1 style={{ marginBottom: 15 }}>Group Users</h1>
                            <Box padding="10px" sx={{ backgroundColor: '#f3f5f8', borderRadius: 5 }}>
                                {groupUsersList.map((groupUser) => {
                                    return (
                                        <Box padding="10px" key={groupUser.user_id}>

                                            {groupUser.user_id == groupData.group_admin && groupData.group_admin == user.uid
                                                ? <Box sx={{ display: "flex", gap: "5px", verticalAlign: "bottom" }}><h3 key={groupUser.user_id} style={{ color: "#2e82d6", marginRight: 2 }}>You</h3><h5 sx={{ margin: 2 }}>*Admin*</h5></Box>
                                                : groupUser.user_id == groupData.group_admin
                                                    ? <Box sx={{ display: "flex", gap: "5px" }}><h3 key={groupUser.user_id} style={{ color: "#2e82d6", marginRight: 2 }}>{groupUser.username}</h3><h5>*Admin*</h5></Box>
                                                    : <h3 key={groupUser.user_id}>{groupUser.username} </h3>}



                                        </Box>

                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={8} sm={12} xs={12}>
                        <Box sx={{ width: "auto", borderRadius: 6, backgroundColor: 'white', textAlign: 'left', padding: 3 }} >
                            <h1 style={{ marginBottom: 15 }}>Group Chat</h1>
                            {isAccepted || groupData.group_admin == user.uid ?
                                <Box padding="15px" sx={{ backgroundColor: '#f3f5f8', borderRadius: 5, minHeight: 700, flexDirection: "column-reverse", overflowY: "scroll" }}>
                                    <div class="imessage" id="Text-Input-Box" style={{ maxHeight: 800 }}  >

                                        {messages.map((msg) => {
                                            if (msg.user_id == user.uid) {
                                                return (
                                                    <p class="from-me">{msg.message}</p>
                                                )
                                            } else {

                                                return (
                                                    <Grid container wrap="nowrap"  >
                                                        <Grid item sx={{ marginTop: "auto", marginBottom: "auto", paddingRight: 1.5 }}>
                                                            <Tooltip title={msg.username}>
                                                                <Avatar alt={msg.user_alt} src={msg.photoURL}>{msg.user_alt}</Avatar>
                                                            </Tooltip>

                                                        </Grid>
                                                        <Grid item>
                                                            <p class="from-them">{msg.message}</p>
                                                        </Grid>



                                                    </Grid>

                                                )
                                            }

                                        })}
                                        <div ref={bottomRef}></div>
                                    </div>

                                    <Box id="Text-Input-Box" sx={{ backgroundColor: 'white', height: 60, borderRadius: 6, margin: "auto", paddingLeft: 3, paddingRight: 3, paddingTop: "15px", width: "auto" }}>

                                        <TextField
                                            onChange={(e) => setMessageText(e.target.value)}
                                            onKeyPress={(ev) => {
                                                console.log(`Pressed keyCode ${ev.key}`);
                                                if (ev.key === 'Enter') {
                                                    // Do code here
                                                    console.log(messageText)
                                                    sendMessage(messageText);
                                                    setMessageText('');
                                                }
                                            }}
                                            value={messageText}
                                            fullwidth="true" placeholder="Type something..." width="1000px" variant="standard" InputProps={{ disableUnderline: true }} sx={{ width: "100%", '& legend': { display: 'none' }, '& fieldset': { top: 0 }, }}
                                        />
                                    </Box>
                                </Box>
                                : <Box sx={{ backgroundColor: '#f3f5f8', borderRadius: 5, minHeight: 120, textAlign: "center", margin: "auto", display: "flex", justifyContent: "center" }}>
                                    <h3 style={{ margin: "auto" }}>You're not a member of this group</h3>
                                </Box>}
                        </Box>
                    </Grid>
                </Grid>

            </Box>

    )
}