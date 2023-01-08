import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebase-config";
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function GroupCard(props) {

    const [groupData, setGroupData] = useState([null]);

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/Group/${props.group_id}`, { state: { title: props.title, group_id: props.group_id } }, { replace: true }), [navigate]);

    const [loading, setLoading] = useState(true);

    const [imageIsLoading, setImageIsLoading] = useState(true);
    const [image, setImage] = useState({});
    
    // Kad attēls ir ielādējies:
    const handleImageLoaded = () => {
        setImageIsLoading(false);
    };

    // Iegūt grupas datus:
    const getData = async (e) => {
        setLoading(true)

        // Get & Set Group data:
        const q = query(collection(db, "groups"), where("group_id", "==", props.group_id));
        const data = onSnapshot(q, (querySnapshot) => {
            setGroupData(querySnapshot.docs[0].data());
        });
        
        const image = new Image();
        image.onload = handleImageLoaded;
        image.src = groupData.image ? groupData.image : "/bikerides-group-thumbnail.png";
        setImage(image);
        setLoading(false);
    }

    // Klausīšanās funkcija:
    useEffect(() => {
        getData();
    }, [])

    return (
        <Box sx={{ padding: 2 }}>


            <Card sx={{ width: 345, minWidth: 345, maxWidth: 345, borderRadius: 6 }} onClick={handleOnClick} >
                <CardActionArea>
                    {imageIsLoading ? <Box sx={{ height: "200px" }} display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <CircularProgress color="primary" sx={{ margin: "auto" }} />
                    </Box> : <CardMedia
                        component="img"
                        height="180"
                        image={groupData.image ? groupData.image : "/bikerides-group-thumbnail.png"}
                    />}
                 
                    <CardContent>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" marginLeft={0} marginBottom={1}>
                            <Grid item xs={6} padding="0">
                                <Typography variant="h5" component="div" textAlign={"left"}>
                                    {props.title}
                                </Typography>
                                <Typography variant="subtitle2" component="div" margin={0} padding={0} color='primary' textAlign={"left"}>
                                    {props.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} padding="0" >
                                <Chip
                                    avatar={<Avatar src={props.group_admin_photoURL} />}
                                    label={props.group_admin_username}
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxPack: 'end',
                            WebkitBoxOrient: 'vertical'
                        }}>
                            <Typography variant="body2" color="text.secondary" textAlign={"left"} paddingLeft="16px" paddingRight="16px">
                                {props.category}
                            </Typography>
                        </Box>

                    </CardContent>

                </CardActionArea>
            </Card>
        </Box>

    );
}
