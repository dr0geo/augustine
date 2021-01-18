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

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
`;

export const Button = styled.button`
  background-color: ${props => props.selected === 1 ? '#4eb152' : '#d02f36'};
  border: none;
  border-radius: 5px;
  color: white;
  display: block;
  font-weight: 600;
  margin: auto;
  padding: 10px 20px;
  transition: opacity 0.2s ease-in-out;
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const DarkCont = styled.div`
  align-items: center;
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.8), hsla(0deg, 0%, 0%, 0.8));display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
`;

export const ErrorDiv = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 5px;
  color: red;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  height: 250px;
  justify-content: space-around;
  text-align: center;
  width: 250px;
`;