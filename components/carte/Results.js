import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #e3e9ef;
  padding: 20px;
`;

const CategorySelecter = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px auto;
  padding: 0 30px;
`;

const Category = styled.button`
  background-color: ${props => (props.isCategorySelected ? '#012f6a' : 'white')};
  border: 1px solid ${props => (props.isCategorySelected ? '#012f6a' : '#e3e9ef')};
  border-radius: 5px;
  color: ${props => (props.isCategorySelected ? 'white' : 'black')};
  padding: 15px 10px;
`;

const Results = props => {

  let results;

  [0, 1, 5].includes(props.isSelected)
    ? results = props.selectedFood.map(food => (
      <div key={food.id}>
        <h3>{food.name}</h3>
        {food.description && <p>{food.description}</p>}
        <p>{food.price.toFixed(2)}€</p>
      </div>
    ))

    : results = props.selectedFood.map(category => (
      category.data.map(food => (
        <div key={food.id}>
          <h3>{food.name}</h3>
          {food.description && <p>{food.description}</p>}
          <p>{food.price.toFixed(2)}€</p>
        </div>
      ))
    ));

  return (
    <Container>
      {[2, 3, 4].includes(props.isSelected) &&
        <CategorySelecter>
          {props.selectedFood.map((food, index) => (
            <Category 
              isCategorySelected={props.isCategorySelected === index}
              value={index}
              onClick={props.handleCategoryClick}
            >
              {food.title}
            </Category>
          ))}
        </CategorySelecter>
      }
      {results}
    </Container>
  );
}

export default Results;
