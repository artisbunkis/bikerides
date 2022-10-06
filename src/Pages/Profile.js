import Hero from "../Components/Hero"
import { UserAuth } from '../Config/AuthContext';

export default function Profile() {

    const { user, logout } = UserAuth();
    
    return (
      <Hero title="Profile" desc={'E-mail: '+user.email}></Hero>  
    )
  }