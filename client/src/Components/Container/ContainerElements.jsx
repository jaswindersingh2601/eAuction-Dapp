import styled from 'styled-components';

export const CardContainer = styled.div`
    min-height: 400px;
    margin: 0px;
    padding: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: linear-gradient(241deg, rgba(255,194,153,1) 19%, rgba(230,230,230,1) 71%);  
    border-radius: 5px;
` 
export const Image = styled.img`
    margin: 0.5rem 0.5rem;
    width: 18rem;
    height: 17rem;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`
export const SubTitle = styled.h1`
    color: #404040;
    line-height: 400px;
    font-size: 3rem;
`