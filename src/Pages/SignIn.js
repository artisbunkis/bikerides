import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SplashScreen from "../Components/SplashScreen"
import { red } from '@mui/material/colors';
import { db } from "../Config/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const theme = createTheme();

const SignIn = () => {
    const redColor = red[500]; // #f44336
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();
    const { signInWithGoogle } = UserAuth();
    const [loading, setLoading] = useState(false);

    // Pieslēgšanās poga ar Google:
    const handleGoogle = async (e) => {
        
        // Neļauj restartēt lapu:
        e.preventDefault();

        // Sākumā kļūdas nav:
        setError('')

        try {
            // Aktivizē lādēšanās skatu:
            setLoading(true);

            // Pieslēdzas ar Google Auth Firebase iebūvēto funkciju:
            const res = await signInWithGoogle()

            // Mainīgais, vai eksistē lietotājs:
            const recordExists = doc(
                db, "users", res.user.uid
            ).exists;

            const userProfileRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(userProfileRef);

            // Ja eksistē lietotājsm tad neveido, citādi izveido user:
            if (docSnap.exists()) {
                console.log('exists')
            } else {
                // doc.data() nav definēts šeit.
                console.log("No such document!")
                setDoc(doc(db, "users", res.user.uid), {
                    birthDate: null,
                    email: res.user.email,
                    firstName: null,
                    lastName: null,
                    gender: "Unknown",
                    phoneNumber: null,
                    userName: res.user.displayName,
                    country: null,
                    city: null,
                    photoURL: res.user.photoURL
                });
            }

            // Sekmīgi, tad pārvieto lietotāju uz sākumlapu: 
            navigate('/')
            // Deaktivizē lādēšanās skatu:
            setLoading(false);
        } catch (e) {
            // Ielogo kļūdas:
            setError(e.message)
            setLoading(false)
            console.log(e)
        }
    }

    // Pieslēgšanās poga ar E-pastu un Paroli:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            setLoading(true);
            await signIn(email, password)
            navigate('/')
            setLoading(false);
        } catch (e) {
            setError(e.message)
            setLoading(false)
            console.log(e)
        }
    };

    return (

        <div className='container-signin'>
            <ThemeProvider theme={theme}>
                {loading ? <SplashScreen /> :
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/user/tomphotocycling)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >

                                <img src="bikerides-logo.svg" width="50%" style={{ paddingBottom: 35 }} />
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                    {email ? email.charAt(0).toUpperCase() : <LockOutlinedIcon />}
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={(e) => setEmail(e.target.value)}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        onChange={(e) => setPassword(e.target.value)}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    {error ? <Typography variant="subtitle2" color={redColor} textAlign={"center"} padding={"10px 0px 20px 0px"}>The email or password did not match. Please try again.</Typography> : null}
                                   
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button variant="outlined" startIcon={<img width="16px" src="google.svg"></img>} onClick={handleGoogle}
                                        fullWidth
                                        sx={{ mt: 3, mb: 2, verticalAlign: 'center', marginTop: 0 }}>
                                        Sign in with Google
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            
                                        </Grid>
                                        <Grid item>
                                            <Link href="/SignUp" variant="body2">
                                                Don't have an account? Sign Up!
                                            </Link>

                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Grid>
                    </Grid>}
            </ThemeProvider>
        </div>
    );

};

export default SignIn;