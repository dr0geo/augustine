import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { mutate } from 'swr';
import { useState } from 'react';

import Spinner from '@/elements/Spinner';

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
    color: #012f6a;
    line-height: 2rem;
    padding: 0;
    text-align: left;
  }
  & > ul {
    color: #012f6a;
    line-height: 2rem;
    & > li {
      list-style-position: inside;
      list-style-type: circle;
      margin-left: 20px;
      margin-right: 20px;
      padding: 10px 20px;
      & + li {
        border-top: 1px solid lightgray;
      }
    }
  }
  & > button {
    display: block;
    margin: auto;
    padding: 5px 10px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.selected === 1 ? '#4eb152' : '#d02f36'};
  border: none;
  color: white;
  font-weight: 600;
`;

const DarkCont = styled.div`
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

    if (props.date !== '') {
      filteredData = filteredData.filter(order => new Date(Date.parse(order.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }
    if (props.orderId !== '') {
      filteredData = filteredData.filter(order => order.id.toLowerCase().includes(props.orderId.toLowerCase().trim()));
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFile = async (id) => {
      setIsLoading(true);
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
            setIsLoading(false);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
        });
    }

    const handleDelete = async (id) => {
      setIsLoading(true);
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
            setIsLoading(false);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
        });
    }

    return (
      <Container>
        {!filteredData.length 
          ? <h2><em>Pas de commande à la date sélectionnée...</em></h2>
          : filteredData.map(order => (
          <ListItem id={order.id} key={order.id}>
            <p><strong>Date</strong> : {new Date(Date.parse(order.date)).toLocaleDateString()}</p>
            <p><strong>Heure</strong> : {order.time}</p>
            <p><strong>Nom</strong> : {order.firstName} {order.lastName}</p>
            <p><strong>Téléphone</strong> : {order.phoneNumber}</p>
            <p><strong>E-mail</strong> : {order.email}</p>
            <ul><strong>Contenu de la commande</strong> : {order.basketItems.map(item => (
              <li key={uuid()}>
                {item.quantity}x {item.name} ({(item.price * item.quantity).toFixed(2)}€)
              </li>
            ))}
            </ul>
            <p><strong>Total</strong> : {order.price.toFixed(2)}€</p>
            {props.selected === 1 ? <Button selected={props.selected} onClick={() => handleFile(order.id)}>Valider</Button> : <Button selected={props.selected} onClick={() => handleDelete(order.id)}>Supprimer</Button>}
          </ListItem>
        ))}
        {errorMessage !== '' && 
          <DarkCont>
            <ErrorDiv>
              <div>{errorMessage}</div>
              <button onClick={() => setErrorMessage('')}>Fermer</button>
            </ErrorDiv>
          </DarkCont>}
        {isLoading && <Spinner />}
      </Container>
    );
}

export default Orders;
