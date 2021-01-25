import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

export const Section = styled.section`
  background: url(${props => props.bgUrl});
  background-color: ${props => props.bgColor};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px 3%;
`;

export const CnCMenuSection = styled.section`
  /* Hide desktop basket when on mobile */
  &::last-child {
    display: none;
  }
  @media only screen and (min-width: 1200px) {
    display: grid;
    gap: 30px;
    grid-template-columns: 0.9fr 2fr 0.9fr;
    grid-template-rows: 80px 1fr;
    margin: 0px auto;

    /* Display desktop basket */
    &::last-child {
      display: block;
    }

    /* Title */
    & > h2 {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
    /* Categories */
    & > div:first-of-type {
      align-self: start;
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    /* Results */
    & > div:nth-of-type(2) {
      align-self: start;
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
    /* Basket */
    & > div:last-of-type {
      grid-row: 1 / 3;
      grid-column: 3 / 4;
    }
  }
`;

// Discount pop-up:
const StyledPopUp = styled.div`
  background-color: #012f6a;
  bottom: 0;
  color: white;
  line-height: 1.5;
  opacity: ${props => props.isHidden ? '0' : '1'};
  padding: 20px;
  position: fixed;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  width: 100vw;
  z-index: 10;
  & a {
    border-bottom: 1px solid white;
    color: white;
    &:visited {
      color: white;
    }
  }
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PopUp = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <StyledPopUp onClick={() => setIsHidden(true)} isHidden={isHidden}>
      Pour toute <Link href="/reserver"><a>réservation en ligne</a></Link> le dimanche, lundi ou mardi, obtenez <strong>20% de réduction</strong> sur votre addition !
    </StyledPopUp>
  );
}
