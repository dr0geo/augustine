import styled from 'styled-components';
import useSWR from 'swr';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1200px;
`;

const ListItem = styled.li`
  background-color: #e3e9ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px;
  padding: 20px;
  & > p {
    line-height: 1.5rem;
    padding: 0;
  }
`;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Reservations = () => {
  const { data } = useSWR('/api/reservations', fetcher, { refreshInterval: 60000 });

  if (!data) {
    return <Container>Chargement...</Container>;
  }

  return (
    <Container>
      {data.bookings.map(booking => (
        <ListItem key={booking.id} value={booking.id}>
          <p>Restaurant : Paris {booking.restaurant}</p>
          <p>Date : {booking.date}</p>
          <p>Heure : {booking.time}</p>
          <p>Nombre de personnes : {booking.people}</p>
          <p> Nom : {booking.firstName} {booking.lastName}</p>
          <p>Téléphone : {booking.phoneNumber}</p>
          <p>E-mail : {booking.email}</p>
        </ListItem>
      ))}
    </Container>
  );
};

export default Reservations;
