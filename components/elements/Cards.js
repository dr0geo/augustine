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
    font-family: 'Dancing-Script', Georgia, serif;
    font-size: 1.3rem;
    height: 50px;
    justify-content: center;
  }
`;
