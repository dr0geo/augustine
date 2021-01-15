import styled from 'styled-components';
import { useState } from 'react';
import { mutate } from 'swr';

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
    
    const handleFile = async (id) => {
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
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
        });
    }

    const handleDelete = async (id) => {
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
        {filteredData.map(booking => (
          <ListItem key={booking.id}>
            <p>Date : {new Date(Date.parse(booking.date)).toLocaleDateString()}</p>
            <p>Heure : {booking.time}</p>
            <p>Nombre de personnes : {booking.people}</p>
            <p>Nom : {booking.firstName} {booking.lastName}</p>
            <p>Téléphone : {booking.phoneNumber}</p>
            <p>E-mail : {booking.email}</p>
            {props.selected === 1 ? <button onClick={() => handleFile(booking.id)}>Valider</button> : <button onClick={() => handleDelete(booking.id)}>Supprimer</button>}
          </ListItem>
        ))}
        {errorMessage !== '' && 
          <DarkCont>
            <ErrorDiv>
              <div>{errorMessage}</div>
              <button onClick={() => setErrorMessage('')}>Fermer</button>
            </ErrorDiv>
          </DarkCont>}
      </Container>
    );
  }

export default Reservations;
