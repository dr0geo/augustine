import styled from 'styled-components';

const Card = styled.div`
  align-items: center;
  background-color: #012f6a;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 30px auto;
  padding: 40px;
  transition: opacity 0.2s ease-in-out;
  @media (any-hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Card;