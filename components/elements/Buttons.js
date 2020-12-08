import styled from 'styled-components';

export const BlackButton = styled.a`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  display: block;
  font-weight: 600;
  padding: 10px 20px;
  margin: 30px auto;
  max-width: 200px;
  text-align: center;
  transition: 
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  @media only screen and (min-width: 1200px) {
    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`;

export const WhiteButton = styled(BlackButton)`
  background-color: transparent;
  border-color: white;
  color: white;
  @media only screen and (min-width: 1200px) {
    &:hover {
      background-color: white;
      color: #012f6a;
    }
  }
`;