import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    height: 500px;
    margin: 1rem auto;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: grey;
    width: 50%;
    height: auto;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const Form = styled.form`
    margin: 2rem 0 0 0;
    width: 97%;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
     margin: 5px;
`;

export const Input = styled.input`
    height: 2.5rem;
    margin: 5px;
    padding: 5px;
    // border: 1px solid orange;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9rem;
    color: grey;
`;

export const Textarea = styled.textarea`
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-size: 0.99rem;
    color: grey;
`;

export const Button = styled.button`
    height: 2.5rem;
    margin: 5px;
    text-align: center;
    font-size: 1.3rem;
    border: #737373 1px solid;
    border-radius: 6px;
    background: #ff8533;
    color: #fff0e6;
`;

export const Title = styled.h1`
    color: #e6e6e6;
`
