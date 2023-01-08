import styled from 'styled-components'; 

export const Button = styled.button`
    margin-right: 0.5rem;
    width: 10rem;
    max-width: 180px;
    height: 90%;
    background: #b3521b;
    border: none;   
    border-radius: 3px; 
    color: white;
    font-size: 1rem;
    &:focus{
        background: linear-gradient(241deg, rgba(255,194,153,1) 19%, rgba(230,230,230,1) 71%);
        color: #404040;
        font-weight: bold;
    } 
     
`
export const ButtonContainer = styled.div`
    width: 42%;
    max-width: 650px;
    height : 3.5rem;    
`

export const AllAuction = styled.section`
    width: 80%;
    height: 500px;
    margin: 1rem auto;
`
export const Box = styled.div`
    min-height: 400px;
    margin: 0px;
    padding: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: linear-gradient(241deg, rgba(255,194,153,1) 19%, rgba(230,230,230,1) 71%);  
    border-radius: 5px;
`
export const SubTitle = styled.h1`
    color: #404040;
    font-size: 2rem;
`
