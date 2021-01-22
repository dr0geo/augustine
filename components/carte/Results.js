import styled from 'styled-components';
import { v1 as uuid } from 'uuid';

const Container = styled.div`
  background-color: #e3e9ef;
  padding: 0 20px;
  @media only screen and (min-width: 1200px) {
    ${props => props.isShort === 0 && 'height: 290px'};
    ${props => props.isShort === 1 && 'height: 350px'};
    ${props => props.isShortDrink && 'height: 315px'};
    ${props => props.setVertOffset && 'margin-top: 49px'};
    width: 840px;
  }
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  & + & {
    border-top: 1px solid lightgray;
  }
  & h3 {
    margin: 0 auto;
  }
  & p {
    margin-top: 10px;
  }
  & .price {
    margin-top: 10px;
  }
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    & h3 {
      text-align: left;
    }
    & p {
      max-width: 700px;
      padding: 0;
      text-align: left;
    }
    & .price {
      align-items: center;
      display: flex;
      margin-top: 0;
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
    ${props => props.setVertOffset && 'margin-top: -48px'};
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
    font-family: 'Dancing-Script', Georgia, serif;
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

const Results = props => {
  let results;

  // Check if there are sub-arrays:
  [0, 1, 5].includes(props.isSelected)
    ? // Display food that has no subcategory:
      (results = props.selectedFood.map(food => (
        <ResultDiv key={uuid()}>
          <div>
            <h3>
              {!food.options ? food.name : food.description ? food.name : food.options.join(' - ')}
              {food.restrictions && (<span className="italic"> ({food.restrictions})</span>)}
            </h3>
            {food.description && <p>{food.description}</p>}
          </div>
          <div className="price">
            <p>{food.price.toFixed(2)}€</p>
          </div>
        </ResultDiv>
      )))
    : // Display only the subselection selected via tab:
      (results = props.selectedFood[props.isCategorySelected].data.map(food => (
        <ResultDiv key={uuid()}>
          <div>
            <h3>{!food.options ? food.name : food.options.join(' - ')}</h3>
            {food.description && <p>{food.description}</p>}
          </div>
          <div className="price">
            <p>{food.price.toFixed(2)}€{props.isSelected === 3 && <span className="italic"> (gaufre +1€)</span>}</p>
          </div>
        </ResultDiv>
      )));

  return (
    <Container
      // Adapt height of container for short list of food items:
      isShort={props.isSelected}
      // Vertical offset for tabs insertion:
      setVertOffset={[2, 3, 4].includes(props.isSelected)}
      // Adapt height of container for short list of drinks:
      isShortDrink={props.isSelected === 4 && [1, 2].includes(props.isCategorySelected)}
    >
      {/* Display a tab according to which category of food is selected */}
      {[2, 3, 4].includes(props.isSelected) && (
        <CategorySelecter setVertOffset={true}>
          {props.selectedFood.map((food, index) => (
            <Category
              key={uuid()}
              isCategorySelected={props.isCategorySelected === index}
              value={index}
              onClick={props.handleCategoryClick}
            >
              {/* Name of the tab */}
              {food.title}
            </Category>
          ))}
        </CategorySelecter>
      )}
      {/* All results divs */}
      {results}
    </Container>
  );
};

export default Results;
