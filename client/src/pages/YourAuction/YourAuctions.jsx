import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { container, AllAuction, ButtonContainer, Button } from './YourAuctionElements';
import Container from '../../Components/Container/Container';

var web3;
var accounts;
var contract;

const YourAuctions = () => {
  var [yourAuctions, setYourAuctions] = useState([]);
  const [participated, SetParticipated] = useState([])
  const [active, setActive] = useState('');
  const [active1, setActive1] = useState('');

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
      contract = new web3.eth.Contract(abi, address);
      const arr = await contract.methods.getAuctionDetails().call();
      arr.map((address, index) => {
        const contractInst = new web3.eth.Contract(instAbi, address);
        contractInst.methods.auctioneer().call()
          .then(res => {
            if (res.toLowerCase() === accounts[0].toLowerCase()) {
              setYourAuctions(prev => [...prev, address])
            }
          })
          .catch(err => window.alert(err))
      })

      arr.map((address, index) => {
        const contractInst = new web3.eth.Contract(instAbi, address);
        contractInst.methods.bidders(accounts[0]).call()
          .then(res => {
            if (res.isJoin) {
              SetParticipated(prev => [...prev, address])
            }
          })
      })
    }
    connect3();
  }, [])

  return (
    <> 
      {yourAuctions.length > 0 ? (
        <AllAuction>
          <ButtonContainer>
            <Button onClick={() => setActive('ongoing')}>Ongoing Aucitons</Button>
            <Button onClick={() => setActive('waiting')}>Waiting Auctions</Button>
            <Button onClick={() => setActive('ended')}>Ended Auctions</Button>
          </ButtonContainer>
          {active === 'ongoing' && <Container data={yourAuctions} state="0" web_3={web3} msg="created"/>}
          {active === 'waiting' && <Container data={yourAuctions} state="2" web_3={web3} msg="created"/>}
          {active === 'ended' && <Container data={yourAuctions} state="1" web_3={web3} msg="created"/>}
        </AllAuction>
      ) : (
        <AllAuction>
          <h2>You have not created any Auction</h2>
        </AllAuction> 
      )} 
      {
        participated.length > 0 ? (
          <AllAuction>
            <ButtonContainer>
              <Button onClick={() => setActive1('ongoing')}>Ongoing</Button>
              <Button onClick={() => setActive1('ended')}>Ended</Button>
            </ButtonContainer>
            { active1 === 'ongoing' && <Container data={participated} state="0" web_3={web3} msg="participated"/>}
            { active1 === 'ended' && <Container data={participated} state="1" web_3={web3} msg="participated"/>}
          </AllAuction>
        ) : (
          <h2>Not participated in any auction yet.</h2>
        )
      }
    </>
  )
}

export default YourAuctions; 