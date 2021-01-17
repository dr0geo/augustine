import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  max-width: 450px;
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
    & > button {
      background-color: white;
      border: 1px solid gray;
      height: 44px;
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
      <div>
        <button onClick={props.allDates}>Toutes les dates</button>
        <input type="date" onChange={props.selectDate} value={props.date} />
      </div>
      <div>
        <input type="text" onChange={props.getById} placeholder="Entrez une référence..." />
      </div>
    </Container>
  );
};

export default Filter;
