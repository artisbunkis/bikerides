import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { React, useRef, useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa"
import { useNavigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Drawer from '@mui/material/Drawer';
import Logout from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';



export default function Navbar() {

    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { logout } = UserAuth();

    const { user } = UserAuth();

    const navigate = useNavigate();

    const navigateToProfile = () => {
        // 👇️ navigate to /contacts
        navigate('/Profile');
    };
    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/');
    };
    const navigateToShopping = () => {
        // 👇️ navigate to /contacts
        navigate('/Shopping');
    };
    const navigateToAbout = () => {
        // 👇️ navigate to /contacts
        navigate('/About');
    };
    const navigateToGroups = () => {
        // 👇️ navigate to /contacts
        navigate('/Groups');
    };

    // Drawer
    const [state, setState] = useState({
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const handleLogout = async () => {
        handleClose();
        try {
            await logout();
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    };

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    // Priekš Drawer
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                <ListItem sx={{ justifyContent: "end" }}>
                    <button className="nav-btn" onClick={toggleDrawer("right", true)}>
                        <FaTimes />
                    </button>
                </ListItem>
                <ListItem onClick={navigateToShopping}>
                    <ListItemButton >
                        <ListItemText primary="Shopping" />
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={navigateToGroups}>
                    <ListItemButton>
                        <ListItemText primary="Groups" />
                    </ListItemButton>
                </ListItem>
                <ListItem >
                    <ListItemButton onClick={navigateToAbout}>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
  
                <ListItem onClick={navigateToProfile}>
                    <ListItemButton >
                        <ListItemIcon>
                                <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32 }} src={user && user.photoURL ? user.photoURL : ""}>{user ? (user.displayName ? user.displayName.charAt(0).toUpperCase() : null) : null}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
    
                <ListItem onClick={handleLogout}>
                    <ListItemButton >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>



            </List>

        </Box>
    );




    return (user && (location.pathname != '/SignIn' && location.pathname != '/SignUp')) ? (


        <header>
            <Link to="/" className="site-title"><img src="https://svgshare.com/i/oWd.svg" width="150px"></img></Link>
            <nav className="nav" ref={navRef}>

                <ul>
                    <CustomLink to="/shopping">Shopping</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    <CustomLink to="/groups">Groups</CustomLink>
                </ul>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>


            <IconButton
                className="nav-btn-desktop"
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32 }} src={user && user.photoURL ? user.photoURL : ""}>{user ? (user.displayName ? user.displayName.charAt(0).toUpperCase() : null) : null}</Avatar>
            </IconButton>



            <div className="desktop-profile-icon" sx={{ borderRadius: "25px" }}>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={navigateToProfile} >
                        <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32 }} src={user && user.photoURL ? user.photoURL : ""}>{user ? (user.displayName ? user.displayName.charAt(0).toUpperCase() : null) : null}</Avatar> Profile
                    </MenuItem>

                    <Divider/>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>



            <button className="nav-btn" onClick={toggleDrawer("right", true)}>
                <FaBars />
            </button>
            <Drawer
                anchor={"right"}
                open={state["right"]}

                onClose={toggleDrawer("right", false)}
                on
            >
                {list("right")}
            </Drawer>
        </header>
    ) : null
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

