import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instAbi } from "../../ABI";
import { Container, ProductContainer, Image, DetailsContainer, Title, Description, FuncContainer, Subtitle, Button, Form, Input, Box, BidderContainer, BidderCard } from "./ViewAuctionElements";

var web3; 
var accounts;
var contract;

const ViewAuction = () => {
  const { id } = useParams();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [endTiming, setEndTiming] = useState();
  const [bidAmount, setBidAmount] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [userBid, setUserBid] = useState(0);
  const [isAuctioneer, setIsAuctioneer] = useState(false);
  const [isJoin, setJoin] = useState(false);
  const [state, setState] = useState(); 
  const [startingBid, setStartingBid] = useState(0);
  const [duration, setDuration] = useState();
  const [bidderAddress, SetBidderAddress] = useState([]);
  const [bidders, setBidders] = useState([]);
  const [bids, setBids] = useState([]);
  const [winner, setWinner] = useState();
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    async function connect3() {
      var currentProvider = new window.Web3.providers.HttpProvider(
        "http://localhost:4000"
      );
      web3 = new window.Web3(currentProvider);
      if (typeof web3 === "undefined") alert("Install meta Mask to use");
      else {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (Array(accounts).length > 0) {
          console.log(`connected to metamask with ${accounts[0]}`);
        } else alert("Account not connected");
      }
    }

    async function fetchContract(address) {
      await connect3();
      contract = new web3.eth.Contract(instAbi, address);
      const auctioneer = await contract.methods.auctioneer().call();
      if (auctioneer.toLowerCase() === accounts[0].toLowerCase()) {
        setIsAuctioneer(true);
      }
      const img = await contract.methods.productImage().call();
      setImage(img);
      const name = await contract.methods.productName().call();
      setName(name)
      const details = await contract.methods.productDetails().call();
      setDetails(details)
      const end = await contract.methods.endTiming().call();
      setEndTiming(end)
      const state = await contract.methods.auctionState().call();
      setState(state);
      const bid = await contract.methods.bidders(accounts[0]).call();
      setUserBid((bid.bid)/1000000000000000000)
      setJoin(bid.isJoin); 
      const bidderAddress = await contract.methods.getBiddersAddress().call();
      SetBidderAddress(bidderAddress);
      const result = await contract.methods.winner().call(); 
      setWinner(result)
      const res = await contract.methods.highestBid().call()
      setHighestBid(res/1000000000000000000)
      const s = await contract.methods.startingBid().call();
      setStartingBid(s/1000000000000000000)
      if( result.toLowerCase() === accounts[0].toLowerCase() && state === "1"){
        setDelivered(true)
      }
      bidderAddress.map( (address) => {
        contract.methods.bidders(address).call()
        .then( res => setBids( prev => [...prev, res.bid/1000000000000000000]))
      })
    }
    fetchContract(id);
  }, []);

  async function placeBid(bidderAdd, amount) {
    try {
      const bidAmount = amount * 1000000000000000000;
      const res = await contract.methods.placeBid().send({ from: bidderAdd, value: bidAmount, gas: 3000000 });
      const bid = await contract.methods.bidders(bidderAdd).call();
      setBidAmount(0);
      setUserBid((bid.bid)/1000000000000000000)
      window.alert(`Your bid of ${amount} is successfully placed`)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function startAuction(startingBid, duration) {
    try {
      if(startingBid > 0 && duration > 0){
        const res = await contract.methods.startAuction(startingBid, duration).send({ from: accounts[0], gas: 3000000 })
        const end = await contract.methods.endTiming().call();
        window.alert('Auction started successfully')
        setState("0")
        setEndTiming(end)
        setStartingBid(startingBid)
      }else{
        throw new Error('Both Starting Bid and duration are required')
      }
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
      console.log(err)
    }
  }

  async function joinAuction() {
    try { 
      const res = await contract.methods.joinAuction().send({ from: accounts[0], gas: 3000000 })
      window.alert('You have joined successfully')
      setJoin(true)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function getHighestBid(){
    try {
      const res = await contract.methods.highestBid().call()
      setHighestBid(res/1000000000000000000)
      const win = await contract.methods.winner().call()
      setWinner(win)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function isDelivered(){
    try {
      await contract.methods.isAssestDelivered().send({ from: accounts[0], gas: 3000000 })
      window.alert("done successfully")
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function endAuction(){
    try {
      const res = await contract.methods.endAuction().send({ from: accounts[0], gas: 3000000});
      const end = await contract.methods.endTiming().call();
      window.alert('Auction ended successfully')
      setState("1")
      setEndTiming(end)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      {
        isAuctioneer ? (
          <Container>
            <ProductContainer>
              <Image  src={image}></Image>
              <DetailsContainer>
              <Title>{name}</Title>
              <Description>{details}</Description>
              </DetailsContainer>
            </ProductContainer>
            <FuncContainer>
            { state === "0" && <h3>Starting Bid : {startingBid} ETH</h3>}
              <Box>
              <Subtitle>{ state === "0" && <span> (Ongoing) </span> }{ state === "1" && <span> (Ended) </span> }{ endTiming !== "0" && <span>Ends on : { (new Date(endTiming*1000)).toLocaleString()}</span>}</Subtitle> 
                {
                  state === '2' ? (
                      <Form onSubmit={handleSubmit}>
                        <Input type="number" placeholder="Starting Bid(ETH)" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} />
                        <Input type="number" placeholder="Duration(min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <Button onClick={(e) => startAuction(startingBid, duration)}>Start Auction</Button>
                      </Form>
                  ) : (
                    <></>
                  )
                }
                {
                  state !== "1" && endTiming <= Math.floor(new Date().getTime()/1000.0) && endTiming != "0" ? (
                    <Button onClick={ () => endAuction()}>End Auction</Button>
                  ):(
                    <></>
                  ) 
                }
              </Box>
              <Box>
              <p>
              <h4>Highest Bid : {highestBid} ETH</h4>
              <h4>Winner will be : {winner}</h4>
              </p>
              <Button onClick={ () => getHighestBid() }>Highest Bid</Button>
              </Box>
                <h3>All Bidders</h3>
                <BidderContainer>
                  {
                    bidderAddress.map((address, index) => {
                      return (
                        <BidderCard key={index}> 
                          <span>{address} : {bids[index]} ETH</span> 
                        </BidderCard>
                      )
                    })
                  }
                </BidderContainer>
            </FuncContainer>
          </Container>
        ) : (
          <Container>
            <ProductContainer>
              <Image  src={image}></Image>
              <DetailsContainer>
              <Title>{name}</Title>
              <Description>{details}</Description>
              </DetailsContainer>
            </ProductContainer>
            <FuncContainer>
              { state === "0" && <h3>Starting Bid : {startingBid} ETH</h3>}
              <Box>
              <Subtitle>{ state === "0" && <span> (Ongoing) </span> }{ state === "1" && <span> (Ended) </span> }{ endTiming !== "0" && <span>Ends on : { (new Date(endTiming*1000)).toLocaleString()}</span>}</Subtitle>
              {
                !isJoin && <Button onClick={ (e) => joinAuction()}>Join</Button>
              }
              </Box>
              <Box>
              <h3>Your Bid : {userBid} ETH</h3>
              <Form onSubmit={handleSubmit}>
                <Input type="number" name="" id="" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                <Button type="submit" onClick={(e) => placeBid(accounts[0], bidAmount)}>Place Bid (ETH)</Button>
              </Form>
              </Box>
              <Box>
              <p>
              <h4>Highest Bid : {highestBid} ETH</h4>
              <h4>Winner will be : {winner}</h4>
              </p>
              <Button onClick={ () => getHighestBid() }>Highest Bid</Button>
              </Box>
              { delivered && <Button onClick={ () => isDelivered()}>Is Delivered ?</Button>}
            </FuncContainer>
          </Container>
        )
      }
    </>
  );
};

export default ViewAuction; 