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
  
  const db = getFirestore(app);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //console.log(data);

      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
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
    <div> 
      <Hero title='Home'/>
      <Hero title='Random' desc="Apraksts"/>
      <ActionAreaCard image="google.svg"></ActionAreaCard>
    </div>
  )

}