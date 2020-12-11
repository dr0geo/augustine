import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px auto;
  padding: 0 30px;
`;

const Category = styled.button`
  background-color: ${props => (props.isSelected ? '#012f6a' : 'white')};
  border: 1px solid ${props => (props.isSelected ? '#012f6a' : '#e3e9ef')};
  border-radius: 5px;
  color: ${props => (props.isSelected ? 'white' : 'black')};
  padding: 15px 10px;
`;

const Categories = props => {
  return (
    <Container>
      <Category
        isSelected={props.isSelected === 0}
        value={0}
        onClick={props.handleClick}
      >
        Entrées
      </Category>
      <Category
        isSelected={props.isSelected === 1}
        value={1}
        onClick={props.handleClick}
      >
        Salades
      </Category>
      <Category
        isSelected={props.isSelected === 2}
        value={2}
        onClick={props.handleClick}
      >
        Galettes
      </Category>
      <Category
        isSelected={props.isSelected === 3}
        value={3}
        onClick={props.handleClick}
      >
        Crêpes
      </Category>
      <Category
        isSelected={props.isSelected === 4}
        value={4}
        onClick={props.handleClick}
      >
        Boissons
      </Category>
      <Category
        isSelected={props.isSelected === 5}
        value={5}
        onClick={props.handleClick}
      >
        Menu
      </Category>
    </Container>
  );
};

export default Categories;
