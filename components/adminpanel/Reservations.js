import styled from 'styled-components';

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

const Reservations = props => {
    // Filter bookings according to inputs values:
    let filteredData = props.data.bookings;

    if (props.date !== '') {
      filteredData = filteredData.filter(booking => new Date(Date.parse(booking.date)).toLocaleDateString() === new Date(Date.parse(props.date)).toLocaleDateString());
    }
    if (props.bookingId !== '') {
      filteredData = filteredData.filter(booking => booking.id.toLowerCase().includes(props.bookingId.toLowerCase().trim()));
    }

    return (
      <Container>
        {filteredData.map(booking => (
          <ListItem key={booking.id} value={booking.id}>
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

export default Reservations;
