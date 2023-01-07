import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContainer, Image, SubTitle } from "./ContainerElements";

function Container(props) {
  const [auctions, setAuctions] = useState([]);
  const [images, setImages] = useState("");
  const { data, state, web_3, msg } = props;

  useEffect(() => {
    data.map((address, index) => {
      const instAbi = [
        {
          inputs: [
            {
              internalType: "address",
              name: "_auctioneer",
              type: "address",
            },
            {
              internalType: "string",
              name: "_productName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_productDetails",
              type: "string",
            },
            {
              internalType: "string",
              name: "_productImage",
              type: "string",
            },
            {
              internalType: "string",
              name: "_productVideo",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "auctionState",
          outputs: [
            {
              internalType: "enum Auction.state",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "auctioneer",
          outputs: [
            {
              internalType: "address payable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "bidderAddress",
          outputs: [
            {
              internalType: "address payable",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "bidders",
          outputs: [
            {
              internalType: "uint256",
              name: "bid",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isJoin",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "firstBid",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "endTiming",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "highestBid",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "productDetails",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "productImage",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "productName",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "productVideo",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startTiming",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startingBid",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "winner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "firstBid",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "duration",
              type: "uint256",
            },
          ],
          name: "startAuction",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "endAuction",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "joinAuction",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "placeBid",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getEther",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "isAssestDelivered",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ]
      const contractInst = new web_3.eth.Contract(instAbi, address);
      contractInst.methods.auctionState().call()
        .then(res => {
          if (res === state) {
            setAuctions(prev => [...prev, address])
            return address;
          } else {
            return 0;
          }
        })
        .then(res => {
          if (res !== 0) {
            const instAbi = [
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "_auctioneer",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "_productName",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "_productDetails",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "_productImage",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "_productVideo",
                    type: "string",
                  },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
              },
              {
                inputs: [],
                name: "auctionState",
                outputs: [
                  {
                    internalType: "enum Auction.state",
                    name: "",
                    type: "uint8",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "auctioneer",
                outputs: [
                  {
                    internalType: "address payable",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                name: "bidderAddress",
                outputs: [
                  {
                    internalType: "address payable",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                name: "bidders",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "bid",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "isJoin",
                    type: "bool",
                  },
                  {
                    internalType: "bool",
                    name: "firstBid",
                    type: "bool",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "endTiming",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "highestBid",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "productDetails",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "productImage",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "productName",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "productVideo",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "startTiming",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "startingBid",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "winner",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "uint256",
                    name: "firstBid",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "duration",
                    type: "uint256",
                  },
                ],
                name: "startAuction",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "endAuction",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "joinAuction",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "placeBid",
                outputs: [],
                stateMutability: "payable",
                type: "function",
              },
              {
                inputs: [],
                name: "getBalance",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "balance",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "getEther",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "isAssestDelivered",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
            ]
            const contractInst = new web_3.eth.Contract(instAbi, address);
            contractInst.methods.productImage().call()
              .then(res => {
                setImages((prev) => [...prev, res])
              })
          }
        })
    })
  }, [])

  return (
    <>
      {
        auctions.length > 0 ? (
          <CardContainer>
            {
              auctions.map((address, index) => {

                return (
                  <Link className="router-link" to={`/yourAuctions/${address}`} key={index}>
                    <Image className="auction-images"
                      src={images[index]}
                      alt={images[index]}
                    />
                  </Link>
                )
              })
            }

          </CardContainer>
        ) : (
          <CardContainer>
            <SubTitle>Not {msg}</SubTitle>
          </CardContainer>
        )
      }
    </>
  )
}

export default Container;