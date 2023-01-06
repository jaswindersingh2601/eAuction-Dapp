import { useState, useEffect } from "react";
import Web3 from "web3";
import { Link as RouterLink } from "react-router-dom";
import { AllAuction, Button, ButtonContainer } from "./AuctionElements";
import AuctionContainer from "../../Components/AuctionContainer/AuctionContainer";
import "../../css/Auction.css";

var web3;
var accounts;
var contract;
var imagesArray = [];

export default function Auction() {
  var [auctionArray, setAuctionArray] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [waiting, setWaiting] = useState([]);
  var [images, setImages] = useState([]);
  const [active, setActive] = useState("");

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
  useEffect(() => {
    async function factoryContractCall() {
      await connect3();
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
      setAuctionArray(arr);

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
      arr.map((instAdd) => {
        const cont = new web3.eth.Contract(instAbi, instAdd);
        cont.methods.productImage().call().then(res => setImages((prev) => [...prev, res]))
      })

      arr.map((instAdd) => {
        const cont = new web3.eth.Contract(instAbi, instAdd);
        cont.methods.auctionState().call().then(res => {
          if (res === "0") {
            setOngoing(prev => [...prev, instAdd])
          }
          if (res === "2") {
            setWaiting(prev => [...prev, instAdd])
          }
        })
      })
    }
    factoryContractCall();
  }, []);

  function handleJoinAuction(e, inst) {
    inst.methods.joinAuction().send({ from: accounts[0], gas: 3000000 })
      .then(res => window.alert(res))
      .catch(err => window.alert(err))
  }

  return (
    <>
      <AllAuction>
        {
          auctionArray.length > 0 ? (
            <>
              <ButtonContainer>
                <Button onClick={() => setActive("0")}>Ongoing</Button>
                <Button onClick={() => setActive("2")}>Upcoming</Button>
              </ButtonContainer>
              {active === "0" && <AuctionContainer state="0" web3={web3} arr={ongoing} />}
              {active === "2" && <AuctionContainer state="2" web3={web3} arr={waiting} />}
            </>
          ) : (
            <h2>not created.</h2>
          )
        }
      </AllAuction>
    </>
  );

}
