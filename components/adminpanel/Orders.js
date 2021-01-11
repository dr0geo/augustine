import styled from 'styled-components';
import { v1 as uuid } from 'uuid';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1080px;
`;

const ListItem = styled.li`
  background-color: #e3e9ef;
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  width: 320px;
  & > p {
    line-height: 1.5rem;
    padding: 0;
    text-align: left
  }
`;

const Orders = props => {
    // Filter orders according to inputs values:
    let filteredData = props.data.orders;

    if (props.date !== '') {
      filteredData = filteredData.filter(order => new Date(Date.parse(order.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }
    if (props.orderId !== '') {
      filteredData = filteredData.filter(order => order.id.toLowerCase().includes(props.orderId.toLowerCase().trim()));
    }

    return (
      <Container>
        {filteredData.map(order => (
          <ListItem key={uuid()}>
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
            <p>Total : {order.price}</p>
          </ListItem>
        ))}
      </Container>
    );
  }

export default Orders;
