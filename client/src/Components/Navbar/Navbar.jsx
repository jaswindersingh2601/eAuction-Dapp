import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarContainer, Nav, LogoContainer, Logo, Menu } from './NavbarElements';
 
function Navbar() {
    const myStyle = {
        textDecoration: "none"
    }

    return (
        <NavbarContainer>
            <Nav>
                <LogoContainer>
                    <Logo src="/LogoImg.png"></Logo>
                </LogoContainer>
                <Menu>
                    <Link style={myStyle} to="/">Home</Link>
                    <Link style={myStyle} to="/auction">All Auctions</Link>
                    <Link style={myStyle} to="/sell">Create</Link>
                    <Link style={myStyle} to="/yourAuctions">Your Auctions</Link>
                </Menu>
            </Nav>
        </NavbarContainer>
    )
}

export default Navbar;