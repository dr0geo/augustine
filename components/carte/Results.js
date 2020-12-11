import styled from 'styled-components';

const Container = styled.div`
  background-color: #e3e9ef;
  padding: 0 20px;
  @media only screen and (min-width: 1200px) {
    ${props => props.isShort === 0 && 'height: 290px'};
    ${props => props.isShort === 1 && 'height: 350px'};
    ${props => props.isShortDrink && 'height: 315px'};
    ${props => props.offset && 'margin-top: 49px'};
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
  & > div > h3 {
    margin: 0 auto;
  }
  & > div:first-of-type > p {
    margin-top: 5px;
  }
  & > div:last-of-type > p {
    margin-bottom: 0;
    margin-top: 10px;
  }
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    & > div > h3 {
      text-align: left;
    }
    & > div > p {
      max-width: 700px;
      padding: 0;
      text-align: left;
    }
    & > div:last-of-type {
      align-items: center;
      display: flex;
    }
    & > div:last-of-type > p {
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
    ${props => props.offset && 'margin-top: -48px'};
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
    background-color: ${props =>
      props.isCategorySelected ? '#e3e9ef' : 'white'};
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

const Results = props => {
  let results;

  // Check if there are sub-arrays:
  [0, 1, 5].includes(props.isSelected)
    ? // Display food that has no subcategory:
      (results = props.selectedFood.map(food => (
        <ResultDiv key={food.id}>
          <div>
            <h3>{food.name}</h3>
            {food.description && <p>{food.description}</p>}
          </div>
          <div>
            <p>{food.price.toFixed(2)}€</p>
          </div>
        </ResultDiv>
      )))
    : // Display only the subselection selected via selected food and selected subcategory of that food:
      (results = props.selectedFood[props.isCategorySelected].data.map(food => (
        <ResultDiv key={food.id}>
          <div>
            <h3>{food.name}</h3>
            {food.description && <p>{food.description}</p>}
          </div>
          <div>
            <p>{food.price.toFixed(2)}€</p>
          </div>
        </ResultDiv>
      )));

  return (
    <Container
      isShort={props.isSelected}
      offset={[2, 3, 4].includes(props.isSelected)}
      isShortDrink={props.isSelected === 4 && [1, 2].includes(props.isCategorySelected)}
    >
      {[2, 3, 4].includes(props.isSelected) && (
        <CategorySelecter offset={true}>
          {props.selectedFood.map((food, index) => (
            <Category
              key={food.id}
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

export default Results;
