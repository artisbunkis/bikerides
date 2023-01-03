import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { CardActionArea } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp, where, query, onSnapshot } from "firebase/firestore";
import { db, storage } from "../Config/firebase-config";
import { UserAuth } from '../Config/AuthContext';
import { useState, useEffect } from 'react';
import { DiscountSharp } from '@mui/icons-material';




export default function GroupCard(props) {

    const { user, updateProfile } = UserAuth();
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/Group/${props.group_id}`, { state: { title: props.title, group_id: props.group_id } }, { replace: true }), [navigate]);

    



    return (
        <Box>
            <Card sx={{ width: "auto", minWidth: 430, maxWidth: 440, borderRadius: 6 }} onClick={handleOnClick} >
                <CardActionArea>

                    <CardContent>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container sx={{ marginBottom: "10px" }}>
                                    <Grid item xs={12} padding="0">
                                        <Typography variant="h5" component="div" textAlign={"left"}>
                                            {props.title}
                                        </Typography>
                                        <Typography variant="subtitle2" component="div" margin={0} padding={0} color='primary' textAlign={"left"}>
                                            {props.category}
                                        </Typography>
                                    </Grid>

                                </Grid>

                                <Grid container justifyContent="start" alignItems="center" marginLeft={0} marginBottom={1} >
                                    <Grid item padding="0">
                                        <Avatar alt={props.group_admin_username} src={props.group_admin_photoURL} />
                                    </Grid>
                                    <Grid item padding="0px 0px 0px 10px" >
                                        <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                                            {props.group_admin_username}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sx={{textAlign: "right"}}>
                                <img style={{borderRadius: "20px"}} src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Group Photo" width={150} />
                            </Grid>
                        </Grid>





                    </CardContent>


                </CardActionArea>
            </Card>
        </Box>

    );
}
