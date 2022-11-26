// SPDX-License-Identifier: UNLICENSED

import "./Auction.sol";
pragma solidity >=0.5.0 <0.9.0; 

contract AuctionFactory{
    address[] public auctions;
    
    function createAuction(string memory productName, string memory productDetails, string memory productImage, string memory productVideo) public payable{
        auctions.push(address(new Auction(address(msg.sender), productName, productDetails, productImage, productVideo)));
    }

    function getAuctionDetails() public view returns(address[] memory){
        return auctions;
    }
}