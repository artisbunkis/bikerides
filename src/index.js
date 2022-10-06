import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./Assets/Styles/styles.css"
import { AuthContextProvider } from "./Config/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
    

)