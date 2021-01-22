import styled from 'styled-components';
import { ArrowCircleUpOutline } from '@styled-icons/evaicons-outline';

export const Button = styled.a`
  background-color: ${props => props.bgColor};
  border: 2px solid ${props => props.borderColor ? props.borderColor : props.color};
  border-radius: 10px;
  color: ${props => props.color};
  display: block;
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
      }
    }
  }
`;

export const ScrollToTop = styled(ArrowCircleUpOutline)`
  display: none;
  @media only screen and (min-width: 1200px) {
    bottom: 40px;
    display: block;
    opacity: 0.8;
    position: fixed;
    right: 40px;
    transform: scale(1);
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    z-index: 30;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
`;
