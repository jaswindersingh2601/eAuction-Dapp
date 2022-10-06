import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className='navbar'>
            <div className="logo">
                <h1>eAuction</h1>
            </div>
            <div className="menu">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/auction">Auction</Link>
                </li>
                <li>
                    <Link to="/sell">Sell</Link>
                </li>
            </div>
        </nav>
    )
}

export default Navbar; 
