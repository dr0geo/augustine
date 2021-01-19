import styled from 'styled-components';
import { Bin } from '@styled-icons/icomoon';
import { v1 as uuid } from 'uuid';

export const BasketButton = styled.button`
  background-color: #012f6a;
  border: none;
  bottom: 0;
  color: white;
  font-weight: 600;
  padding: 20px;
  position: fixed;
  width: 100vw;
  z-index: 40;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

export const BasketButtonOffset = styled.div`
  height: 59px;
  width: 100%;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const OrderButton = styled.button`
  background-color:#ac6c14;
  border: 1px solid #ac6c14;
  border-radius: 5px;
  color: white;
  display: block;
  font-weight: 600;
  margin: 20px auto;
  padding: 10px 0;
  position: static;
  width: 70%;
  @media only screen and (min-width: 1200px) {
    background-color: #012f6a;
    border: 1px solid #012f6a;
    display: block;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        background-color: white;
        color: #012f6a;
      }
    }
  }
`;

export const BasketContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 0;
  min-height: 100vh;
  padding: 20px 20px 58px 20px;
  position: ${props => props.isBasketDisplayed ? 'absolute' : 'fixed'};
  top: 0;
  transform: ${props => props.isBasketDisplayed ? 'scaleY(1)' : 'scaleY(0)'};
  transform-origin: bottom center;
  transition: transform 0.3s ease-in-out;
  width: 100vw;
  & > li {
    padding: 30px 0;
    & > div {
      display: flex;
      justify-content: space-around;
      margin: 20px auto 10px auto;
      & > button {
        background-color: #e3e9ef;
        border: 1px solid #e3e9ef;
        border-radius: 5px;
        font-size: 1.4rem;
        font-weight: 600;
        padding: 15px 30px;
      }
      & > svg {
        transform: scale(1.8);
        transform-origin: top center;
        @media only screen and (min-width: 1200px) {
          transform-origin: center;
        }
      }
    }
  }
  & > li + li {
    border-top: 1px solid lightgray;
  }
  @media only screen and (min-width: 1200px) {
    box-shadow: -10px 3px 5px 0px #dedede;
    display: block;
    position: ${props => props.isMobileBasket ? 'fixed' : 'static'};
    transform: ${props => props.isMobileBasket ? 'scaleY(0)' : 'scaleY(1)'};
    width: 100%;
    & > li > div {
      align-items: center;
      & > button {
        height: 30px;
        padding: 0 10px;
      }
      & > svg {
        transform: scale(1);
      }
    }
    @media (any-hover: hover) {
      & button:hover, svg:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
`;

const Total = styled.div`
  border-top: 3px solid lightgray;
  padding: 20px 20px 0 20px;
`;

const Basket = props => {
  return (
    <BasketContainer isBasketDisplayed={props.isBasketDisplayed} isMobileBasket={props.isMobileBasket}>
      <h2><em>Mon panier</em></h2>
      {props.basketItems.length === 0 && <p>Vous n'avez pas encore d'article dans votre panier.</p>}
      {props.basketItems.length !== 0 && props.basketItems.map(item => {
        return (
          <li key={uuid()}>
            <p>{item.quantity} x {item.name}</p>
            <p>{(item.price*item.quantity).toFixed(2)}€</p>
            <div>
              <button onClick={() => props.decreaseQuantity(item)}>-</button>
              <button onClick={() => props.increaseQuantity(item)}>+</button>
              <Bin color="#012f6a" size={30} onClick={() => props.deleteItem(item)} />
            </div>
          </li>
        );
      })}
      {props.basketItems.length > 0 && 
        <>
          <Total>
            <p><strong>Montant total : {props.basketItems.length > 1 
              ? (props.basketItems.reduce((r, b) => {
                return r + b.price*b.quantity
              }, 0)).toFixed(2)
              : (props.basketItems[0].price*props.basketItems[0].quantity).toFixed(2)}€</strong></p>
            <p>à régler sur place (CB, liquide ou tickets restaurant)</p>
          </Total>
          <OrderButton onClick={props.handleOrder}>Passer la commande</OrderButton>
        </>
      }
    </BasketContainer>
  );
};

export default Basket;
