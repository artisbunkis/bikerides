import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Hero(props) {
    return (
        <Box bgcolor="white" marginBottom="20px" width="auto" height="auto" borderRadius="16px"  >
            <Grid container  bgcolor="white" width="auto" height="auto" borderRadius="16px" display="flex" justifyContent="center" alignItems="center">
                <Grid
                    item
                    height='400px'
                    xs={12}
                    sm={6}
                    md={8}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '16px 0px 0px 16px',
                        [theme.breakpoints.down('sm')]: {
                            height: 250,
                            borderRadius: '16px 16px 0px 0px',

                          },

                    }}
                />

                <Grid item xs={12} md={4} sm={6} height="auto" width="auto" alignItems="center" sx={{ verticalAlign: "center" }}>
                    <Stack textAlign="start" padding="10%" spacing={2} >
                        <h1>{props.title}</h1>
                        <Divider variant="middle" width="20%" />
                        <Typography variant="body2" color="text.secondary" textAlign={"left"} paddingRight="16px">
                            {props.desc}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid >
        </Box >

    );
}
