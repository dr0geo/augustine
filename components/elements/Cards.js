import styled from 'styled-components';

export const RestaurantCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 250px;
  margin: 20px 20px;
  width: 250px;
  & > div > .round-border {
    border-radius: 5px 5px 0 0;
  }
  & > div:last-of-type {
    align-items: center;
    background-color: hsl(213deg, 98%, 21%, 0.8);
    border-radius: 0 0 5px 5px;
    color: white;
    display: flex;
    font-family: 'Dancing-Script', sans serif;
    font-size: 1.3rem;
    height: 50px;
    justify-content: center;
  }
`;

export const PromessCard = styled.div`
  background: none;
  justify-content: space-around;
  margin: 20px 20px;
  width: 250px;
  & > figure {
    & > div {
      align-items: center;
      background: white;
      border-radius: 100%;
      display: flex;
      height: 70px;
      justify-content: center;
      margin: auto;
      width: 70px;
    }
  }
  & > figcaption {
    color: ${props => props.isWhite ? 'white' : 'black'};
    text-align: center;
    & > h3 {
      font-weight: 600;
      margin-bottom: 0;
    }
    & > p {
      margin-top: 0;
    }
  }
`;
