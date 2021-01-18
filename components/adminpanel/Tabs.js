import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: auto;
  max-width: 500px;
  width: 90%;
`;

const Button = styled.button`
  background-color: ${props => props.selected ? '#012f6a' : 'white'};
  border: 1px solid #012f6a;
  color: ${props => props.selected ? 'white' : '#012f6a'};
  font-weight: 600;
  padding: 5px 10px;
  width: 50%;
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Tabs = props => {
  return (
    <Container>
      <Button selected={props.selected === 1} onClick={() => props.handleSelectTab(1)}>Non traitées</Button>
      <Button selected={props.selected === 2} onClick={() => props.handleSelectTab(2)}>Validées</Button>
    </Container>
  );
}

export default Tabs;
