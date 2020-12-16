import styled from 'styled-components';
import useSWR from 'swr';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  max-width: 1200px;
`;

const ListItem = styled.li`
  background-color: #e3e9ef;
  border-radius: 5px;
  margin: 20px;
  padding: 20px;
  & > p {
    line-height: 1.5rem;
    padding: 0;
    text-align: left
  }
`;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Reservations = props => {
  const { data } = useSWR('/api/reservations', fetcher, {
    refreshInterval: 60000
  });

  if (!data) {
    return <Container>Chargement...</Container>;

  } else {
    let filteredData = data.bookings;

    if (props.restaurant !== 0) {
      filteredData = filteredData
      .filter(booking => booking.restaurant === props.restaurant)
    }
    if (props.date !== '') {
      filteredData = filteredData.filter(booking => new Date(Date.parse(booking.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }
    if (props.bookingId !== '') {
      filteredData = filteredData.filter(booking => booking.id.toLowerCase().includes(props.bookingId.toLowerCase()));
    }

    return (
      <Container>
        {filteredData.map(booking => (
          <ListItem key={booking.id} value={booking.id}>
            <p>Restaurant : Paris {booking.restaurant}</p>
            <p>Date : {new Date(Date.parse(booking.date)).toLocaleDateString()}</p>
            <p>Heure : {booking.time}</p>
            <p>Nombre de personnes : {booking.people}</p>
            <p>Nom : {booking.firstName} {booking.lastName}</p>
            <p>Téléphone : {booking.phoneNumber}</p>
            <p>E-mail : {booking.email}</p>
          </ListItem>
        ))}
      </Container>
    );
  }
};

export default Reservations;
