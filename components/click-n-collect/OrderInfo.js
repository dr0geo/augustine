import styled from 'styled-components';

const InfoSection = styled.section`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  position: absolute;
  top: 0;
  transform: ${props => (props.displaySection ? 'scale(1)' : 'scale(0)')};
  width: 100vw;
  z-index: 100;
  & > form {
    & > input {
      border: 2px solid #e3e9ef;
      border-radius: 5px;
      color: #012f6a;
      display: block;
      margin: 10px auto;
      padding: 10px;
      transition: border 0.2s ease-in-out;
      width: 260px;
      &::placeholder {
        color: #012f6a;
      }
      &:focus {
        border: 2px solid #012f6a;
      }
    }
    & > button {
      background-color: #012f6a;
      border: 2px solid #012f6a;
      border-radius: 5px;
      color: white;
      display: block;
      font-weight: 600;
      margin: 20px auto;
      padding: 10px 0;
      width: 90%;
      @media only screen and (min-width: 1200px) {
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
    }
  }
`;

const BackButton = styled.button`
  background-color: #e3e9ef;
  border: 2px solid #e3e9ef;
  border-radius: 5px;
  color: #012f6a;
  display: block;
  margin: 20px auto;
  max-width: 260px;
  padding: 10px 0;
  width: 90%;
`;

const OrderInfo = props => {

  const articleNumber = props.basketItems.reduce((r, b) => {
    return r + b.quantity
  }, 0);

  const totalPrice = props.basketItems.reduce((r, b) => {
    return r + b.price*b.quantity
  }, 0).toFixed(2);

  return (
    <InfoSection displaySection={props.displaySection}>
      <BackButton onClick={props.backToBasket}>Revenir au panier</BackButton>
      <h3>Total : {articleNumber} {articleNumber === 1 ? 'article' : 'articles'} / {totalPrice}€</h3>
      <form onSubmit={props.handleOrderSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom *"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom *"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail *"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Téléphone *"
          minLength={10}
          maxLength={13}
          required
          onChange={props.handleInputValues}
        />
        <input
          type="date"
          name="date"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="time"
          name="time"
          min="19:00:00"
          max="21:30:00"
          required
          onChange={props.handleInputValues}
        />
        <button type="submit">Confirmer la commande</button>
      </form>
    </InfoSection>
  );
};

export default OrderInfo;
