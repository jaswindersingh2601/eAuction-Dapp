import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className='navbar'>
            <div className="logo">
                <h1>eAuction</h1>
            </div>

            <div className="menu">
            {[
                {title: "Home", to:"/"},
                {title: "Auction", to:"/auction"},
                {title: "Sell", to:"/sell"},
                {title: "Your Auctions", to: "/yourAuctions"}
            ].map(({title, to, id}) => (
                 <Link className="RouterLink" to={to}> {title} </Link>
            ))}
            </div>
        </nav>
    )
}  

export default Navbar; 
