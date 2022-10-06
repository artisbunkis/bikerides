import { useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa"
import "../Styles/main.css"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <img src="https://d1bsmz3sdihplr.cloudfront.net/media/Brand/logoicontextdark.svg" width="140px"></img>
            <div>
                <nav ref={navRef}>
                    <a href="/#">Home</a>
                    <a href="/#">My work</a>
                    <a href="/#">Blog</a>
                    <a href="/#">About me</a>
                    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                
            </div>
            <div>
                <button className="nav-btn-desktop" >
                    <FaUser />
                </button>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </div>
            

        </header>
    );
}

export default Navbar;