import '../css/Sell.css';
import { useEffect, useState } from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import Web3 from 'web3'; 


export default function Sell(){
  const [productName, setName] = useState("Product Name");
  const [productDetails, setDetails] = useState("Product Details");
  const [productImage, setImage] = useState("Product Image");
  const [productVideo, setVideo] = useState("Product Video");
  const [createdAuctions, setCreatedAuctions] = useState([]);
 
  var web3;
  var accounts;
  var contract;

  async function connect3() {
    var currentProvider = new window.Web3.providers.HttpProvider('http://localhost:4000')
    web3 = new window.Web3(currentProvider)
    
    if (typeof web3 === 'undefined')
        alert("Install meta Mask to use")
    else {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (Array(accounts).length > 0) {
            console.log(`connected to metamask with ${accounts[0]}`)
        } else
            alert("Account not connected")
    }
  }
  useEffect( () => {
    connect3()
  }, [])

  async function createContractInstance(name, details, image, video){
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
    contract = new web3.eth.Contract(abi, address)
    const inst = await contract.methods.createAuction(name, details, image, video).send({ from: accounts[0], gas: 3000000});
    console.log(inst);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    createContractInstance(productName, productDetails, productImage, productVideo);
  }

  return(
        <>
          {createdAuctions.length > 0 ? (
              <div className="container">
                <div className="form-container" onSubmit={handleSubmit}>
                  <form>
                    <div>
                      <input type="text" value={productName} onChange={ (e) => {setName(e.target.value)}}/>
                    </div>
                    <div>
                      <textarea placeholder="Product Description" rows="4" cols="74" value={productDetails} onChange={ (e) => {setDetails(e.target.value)}}>
                      </textarea>
                    </div>
                    <div>
                      <input type="text" name="" id="" value={productImage} onChange={ (e) => {setImage(e.target.value)}}/>
                    </div>
                    <div>
                      <input type="submit" value="Create" />
                    </div>
                  </form>
                </div>
                <div className="Auction-container">
                  <h2>Your Auctions</h2>
                  {
                    
                  }
                </div>
              </div>
            ): (
              <div className="container">
                <div className="form-container" onSubmit={handleSubmit}>
                  <form>
                    <div>
                      <input type="text" value={productName} onChange={ (e) => {setName(e.target.value)}}/>
                    </div>
                    <div>
                      <textarea placeholder="Product Description" rows="4" cols="74" value={productDetails} onChange={ (e) => {setDetails(e.target.value)}}>
                      </textarea>
                    </div>
                    <div>
                      <input type="text" name="" id="" value={productImage} onChange={ (e) => {setImage(e.target.value)}}/>
                    </div>
                    <div>
                      <input type="submit" value="Create" />
                    </div>
                  </form>
                </div>
              </div>
            )}
        </>
  )
}