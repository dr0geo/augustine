import styled from 'styled-components';

import OrderResultDiv from '@/components/click-n-collect/OrderResultDiv';

const Container = styled.div`
  background-color: #e3e9ef;
  padding: 0 20px;
  position: ${props => props.isBasketDisplayed ? 'fixed' : 'static'};
  transform: ${props => props.isBasketDisplayed ? 'scaleY(0)' : 'scaleY(1)'};
  transform-origin: top center;
  transition: transform 0.2s ease-in-out;
  @media only screen and (min-width: 1200px) {
    height: auto;
    margin: ${props => props.setVertOffset ? '79px auto 30px auto' : '30px auto'};
    padding: 0 0;
    position: static;
    transform: scaleY(1);
    width: 100%;
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
    ${props => props.setVertOffset && 'margin-top: -48px'};
    padding: 0;
  }
`;

const Category = styled.button`
  background-color: ${props =>
    props.selectedSubFood ? '#012f6a' : 'white'};
  border: 1px solid
    ${props => (props.selectedSubFood ? '#012f6a' : '#e3e9ef')};
  border-radius: 5px;
  color: ${props => (props.selectedSubFood ? 'white' : 'black')};
  padding: 15px 10px;
  @media only screen and (min-width: 1200px) {
    background-color: ${props =>props.selectedSubFood ? '#e3e9ef' : 'white'};
    border: 1px solid #e3e9ef;
    border-radius: 0;
    color: #012f6a;
    font-family: 'Dancing-Script', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 8px 20px;
    text-align: left;
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
  [0, 1, 5].includes(props.selectedMainFood)
    ? // Display food that has no subcategory:
      (results = props.selectedFood.map(food => food.id!== 70 && (
        <OrderResultDiv 
          key={food.id}
          food={food}
          selectedMainFood={props.selectedMainFood}
          addToBasket={props.addToBasket}
        >
        </OrderResultDiv>
      )))
    : // Display only the subselection selected via tab:
      (results = props.selectedFood[props.selectedSubFood].data.map(food => food.id !== 48 && (
        <OrderResultDiv 
          key={food.id}
          food={food}
          selectedMainFood={props.selectedMainFood}
          addToBasket={props.addToBasket}
        >
        </OrderResultDiv>
      )));

  return (
    <Container
      // Adapt height of container for short list of food items:
      isShort={props.selectedMainFood}
      // Vertical offset for tabs insertion:
      setVertOffset={[2, 3, 4].includes(props.selectedMainFood)}
      // Adapt height of container for short list of drinks:
      isShortDrink={props.selectedMainFood === 4 && [1, 2].includes(props.selectedSubFood)}
      isBasketDisplayed={props.isBasketDisplayed}
    >
      {/* Display a tab according to which category of food is selected */}
      {[2, 3, 4].includes(props.selectedMainFood) && (
        <CategorySelecter setVertOffset={true}>
          {props.selectedFood.map((food, index) => (
            <Category
              key={index}
              selectedSubFood={props.selectedSubFood === index}
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

export default OrderResults;
