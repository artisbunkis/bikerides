import Navbar from "./Components/Navbar"
import Shopping from "./Pages/Shopping"
import ShoppingItem from "./Pages/ShoppingItem"
import Home from "./Pages/Home"
import About from "./Pages/About"
import SignIn from "./Pages/SignIn"
import SignUp from './Pages/SignUp';
import Groups from './Pages/Groups';
import Profile from './Pages/Profile';
import PageNotFound from './Pages/PageNotFound';
import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom"
import { AuthContextProvider } from "./Config/AuthContext";
import PrivateRoute from "./Config/PrivateRoute";
import AuthenticatedRoute from "./Config/AuthenticatedRoute";
import SplashScreen from "./Components/SplashScreen"



function App() {

  const location = useLocation();
  console.log(location);

  return (


    <div className="container">
      <AuthContextProvider>
        
        <Navbar />

        <Routes>
          <Route index element={<PrivateRoute> <Home /> </PrivateRoute>} />

          <Route path='/signin' element={<AuthenticatedRoute children={<SignIn />} />} />
          <Route path='/signup' element={<AuthenticatedRoute children={<SignUp />} />} />

          <Route path='/splash' element={<SplashScreen />} />

          <Route path='/' element={<PrivateRoute children={<Home />} />} />
          <Route path='/Home' element={<PrivateRoute> <Home /> </PrivateRoute>} />
          <Route path='/Shopping' element={<PrivateRoute> <Shopping /> </PrivateRoute>} />
          <Route path='/Groups' element={<PrivateRoute> <Groups /> </PrivateRoute>} />
          <Route path='/About' element={<PrivateRoute> <About /> </PrivateRoute>} />
          <Route path='/Profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />

          <Route path="*" element={<PageNotFound />} />

          <Route path='/ShoppingItem/:title' element={<PrivateRoute> <ShoppingItem /> </PrivateRoute>} />
        </Routes>
      </AuthContextProvider>
    </div>





  );
}





export default App;

