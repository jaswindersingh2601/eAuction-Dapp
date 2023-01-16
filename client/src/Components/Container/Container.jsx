import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardContainer, Image, SubTitle, } from "./ContainerElements";
import { instAbi } from '../../ABI';

function Container(props) {
  const [auctions, setAuctions] = useState([]);
  const [images, setImages] = useState(""); 
  const { data, state, web_3, msg } = props;

  useEffect(() => {
    data.map((address, index) => {
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