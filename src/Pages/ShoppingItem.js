import Hero from "../Components/Hero"
import {useLocation} from 'react-router-dom';



export default function ShoppingItem({route,navigate}) {
  const location = useLocation();

  return (
    <h1>
        <Hero title={location.state.title}></Hero>
    </h1>
  )
}