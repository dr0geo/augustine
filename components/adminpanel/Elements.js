import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 3rem;
  height: auto;
  justify-content: center;
  margin-bottom: 50px;
  padding: 0 10px;
`;

export const Total = styled.div`
  color: orangered;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 50px auto 0 auto;
  padding: 0 10px;
  text-align: center;
  & > span {
    border-bottom: 1px solid orangered;
    @media (any-hover: hover) {
      cursor: pointer;
    }
  }
`;

export const todayDate = new Date(Date.now());
const day = todayDate.getDate().toString().padStart(2, '0');
const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
const year = todayDate.getFullYear();
export const dateString = `${year}-${month}-${day}`;
