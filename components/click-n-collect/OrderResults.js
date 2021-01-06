import styled from 'styled-components';
import { Basket2 } from '@styled-icons/bootstrap';
import Image from 'next/image';

const Container = styled.div`
  background-color: #e3e9ef;
  padding: 0 20px;
  @media only screen and (min-width: 1200px) {
    ${props => props.setVertOffset && 'margin-top: 49px'};
    width: 840px;
  }
`;

const ResultDiv = styled.div`
  align-items: center;
  display: grid;
  gap: 25px;
  grid-template-rows: repeat(4, auto);
  justify-items: center;
  padding: 25px 0;
  & + & {
    border-top: 1px solid lightgray;
  }
  & > div > form {
    display: flex;
    justify-content: space-around;
    margin: auto;
    width: 220px;
    & > div {
      align-items: center;
      display: flex;
      & > input {
        margin: 0 8px 0 0;
      }
    }
  }
  & > div:last-of-type {
    background-color: #012f6a;
    border-radius: 5px;
    padding: 5px;
  }
  @media only screen and (min-width: 1200px) {
    grid-auto-flow: column;
    grid-template-columns: 1fr 2fr 0.5fr;
    grid-template-rows: repeat(2, auto);
    & > div:first-of-type, div:last-of-type {
      grid-row: 1 / 3;
    }
    & > div:last-of-type {
      transform: scale(0.75);
    }
    @media (any-hover: hover) {
      & > div:last-of-type:hover {
        cursor: pointer;
        transform: scale(0.85);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
`;

const CategorySelecter = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px auto;
  padding: 30px 30px 0 30px;
  @media only screen and (min-width: 1200px) {
    gap: 0;
    grid-template-columns: repeat(4, 1fr);
    margin-left: -20px;
    ${props => props.setVertOffset && 'margin-top: -49px'};
    padding: 0;
  }
`;

const Category = styled.button`
  background-color: ${props =>
    props.isCategorySelected ? '#012f6a' : 'white'};
  border: 1px solid
    ${props => (props.isCategorySelected ? '#012f6a' : '#e3e9ef')};
  border-radius: 5px;
  color: ${props => (props.isCategorySelected ? 'white' : 'black')};
  padding: 15px 10px;
  @media only screen and (min-width: 1200px) {
    background-color: ${props =>props.isCategorySelected ? '#e3e9ef' : 'white'};
    border: 1px solid #e3e9ef;
    border-radius: 0;
    color: #012f6a;
    font-family: 'Dancing-Script', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 8px 20px;
    text-align: left;
    width: 210px;
    & + & {
      border-left: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const OrderResults = props => {
  let results;

  // Check if there are sub-arrays:
  [0, 1, 5].includes(props.isSelected)
    ? // Display food that has no subcategory:
      (results = props.selectedFood.map(food => (
        <ResultDiv key={food.id} value={food}>
          <div><Image src="/images/icons/food-placeholder.png" alt="" height={200} width={200} /></div>
          <div>
            <h3>{food.name}</h3>
            {food.description && <p>{food.description}</p>}
          </div>
          <div>
            <p>{food.price.toFixed(2)}€</p>
          </div>
          <div><Basket2 size={40} color="white" onClick={() => props.addToBasket(food)} /></div>
        </ResultDiv>
      )))
    : // Display only the subselection selected via selected food and selected subcategory of that food:
      (results = props.selectedFood[props.isCategorySelected].data.map(food => (
        <ResultDiv key={food.id}>
          <div><Image src="/images/icons/food-placeholder.png" alt="" height={200} width={200} /></div>
          <div>
            <h3>{food.name}</h3>
            {food.description && <p>{food.description}</p>}
            {props.isSelected === 3 && (
              <form>
                <div>
                  <input id="crepe" type="radio" value="crepe" name="type" checked={true} />
                  <label htmlFor="crepe">Crêpe</label>
                </div>
                <div>
                  <input id="gaufre" type="radio" value="gaufre" name="type" />
                  <label htmlFor="gaufre">Gaufre</label>
                </div>
              </form>
            )}
          </div>
          <div>
            <p>{food.price.toFixed(2)}€</p>
          </div>
          <div><Basket2 size={40} color="white" onClick={() => props.addToBasket(food)} /></div>
        </ResultDiv>
      )));

  return (
    <Container
      isShort={props.isSelected}
      setVertOffset={[2, 3, 4].includes(props.isSelected)}
      isShortDrink={props.isSelected === 4 && [1, 2].includes(props.isCategorySelected)}
    >
      {[2, 3, 4].includes(props.isSelected) && (
        <CategorySelecter setVertOffset={true}>
          {props.selectedFood.map((food, index) => (
            <Category
              key={index}
              isCategorySelected={props.isCategorySelected === index}
              value={index}
              onClick={props.handleCategoryClick}
            >
              {food.title}
            </Category>
          ))}
        </CategorySelecter>
      )}
      {results}
    </Container>
  );
};

export default OrderResults;
