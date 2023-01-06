import {Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import  Web3  from 'web3';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from "./pages/Home";
import Auction from "./pages/Auction/Auction";
import Sell from "./pages/Sell";
import ViewAuction from "./pages/ViewAuction/ViewAuction";
import YourAuctions from "./pages/YourAuctions";  

function App(){ 
  return (
    <div className="App">
      <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction">
             <Route index element={ <Auction />}/>
             <Route path={":id"} element={<ViewAuction/>} />
          </Route>
          <Route path="/sell" element={ <Sell/> }/>
          <Route path="/yourAuctions">
            <Route index element={ <YourAuctions/> } />
            <Route path={":id"} element={<ViewAuction/>} />
          </Route>
        </Routes>
    </div>
  ); 
}

export default App;

