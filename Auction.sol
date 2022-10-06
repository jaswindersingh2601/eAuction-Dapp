// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17; 

contract Auction{
    address payable public auctioneer; 
    uint public startTiming;
    uint public endTiming;
    enum state{start,end,wait,cancel}
    state public auctionState = state.wait;
    uint public startingBid; 

    struct bidder{
        uint bid;
        bool isJoin;
        bool firstBid;
    }

    mapping (address=>bidder) public bidders;
    address payable[] public bidderAddress;
    address winner;

    constructor(){
        auctioneer = payable(msg.sender);
    }

    modifier isAuctioneer{
        require(msg.sender == auctioneer, "You are not Auctioneer");
        _;
    }

    modifier isAuctionStart{
        require(auctionState == state.start, "Auction is not start yet, Please wait for a while");
        _;
    }

    modifier isAuctionEnd{
        require(block.timestamp >= endTiming, "Auction is ongoing, Please wait for the auction to finish");
        _;
    }
    function startAuction(uint firstBid, uint duration) public isAuctioneer{
        auctionState = state.start;
        startingBid = firstBid * (1 ether);
        startTiming = block.timestamp;
        endTiming = startTiming + (duration * 60);
    }

    function endAuction() public isAuctioneer isAuctionStart isAuctionEnd{
        highestBidder();
        for(uint i=0; i<bidderAddress.length; i++){
            if(bidderAddress[i] != winner){
                bidderAddress[i].transfer(bidders[bidderAddress[i]].bid);
            }
        }
        auctionState = state.end;
    }

    function highestBidder() public{
        uint max = 0; 
        for(uint i=0; i<bidderAddress.length; i++){
            if(bidders[bidderAddress[i]].bid > max){
                max = bidders[bidderAddress[i]].bid;
                winner = bidderAddress[i];
            }
        }
    }

    function joinAuction() public isAuctionStart{
        require(block.timestamp < endTiming, "Auction has been finished, You can't join.");
        require(msg.sender != auctioneer, "Auctioneer cannot join the auction");
        bidder memory newBidder = bidder({
            bid : 0,
            isJoin : true,
            firstBid : false
        });
        bidders[msg.sender] = newBidder;
        bidderAddress.push(payable(msg.sender));
    }

    function placeBid() payable public isAuctionStart{
        require(block.timestamp < endTiming, "Auction has been finished, You can't place bid.");
        require(msg.sender != auctioneer, "Auctioneer cannot bid in the Auction.");
        require(bidders[msg.sender].isJoin == true, "You have to join first");
        if(!(bidders[msg.sender].firstBid)){
            require(msg.value >= startingBid, "You have to bid atleast of starting Bid");
            bidders[msg.sender].firstBid = true;
        }
        require(bidders[msg.sender].bid + msg.value >= bidders[msg.sender].bid + (1 ether), "You have to increase your bid by atleast 1 ether.");
        bidders[msg.sender].bid = bidders[msg.sender].bid + msg.value;
    }

    function getBalance() public isAuctioneer isAuctionEnd view returns(uint balance){
        return address(this).balance;
    }

    function getEther() public isAuctionEnd{
        require(msg.sender == winner);
        auctioneer.transfer(address(this).balance);
    }

    function isAssestDelivered() public isAuctionEnd{
        require(msg.sender == winner);
        getEther();

    }
}
