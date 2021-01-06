import styled from 'styled-components';
import { Bin } from '@styled-icons/icomoon';

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

export const BasketContainer = styled.div`
  background-color: white;
  bottom: 58px;
  padding: 20px;
  position: fixed;
  transform: ${props => (props.isBasketDisplayed ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: bottom center;
  transition: transform 0.3s ease-in-out;
  width: 100vw;
  & > li {
    margin: 40px auto;
    & > div {
      display: flex;
      justify-content: space-around;
      margin: 20px auto;
      & > button {
        background-color: white;
        border: 1px solid #e3e9ef;
        border-radius: 5px;
        font-size: 1.4rem;
        font-weight: 600;
        padding: 15px 30px;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const Basket = props => {
  return (
    <BasketContainer isBasketDisplayed={props.isBasketDisplayed}>
      <h2><em>Mon panier</em></h2>
      {props.basketItems.length === 0 && <p>Vous n'avez pas encore d'article dans votre panier.</p>}
      {props.basketItems.length !== 0 && props.basketItems.map(item => {
        return (
          <li key={item.id}>
            <p>{item.quantity} x {item.name}</p>
            <p>{(item.price*item.quantity).toFixed(2)}€</p>
            <div>
              <button onClick={() => props.decreaseQuantity(item)}>-</button>
              <button onClick={() => props.increaseQuantity(item)}>+</button>
              <Bin color="#012f6a" size={50} onClick={() => props.deleteItem(item)} />
            </div>
          </li>
        );
      })}
    </BasketContainer>
  );
};

export default Basket;
