import styled from 'styled-components';

const Container = styled.section`
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.7), hsla(0deg, 0%, 0%, 0.7));
  display: ${props => props.displaySection ? 'flex' : 'none'};
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 50;
`;

const InfoSection = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin: auto;
  transform: ${props => (props.displaySection ? 'scale(1)' : 'scale(0)')};
  width: 100vw;
  & > div:first-of-type {
    margin: 0 auto 20px auto;
    max-width: 300px;
    & > h3 {
      margin-top: 0;
      margin-bottom: 5px;
    }
    & > p {
      padding: 0 0;
    }
  }
  & > form {
    & > input {
      border: 2px solid #e3e9ef;
      border-radius: 5px;
      color: #012f6a;
      display: block;
      margin: 10px auto;
      padding: 10px;
      transition: border 0.2s ease-in-out;
      width: 300px;
      &::placeholder {
        color: #012f6a;
      }
      &:focus {
        border: 2px solid #012f6a;
      }
    }
    & > div {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 300px;
      & > label {
        color: #012f6a;
      }
      & > input {
        border: 2px solid #e3e9ef;
        border-radius: 5px;
        color: #012f6a;
        margin: 10px auto;
        padding: 7px;
        transition: border 0.2s ease-in-out;
        &::placeholder {
          color: #012f6a;
        }
        &:focus {
          border: 2px solid #012f6a;
        }
      }
      & > input:last-of-type {
          margin-right: 0;
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
    & > p {
      color: green;
      & > a {
        border-bottom: 1px solid green;
        color: green;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    border-radius: 5px;
    max-height: 600px;
    max-width: 600px;
    position: fixed;
    top: calc((100vh - 600px) / 2);
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
  @media only screen and (min-width: 1200px) {
    transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        background-color: white;
        border: 2px solid #012f6a;
      }
    }
  }
`;

const ErrorParag = styled.p`
  color: red;
  font-weight: 600;
`;

const OrderInfo = props => {

  const articleNumber = props.basketItems.reduce((r, b) => {
    return r + b.quantity
  }, 0);

  const totalPrice = props.basketItems.reduce((r, b) => {
    return r + b.price*b.quantity
  }, 0).toFixed(2);

  const year = props.todayDate.getFullYear();
  const month = (props.todayDate.getMonth() + 1).toString().padStart(2, '0');
  const day = props.todayDate.getDate().toString().padStart(2, '0');

  return (
    <Container displaySection={props.displaySection} onClick={props.backToBasket}>
      <InfoSection displaySection={props.displaySection} onClick={e => e.stopPropagation()}>
        {!props.orderConfirmation && <BackButton onClick={props.backToBasket}>Revenir au panier</BackButton>}
        <div>
          <h3>Total : {articleNumber} {articleNumber === 1 ? 'article' : 'articles'} / {totalPrice}€</h3>
          <p>à régler sur place (CB, liquide ou tickets restaurant)</p>
        </div>
        <form onSubmit={props.handleOrderSubmit}>
          {!props.orderConfirmation &&
            <>
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
              <div>
                <label htmlFor="date">Le : </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  min={`${year}-${month}-${day}`}
                  defaultValue={`${year}-${month}-${day}`}
                  required
                  onChange={props.handleInputValues}
                />
                <label htmlFor="time"> à : </label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  min="11:00:00"
                  max="21:30:00"
                  defaultValue={props.time}
                  required
                  onChange={props.handleInputValues}
                />
              </div>
              <button type="submit">Confirmer la commande</button>
              {props.errorInOrder !== '' && <div><ErrorParag>{props.errorInOrder}</ErrorParag></div>}
            </>
          }
          {props.orderConfirmation &&
            <>
              <p>Merci pour votre commande ! Nous l'avons bien enregistrée sous la référence <strong>{props.orderConfirmation}</strong> et vous attendons avec impatience dans notre restaurant !</p>
              <button onClick={props.backToHomePage}>Retour</button>
            </>
          }
        </form>
      </InfoSection>
    </Container>
  );
};

export default OrderInfo;
