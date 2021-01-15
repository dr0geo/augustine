import styled from 'styled-components';
import { useState } from 'react';
import { mutate } from 'swr';

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

const Cont = styled.div`
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

const Reservations = props => {
    // Filter bookings according to inputs values:
    let filteredData = props.data;

    if (props.date !== '') {
      filteredData = filteredData.filter(booking => new Date(Date.parse(booking.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }
    if (props.bookingId !== '') {
      filteredData = filteredData.filter(booking => booking.id.toLowerCase().includes(props.bookingId.toLowerCase().trim()));
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFile = async (id) => {
      setIsLoading(true);
      const bookingRef = props.data.find(booking => booking.id === id);

      fetch('/api/reservations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingRef)
      })
        .then(res => {
          if (res.status === 200) {
            mutate('/api/reservations');
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
      const bookingRef = props.data.find(booking => booking.id === id);

      fetch('/api/reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingRef)
      })
        .then(res => {
          if (res.status === 200) {
            mutate('/api/reservations');
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
          ? <h2><em>Pas de réservation à la date sélectionnée...</em></h2>
          : filteredData.map(booking => (
          <ListItem key={booking.id}>
            <p><strong>Date</strong> : {new Date(Date.parse(booking.date)).toLocaleDateString()}</p>
            <p><strong>Heure</strong> : {booking.time}</p>
            <p><strong>Nombre de personnes</strong> : {booking.people}</p>
            <p><strong>Nom</strong> : {booking.firstName} {booking.lastName}</p>
            <p><strong>Téléphone</strong> : {booking.phoneNumber}</p>
            <p><strong>E-mail</strong> : {booking.email}</p>
            {props.selected === 1 ? <Button selected={props.selected} onClick={() => handleFile(booking.id)}>Valider</Button> : <Button selected={props.selected} onClick={() => handleDelete(booking.id)}>Supprimer</Button>}
          </ListItem>
        ))}
        {errorMessage !== '' && 
          <Cont>
            <ErrorDiv>
              <div>{errorMessage}</div>
              <button onClick={() => setErrorMessage('')}>Fermer</button>
            </ErrorDiv>
          </Cont>}
        {isLoading && <Spinner />}
      </Container>
    );
  }

export default Reservations;
