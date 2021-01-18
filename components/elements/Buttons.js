import styled from 'styled-components';
import { ArrowCircleUpOutline } from '@styled-icons/evaicons-outline';

export const BlackButton = styled.a`
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  color: black;
  display: block;
  font-weight: 600;
  padding: 10px 20px;
  margin: 30px auto;
  max-width: 200px;
  text-align: center;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  &:visited {
    color: black;
  }
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        background-color: black;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

export const WhiteButton = styled(BlackButton)`
  background-color: transparent;
  border-color: white;
  color: white;
  &:visited {
    color: white;
  }
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        background-color: white;
        color: #012f6a;
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
