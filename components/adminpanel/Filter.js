import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px auto;
  max-width: 450px;
  & > select {
    margin: auto;
    padding: 5px;
    width: 85%;
  }
  & > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    width: 85%;
    & > input {
      border: 2px solid #012f6a;
      border-radius: 5px;
      color: #012f6a;
      font-family: 'Raleway', sans-serif;
      font-size: 1rem;
      padding: 10px;
      &::placeholder {
        color: #012f6a;
      }
      &[type='date'] {
        width: 150px;
      }
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

const Button = styled.button`
  background-color: ${props => props.allDates ? '#012f6a' : 'white'};
  border: 2px solid #012f6a;
  border-radius: 5px;
  color: ${props => props.allDates ? 'white' : '#012f6a'};
  font-weight: 600;
  padding: 10px;
  width: 200px;
`;

const Filter = props => {

  console.log((new Date(props.date)).toLocaleDateString('fr-FR'));

  return (
    <Container>
      <div>
        <input type="date" onChange={props.selectDate} value={props.date} />
        <Button onClick={props.allDates} allDates={props.date === ''}>{props.date !== '' ? 'Voir toutes les dates' : 'Toutes les dates'}</Button>
      </div>
      <div>
        <input type="text" onChange={props.getById} placeholder="Entrez une référence..." />
      </div>
    </Container>
  );
};

export default Filter;
