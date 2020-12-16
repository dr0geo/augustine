import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 250px;
  & > select {
    margin: auto;
    padding: 5px;
    width: 85%;
  }
  & > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 85%;
    & > input {
      padding: 10px;
    }
  }
  & > div:last-of-type {
    width: 100%;
    & > input {
      margin: auto;
      width: 85%;
    }
  }
`;

const Filter = props => {
  return (
    <Container>
      <select onChange={props.selectRestaurant}>
        <option value={0} defaultValue>
          Tous les restaurants
        </option>
        <option value={1}>Paris 01</option>
        <option value={8}>Paris 08</option>
      </select>
      <div>
        <label htmlFor="calendar">Choisissez une date :</label>
        <input id="calendar" type="date" onChange={props.selectDate} />
      </div>
      <div>
        <input type="text" onChange={props.getById} placeholder="Entrez une référence de réservation" />
      </div>
    </Container>
  );
};

export default Filter;
