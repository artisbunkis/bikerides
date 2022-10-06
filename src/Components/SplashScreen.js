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
import { red } from '@mui/material/colors';
import { bgcolor } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';


export default function SplashScreen() {
    return (
        <div className="container">
            <Box sx={{ width: "auto", height: "auto", margin: "40%  10%  0% 10%" }}>
                <Box sx={{ paddingBottom: 2 }}>
                    <img width="30%" src="bikerides-logo.svg" />
                </Box>
                <Box width="30%" margin="auto">
                    <LinearProgress />
                </Box>

            </Box>
        </div>
    );
}
