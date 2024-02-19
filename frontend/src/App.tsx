import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom"
import Navbar from "./routing/components/Navbar";
import Router from "./routing/router";
import {Divider} from "@mui/material";

const App = () => {

  // useEffect(() => {
  //   fetch('http://localhost:4000/api/categories/', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name: 'First', icon: 'smile'})
  //   }).then((res) => {
  //     console.log(res.json())
  //   }).catch((error) => {
  //     debugger
  //     console.log(error)
  //     console.log(error)
  //   })
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Divider />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
