import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';




export default function Hero(props) {
    return (
        <Grid container spacing={2} bgcolor="white" width="auto" height="auto" borderRadius="16px" display="flex" maxWidth="1380px" margin='auto auto 20px auto' justifyContent="center" 
        alignItems="center"> 

                <Grid
                    item
                    height='400px'
                    xs={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '16px 0px 0px 16px'
                        
                    }}
                />

                <Grid item xs={6} height="auto" width="auto" alignItems="center" sx={{ verticalAlign: "center" }}>
                    <Stack><h2>{props.title}</h2></Stack>
                </Grid>
            </Grid>
    );
}
