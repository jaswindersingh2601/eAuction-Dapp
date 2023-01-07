import styled from 'styled-components'

export const Container = styled.div`
    width: 80%;
    height: auto;
    margin: 1rem auto;
`
export const ProductContainer = styled.div`
    width: 100%; 
    height: auto;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`
export const Image = styled.img`
    width: 25rem;
    height: 20rem;
`
export const DetailsContainer = styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
`
export const Title = styled.h1`
    margin: 0.5rem 0;
`
export const Description = styled.p`
    margin: 0.5rem 0;
`
export const FuncContainer = styled.div`
    width: 100%; 
    height: auto;
    margin: 1rem 0;
    // border: 2px solid red;
`
export const Form = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const Button = styled.button`
    width: 10rem;
    height: 2.7rem;
    background: #b3521b;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
`
export const Subtitle = styled.h4`

`
export const Input = styled.input`
    padding: 0;
    margin-right: 0.5rem;
    width: 20rem;
    height: 2.7rem;
    border: 1px solid #f58433;
    border-radius: 5px;
    text-align: center;
`
export const Box = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
`
export const BidderContainer = styled.div`
    width: 78%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
export const BidderCard = styled.div`
    margin: 0.5rem;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    width: 28rem;
    height: 4rem;
    text-align: center;
    line-height: 55px;
`
