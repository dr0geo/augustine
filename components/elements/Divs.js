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
