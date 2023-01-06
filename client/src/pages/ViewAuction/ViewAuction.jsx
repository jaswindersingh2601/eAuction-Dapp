import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, ProductContainer, Image, DetailsContainer, Title, Description, FuncContainer, Subtitle, Button, Form, Input, Box } from "./ViewAuctionElements";
import "../../css/ViewAuction.css";

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
  const [duration, setDuration] = useState(0);
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
      const abi = [
        {
          "inputs": [],
          "name": "endAuction",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getEther",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "isAssestDelivered",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "joinAuction",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "placeBid",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "firstBid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "duration",
              "type": "uint256"
            }
          ],
          "name": "startAuction",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_auctioneer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_productName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_productDetails",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_productImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_productVideo",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "auctioneer",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "auctionState",
          "outputs": [
            {
              "internalType": "enum Auction.state",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "bidderAddress",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "bidders",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "bid",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isJoin",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "firstBid",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "endTiming",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBiddersAddress",
          "outputs": [
            {
              "internalType": "address payable[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "highestBid",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "productDetails",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "productImage",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "productName",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "productVideo",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startingBid",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startTiming",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "winner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      contract = new web3.eth.Contract(abi, address);
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
      const res = await contract.methods.winner().call(); 
      setWinner(res)
      if( res.toLowerCase() === accounts[0].toLowerCase() && state === "1"){
        setDelivered(true)
      }
      bidderAddress.map( (address) => {
        contract.methods.bidders(address).call()
        .then( res => setBids( prev => [...prev, res.bid]))
      })
    }
    fetchContract(id);
  }, []);

  async function placeBid(bidderAdd, amount) {
    try {
      const res = await contract.methods.placeBid().send({ from: bidderAdd, value: amount, gas: 3000000 });
      const bid = await contract.methods.bidders(bidderAdd).call();
      setUserBid(bid.bid)
      console.log(res)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function startAuction(startingBid, duration) {
    try {
      const res = await contract.methods.startAuction(startingBid, duration).send({ from: accounts[0], gas: 3000000 })
      window.alert(res)
    } catch (err) {
      const x = err.message;
      window.alert(x.slice(65, x.length))
    }
  }

  async function joinAuction() {
    try { 
      const res = await contract.methods.joinAuction().send({ from: accounts[0], gas: 3000000 })
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
    await contract.methods.isAssestDelivered().send({ from: accounts[0], gas: 3000000 })
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
            <div className="auction-functionalities">
              <div>
                {
                  state === '2' ? (
                    <div>
                      <form onSubmit={handleSubmit}>
                        <input type="number" name="" id="" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} />
                        <input type="number" name="" id="" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <button onClick={(e) => startAuction(startingBid, duration)}>Start Auction</button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <h2>Auction State is : {state}</h2>
                    </div>
                  )
                }
              </div>
              <div>
                <h3>All Bidders</h3>
                <h2>{bidderAddress.length}</h2>
                <div className="bidder-card">
                  {
                    bidderAddress.map((address, index) => {
                      return (
                        <div key={index}> 
                          <span>{address} : {bids[index]}</span> 
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
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
              <Box>
              {
                endTiming !== "0" ? (
                  <Subtitle>Ends on : { (new Date(endTiming*1000)).toLocaleString()}</Subtitle>
                ): (
                  <h2>Auction has not start yet. </h2>
                )
              }
              {
                !isJoin && <Button onClick={ (e) => joinAuction()}>Join</Button>
              }
              </Box>
              <Box>
              <h3>Your Bid : {userBid} ETH</h3>
              <Form className="bid-Form" onSubmit={handleSubmit}>
                <Input type="number" name="" id="" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
                <Button type="submit" onClick={(e) => placeBid(accounts[0], bidAmount)}>Place Bid</Button>
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