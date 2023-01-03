import Button from '@mui/material/Button';
import ActionAreaCard from '../Components/Card';
import Card from "../Components/Card"
import Hero from "../Components/Hero"
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import app from '../Config/firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Config/AuthContext';


export default function Home() {

  const thumbnail = {
    borderRadius: "25px",
    width: "100%",
    height: "400px",
    margin: "auto",
    textAlign: "center",
    position: "relative",
  }


  const caption = {
    position: "absolute",
    margin: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: "#464445",
    height: "100px",
    fontSize: "72px",
    letterSpacing: "-5px"

  }


  const db = getFirestore(app);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //console.log(data);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
  }, [])

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };


  return (


    <div class="thumb" style={thumbnail}>
      <div>
        <img src="https://images.unsplash.com/photo-1601625193660-86f2807b024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" style={{borderRadius: "25px", objectFit: "cover"}}  width="100%" height="960px"/>
          <h1 class="text_over_image" style={caption}>Welcome.</h1>
      </div>
    </div>


  )

}