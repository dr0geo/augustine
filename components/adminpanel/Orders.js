import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { mutate } from 'swr';
import { useState } from 'react';

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
`;

const ListItem = styled.li`
  background-color: #e3e9ef;
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  width: 90%;
  & > p {
    line-height: 1.5rem;
    padding: 0;
    text-align: left;
  }
  & > button {
    display: block;
    margin: auto;
    padding: 5px 10px;
  }
`;

const ErrorCont = styled.div`
  align-items: center;
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.8), hsla(0deg, 0%, 0%, 0.8));display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
`;

const ErrorDiv = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 5px;
  color: red;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  height: 250px;
  justify-content: space-around;
  position: relative;
  text-align: center;
  width: 250px;
  z-index: 11;
`;

const Orders = props => {
    // Filter orders according to inputs values:
    let filteredData = props.data;

    //if (props.date !== '') {
      //filteredData = filteredData.filter(order => new Date(Date.parse(order.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    //}
    //if (props.orderId !== '') {
      //filteredData = filteredData.filter(order => order.id.toLowerCase().includes(props.orderId.toLowerCase().trim()));
    //}

    const [errorMessage, setErrorMessage] = useState('');
    
    const handleFile = async (id) => {
      const orderRef = props.data.find(order => order.id === id);

      fetch('/api/commandes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRef)
      })
        .then(res => {
          if (res.status === 200) {
            mutate('/api/commandes');
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
        });
    }

    const handleDelete = async (id) => {
      const orderRef = props.data.find(order => order.id === id);

      fetch('/api/commandes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRef)
      })
        .then(res => {
          if (res.status === 200) {
            mutate('/api/commandes');
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
        });
    }

    return (
      <Container>
        {filteredData.map(order => (
          <ListItem id={order.id} key={order.id}>
            <p>Date : {new Date(Date.parse(order.date)).toLocaleDateString()}</p>
            <p>Heure : {order.time}</p>
            <p>Nom : {order.firstName} {order.lastName}</p>
            <p>Téléphone : {order.phoneNumber}</p>
            <p>E-mail : {order.email}</p>
            <ul>Contenu de la commande : {order.basketItems.map(item => (
              <li key={uuid()}>
                <p>{item.quantity}x {item.name}</p>
                <p>Prix : {(item.price * item.quantity).toFixed(2)}€</p>
              </li>
            ))}
            </ul>
            <p>Total : {order.price.toFixed(2)}€</p>
            {props.selected === 1 ? <button onClick={() => handleFile(order.id)}>Valider</button> : <button onClick={() => handleDelete(order.id)}>Supprimer</button>}
          </ListItem>
        ))}
        {errorMessage !== '' && 
          <ErrorCont>
            <ErrorDiv>
              <div>{errorMessage}</div>
              <button onClick={() => setErrorMessage('')}>Fermer</button>
            </ErrorDiv>
          </ErrorCont>}
      </Container>
    );
}

export default Orders;
