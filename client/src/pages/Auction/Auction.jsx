import { useState, useEffect } from "react";
import Web3 from "web3";
import { AllAuction, Button, ButtonContainer, SubTitle, Box } from "./AuctionElements";
import AuctionContainer from "../../Components/AuctionContainer/AuctionContainer";
import { factoryAddress, abi, instAbi } from "../../ABI";
 
var web3;
var accounts; 
var contract;

export default function Auction() {
  var [auctionArray, setAuctionArray] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [waiting, setWaiting] = useState([]);
  var [images, setImages] = useState([]);
  const [active, setActive] = useState();

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
      contract = new web3.eth.Contract(abi, factoryAddress);
      const arr = await contract.methods.getAuctionDetails().call();
      setAuctionArray(arr);

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
              {active === "0" && <AuctionContainer web3={web3} arr={ongoing} />}
              {active === "2" && <AuctionContainer web3={web3} arr={waiting} />}
            </>
          ) : (
            <Box>
              <SubTitle>
                Not Present
              </SubTitle>
            </Box>
          )
        }
      </AllAuction>
    </>
  );

}
