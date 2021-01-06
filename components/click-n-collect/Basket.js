import styled from 'styled-components';

export const BasketButton = styled.button`
  background-color: #012f6a;
  border: none;
  bottom: 0;
  color: white;
  font-weight: 600;
  padding: 20px;
  position: sticky;
  width: 100vw;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

export const Basket = styled.div`
  background-color: white;
  bottom: 58px;
  padding: 20px;
  position: fixed;
  transform: ${props => props.isBasketDisplayed ? 'scaleY(1)' : 'scaleY(0)'};
  transform-origin: bottom center;
  transition: transform 0.3s ease-in-out;
  width: 100vw;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;
