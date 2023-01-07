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
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export default function ActionAreaCard(props) {

    // Mainīgo deklarēšana:
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [imageIsLoading, setImageIsLoading] = useState(true);
    const [image, setImage] = useState({});

    // Funkcija, kas spiežot uz kartes aizved uz Shopping item:
    const handleOnClick = useCallback(() => navigate(`/ShoppingItem/${props.id}`, { state: { id: props.id, title: props.title, sellerUserId: props.sellerUserId, image: props.image, desc: props.desc, category: props.category, price: props.price, sellerName: props.sellerName, sellerPhoto: props.sellerPhoto } }, { replace: true }), [navigate]);

    // Funkcija, kas ielādē attēlu:
    function handleImageLoad() {
        setLoading(false);
    }

    // Attēls ielādējies:
    const handleImageLoaded = () => {
        setImageIsLoading(false);
    };

    useEffect(() => {
        const image = new Image();
        image.onload = handleImageLoaded;
        image.src = props.image;
        setImage(image);
      
    }, []);

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
                        image={props.image}
                        alt={props.alt}
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
                                <Chip icon={<MonetizationOnIcon />} label={props.price} color="primary" />
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
                                {props.desc}
                            </Typography>
                        </Box>



                    </CardContent>
                    <Box>
                        <Grid container spacing={2} justifyContent="start" alignItems="center" marginLeft={0} marginBottom={1} paddingLeft="16px" paddingRight="16px" paddingBottom="12px">
                            <Grid item padding="0">
                                <Avatar src={props.sellerPhoto} />
                            </Grid>
                            <Grid item padding="0" >
                                <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                                    {props.sellerName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardActionArea>
            </Card>
        </Box>

    );
}
