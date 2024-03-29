import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SplashScreen from "../Components/SplashScreen"
import { db } from "../Config/firebase-config";
import { doc, setDoc } from "firebase/firestore"; 

const theme = createTheme();

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('')
    const { createUser, updateProfile } = UserAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    // Piereģistrēšanās poga ar E-pastu un paroli:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {

            const res = await createUser(email, password, username).then( (userCredential) => {
                // Sets Auth display name
                updateProfile(userCredential.user, { displayName: username });
                
                // Sets initial data in users collection for user with uid:
                setDoc(doc(db, "users", userCredential.user.uid), {
                    birthDate: null,
                    email: userCredential.user.email,
                    firstName: null,
                    lastName: null,
                    gender: "Unknown",
                    phoneNumber: null,
                    userName: username,
                    country: null,
                    city: null,
                    photoURL: null,
                });
            });
     
            navigate('/')
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setLoading(false);
            console.log(e.message);
        }
    };

    return (
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
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
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

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="end">

                                    <Grid item>
                                        <Link href="/SignIn" variant="body2">
                                            Already have an account? Sign In!
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            }
        </ThemeProvider>
    );
}

export default SignUp;

