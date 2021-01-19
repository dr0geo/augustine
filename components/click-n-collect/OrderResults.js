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
  [0, 1, 5].includes(props.isSelected)
    ? // Display food that has no subcategory:
      (results = props.selectedFood.map(food => food.id!== 70 && (
        <OrderResultDiv 
          key={food.id}
          food={food}
          isSelected={props.isSelected}
          addToBasket={props.addToBasket}
        >
        </OrderResultDiv>
      )))
    : // Display only the subselection selected via selected food and selected subcategory of that food:
      (results = props.selectedFood[props.isCategorySelected].data.map(food => (
        <OrderResultDiv 
          key={food.id}
          food={food}
          isSelected={props.isSelected}
          addToBasket={props.addToBasket}
        >
        </OrderResultDiv>
      )));

  return (
    <Container
      isShort={props.isSelected}
      setVertOffset={[2, 3, 4].includes(props.isSelected)}
      isShortDrink={props.isSelected === 4 && [1, 2].includes(props.isCategorySelected)}
      isBasketDisplayed={props.isBasketDisplayed}
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
