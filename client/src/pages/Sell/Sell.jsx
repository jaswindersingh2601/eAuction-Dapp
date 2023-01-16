 import { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Web3 from "web3";
import { abi, factoryAddress } from "../../ABI";

import {
  Container,
  FormContainer,
  Form,
  Label,
  Input,
  Textarea,
  Button,
  Title
} from "./SellElements";

export default function Sell() {
  const [productName, setName] = useState("");
  const [productDetails, setDetails] = useState("");
  const [productImage, setImage] = useState("");
  const [productVideo, setVideo] = useState("");
  const [createdAuctions, setCreatedAuctions] = useState([]);

  var web3;
  var accounts;
  var contract;

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
    connect3();
  }, []);

  async function createContractInstance(name, details, image, video) {
    try {
      if(name !== "" && details !== "" && image != ""){
        await connect3();
        contract = new web3.eth.Contract(abi, factoryAddress);
        const inst = await contract.methods
                    .createAuction(name, details, image, video)
                    .send({ from: accounts[0], gas: 3000000 });
        console.log(inst);
        window.alert("Auction created Successfully")
        setName("")
        setImage("")
        setDetails("")
      }else{
        throw new Error("All fields are required")
      }
    } catch (err) {
      window.alert(err.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    createContractInstance(
      productName,
      productDetails,
      productImage,
      productVideo
    );
  };

  return (
    <>
          <Container>
          <FormContainer onSubmit={handleSubmit}>
            <Title>Create Auction Form</Title>
            <Form>
              <Input
                type="text"
                value={productName}
                placeholder="Product Title"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Textarea
                placeholder="Product Description"
                rows="4"
                cols="74"
                value={productDetails}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Product Image"
                value={productImage}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <Button type="submit" value="Create" onClick={handleSubmit}>
                Create
              </Button>
            </Form>
          </FormContainer>
          </Container>
    </>
  );
}
