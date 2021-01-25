import styled from 'styled-components';

export const Button = styled.a`
  background-color: ${props => props.bgColor};
  border: 2px solid ${props => props.borderColor ? props.borderColor : props.color};
  border-radius: 10px;
  color: ${props => props.color};
  display: block;
  font-family: ${props => props.isCursive ? 'Dancing-Script' : 'Raleway'};
  font-size: ${props => props.isCursive ? '1.3rem' : '1rem'};
  font-weight: 600;
  padding: 10px 20px;
  margin: 30px auto;
  max-width: 200px;
  text-align: center;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  &:visited {
    color: ${props => props.color};
  }
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        background-color: ${props => props.color};
        color: ${props => props.bgColor};
        cursor: pointer;
      }
    }
  }
`;
