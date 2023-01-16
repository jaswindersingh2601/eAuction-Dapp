import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { ContainerBox, AllAuction, ButtonContainer, Button, Title, SubTitle, Box } from './YourAuctionElements';
import Container from '../../Components/Container/Container';
import { factoryAddress, abi, instAbi } from '../../ABI';

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

      //add
      contract = new web3.eth.Contract(abi, factoryAddress);
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
    <ContainerBox> 
      <Title>Created</Title>
      {yourAuctions.length > 0 ? (
        <AllAuction>
          <ButtonContainer>
            <Button onClick={() => setActive('ongoing')}>Ongoing</Button>
            <Button onClick={() => setActive('waiting')}>Waiting</Button>
            <Button onClick={() => setActive('ended')}>Ended</Button>
          </ButtonContainer>
          {active === 'ongoing' && <Container data={yourAuctions} state="0" web_3={web3} msg="created"/>}
          {active === 'waiting' && <Container data={yourAuctions} state="2" web_3={web3} msg="created"/>}
          {active === 'ended' && <Container data={yourAuctions} state="1" web_3={web3} msg="created"/>}
        </AllAuction>
      ) : (
        <AllAuction>
          <Box>
          <SubTitle>You have not created any auction</SubTitle>
          </Box> 
        </AllAuction> 
      )}
      <Title>Participated</Title>
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
          <AllAuction>
            <Box>
            <SubTitle>You have not participated in any auction yet</SubTitle>
            </Box>
          </AllAuction>
        )
      }
    </ContainerBox>
  )
}

export default YourAuctions; 