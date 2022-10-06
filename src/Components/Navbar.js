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
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
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



    return (location.pathname != '/SignIn' && location.pathname != '/SignUp') ? (


        <header>
            <Link to="/" className="site-title"><img src="bikerides-logo.svg" width="150px"></img></Link>
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
                <Avatar  sx={{ bgcolor: blue[500], width: 32, height: 32 }}>{user ? (user.email ? user.email.charAt(0).toUpperCase() : '') : ''}</Avatar>
            </IconButton>



            <div sx={{ borderRadius: "25px" }}>

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
                    <MenuItem  onClick={navigateToProfile} >
                    <Avatar  sx={{ bgcolor: blue[500], width: 32, height: 32 }}>{user ? (user.email ? user.email.charAt(0).toUpperCase() : '') : ''}</Avatar> Profile
                    </MenuItem>
                    <MenuItem>
                    <Avatar  sx={{ bgcolor: blue[500], width: 32, height: 32 }}>{user ? (user.email ? user.email.charAt(0).toUpperCase() : '') : ''}</Avatar>My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem  onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>



            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
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

