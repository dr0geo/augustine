import styled from 'styled-components';
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
`;

const Reservations = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Filter bookings according to inputs values:
  let filteredData = props.data;

  if (props.date !== '') {
    filteredData = filteredData.filter(
      booking => new Date(Date.parse(booking.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
  }

  if (props.bookingId !== '') {
    filteredData = filteredData.filter(booking =>
      booking.id.toLowerCase().startsWith(props.bookingId.toLowerCase().trim())
    );
  }

  // Handle filing of a booking:
  const handleFile = async id => {
    setIsLoading(true);

    const bookingRef = props.data.find(booking => booking.id === id);

    try {
      await db.collection('filedBookings').doc(bookingRef.id).set(bookingRef);
      await db.collection('bookings').doc(bookingRef.id).delete();
    } catch {
      setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle booking restore:
  const handleRestore = async id => {
    setIsLoading(true);

    const bookingRef = props.data.find(booking => booking.id === id);

    try {
      await db.collection('bookings').doc(bookingRef.id).set(bookingRef);
      await db.collection('filedBookings').doc(bookingRef.id).delete();
    } catch {
      setErrorMessage('Une erreur s\'est produite, veuillez réessayer...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {!filteredData.length ? (
        <h2>
          <span className="cursive">Pas de réservation...</span>
        </h2>
      ) : (
        filteredData.map(booking => (
          <ListItem key={booking.id}>
            <p>
              <strong>Date</strong> :{' '}
              {new Date(Date.parse(booking.date)).toLocaleDateString()}
            </p>
            <p>
              <strong>Heure</strong> : {booking.time}
            </p>
            <p>
              <strong>Nombre de personnes</strong> : {booking.guestsNumber}
            </p>
            <p>
              <strong>Nom</strong> : {booking.firstName} {booking.lastName}
            </p>
            <p>
              <strong>Téléphone</strong> : {booking.phoneNumber}
            </p>
            <p>
              <strong>E-mail</strong> : {booking.email}
            </p>
            {props.selected === 1 ? (
              <Button
                selected={props.selected}
                onClick={() => handleFile(booking.id)}
              >
                Valider
              </Button>
            ) : (
              <Button
                selected={props.selected}
                onClick={() => handleRestore(booking.id)}
              >
                Restaurer
              </Button>
            )}
          </ListItem>
        ))
      )}
      {errorMessage !== '' && (
        <DarkCont>
          <ErrorDiv>
            <div>{errorMessage}</div>
            <button onClick={() => setErrorMessage('')}>Fermer</button>
          </ErrorDiv>
        </DarkCont>
      )}
      {isLoading && <Spinner />}
    </Container>
  );
};

export default Reservations;
