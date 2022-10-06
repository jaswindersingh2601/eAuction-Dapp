import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';

import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Sell from "./pages/Sell";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={ <Auction /> } />
          <Route path="/sell" element={ <Sell /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
