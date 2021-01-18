import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { useState } from 'react';

import { db } from '@/utils/firebase';
import Spinner from '@/elements/Spinner';
import { Container, Button, DarkCont, ErrorDiv } from '@/components/adminpanel/Elements';

const ListItem = styled.li`
  background-color: #e3e9ef;
  border-radius: 5px;
  margin: 20px auto;
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
`;

const Orders = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Filter orders according to inputs values:
    let filteredData = props.data;

    if (props.date !== '') {
      filteredData = filteredData.filter(order => new Date(Date.parse(order.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }

    if (props.orderId !== '') {
      filteredData = filteredData.filter(order => order.id.toLowerCase().includes(props.orderId.toLowerCase().trim()));
    }

    // Handle filing of an order:
    const handleFile = async (id) => {
      setIsLoading(true);

      const orderRef = props.data.find(order => order.id === id);

      try {
        await db.collection('filedOrders').doc(orderRef.id).set(orderRef);
        await db.collection('orders').doc(orderRef.id).delete();
      } catch {
        setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
      } finally {
        setIsLoading(false);
      }
    }

    // Handle deletion of an order:
    const handleDelete = async (id) => {
      setIsLoading(true);

      const orderRef = props.data.find(order => order.id === id);

      try {
        await db.collection('filedOrders').doc(orderRef.id).delete();
      } catch {
        setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <Container>
        {!filteredData.length 
          ? <h2><em>Pas de commande...</em></h2>
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
