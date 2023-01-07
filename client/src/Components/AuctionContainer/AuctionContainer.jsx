import { useEffect, useState } from "react"; 
import { React } from "react";
import { CardContainer, Image } from "./AuctionContElements";
import { Link } from 'react-router-dom';

export default function AuctionContainer(props) {
  const [auction, setAuction] = useState([]);
  const [images, setImages] = useState([]);
  const { web3, arr } = props;

  useEffect(() => {
    arr.map((address, index) => {
      const abi = [
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
          inputs: [],
          name: "getBiddersAddress",
          outputs: [
            {
              internalType: "address payable[]",
              name: "",
              type: "address[]",
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
      ];
      const contract = new web3.eth.Contract(abi, address);
      console.log("called1");
      contract.methods
        .productImage()
        .call()
        .then((res) => {
          setImages((prev) => [...prev, res]);
        })
        .catch((err) => window.alert(err));
    });
  }, []);

  return (
    <>
      {images.length > 0 ? (
        <CardContainer>
          {images.map((src, index) => {
            return <Link to={`/auction/${arr[index]}`}><Image src={src}></Image></Link>;
          })}
        </CardContainer>
      ) : (
        <h2>Not Present</h2>
      )}
    </>
  );
}
