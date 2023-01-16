import { useEffect, useState } from "react"; 
import { React } from "react";
import { CardContainer, Image, SubTitle } from "./AuctionContElements";
import { Link } from 'react-router-dom';
import { instAbi } from "../../ABI"; 

export default function AuctionContainer(props) {
  const [auction, setAuction] = useState([]);
  const [images, setImages] = useState([]); 
  const { web3, arr } = props;

  useEffect(() => {
    arr.map((address, index) => {
      const contract = new web3.eth.Contract(instAbi, address);
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
        <CardContainer>
          <SubTitle>Not Present</SubTitle>
        </CardContainer>
      )}
    </>
  );
}
