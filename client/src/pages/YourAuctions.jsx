import React from 'react'
import { useState, useEffect } from 'react';
import {Routes, Route, useLocation, Link} from "react-router-dom"; 
import Container from '../Components/Container';

var web3; 
var accounts;
var contract;

const YourAuctions = () => {
    var [yourAuctions, setYourAuctions] = useState([]);
    var [active, setActive] = useState('waiting');

    useEffect( () => {
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

            const address = "0x71BB72BBDA11aA085B4Da0dE8399F7CFE27dd664";
            const abi = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "auctions",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "productName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productDetails",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "productVideo",
              "type": "string"
            }
          ],
          "name": "createAuction",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [],
          "name": "getAuctionDetails",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
                        ];
            contract = new web3.eth.Contract(abi, address);
            const arr = await contract.methods.getAuctionDetails().call();
            arr.map( (address, index) => {
              const instAbi = [
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
                  "inputs": [],
                  "name": "endAuction",
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
                }
              ]
              const contractInst = new web3.eth.Contract(instAbi, address);
              contractInst.methods.auctioneer().call()
                .then( res => {
                  if(res.toLowerCase() === accounts[0].toLowerCase()){
                    setYourAuctions( prev => [...prev, address])
                  }
                })
                .catch( err => window.alert(err))
            })
          }
          connect3(); 
    }, [])
  return ( 
    <>
        { yourAuctions.length > 0 ? (
            <div>
                <div className="button-container">
                  <button onClick={() => setActive('ongoing')}>Ongoing Aucitons</button>
                  <button onClick={() => setActive('waiting')}>Waiting Auctions</button>
                  <button onClick={() => setActive('ended')}>Ended Auctions</button>
                </div>
                <div>
                  { active === 'ongoing' && <Container data={yourAuctions} state="0" web_3={web3}/>}
                  { active === 'waiting' && <Container data={yourAuctions} state="2" web_3={web3}/>}
                  { active === 'ended' && <Container data={yourAuctions} state="1" web_3={web3}/>}
                </div>
            </div>
        ) : (
            <div>
                <h2>You haven't created any auction :(</h2>
            </div>
        )}
    </>
  )
}

export default YourAuctions;