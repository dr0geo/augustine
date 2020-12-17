import styled from 'styled-components';

export const Section = styled.section`
  background: url(${props => props.bgUrl});
  background-color: ${props => props.bgColor};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px 0;
`;

export const MenuSection = styled.section`
  @media only screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
    margin: 30px auto;
    max-width: 1160px;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  @media only screen and (min-width: 1200px) {
    justify-content: space-around;
    max-width: 1200px;
  }
`;

export const GridWrapper = styled.div`
  background-color: hsla(0deg, 0%, 100%, 0.6);
  border-radius: 5px;
  margin: 0 auto;
  max-width: 330px;
  padding: 30px;
  & > h2 {
    margin-bottom: 45px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 660px;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 860px;
  }
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  justify-content: center;
  justify-items: center;
  margin: 0 auto;
  & > div {
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    text-align: center;
    width: 150px;
    & > h3 {
      color: #012f6a;
      font-size: 1rem;
      margin-bottom: 8px;
      padding: 0 5px;
    }
    & > p {
      font-size: 0.85rem;
      margin-top: 0;
      padding: 0 5px;
    }
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 150px);
    & > div:nth-of-type(3) {
      order: 4;
    }
    & > div:nth-of-type(4) {
      order: 3;
    }
    & > div:nth-of-type(5) {
      order: 6;
    }
    & > div:nth-of-type(6) {
      order: 5;
    }
    & > div:nth-of-type(7) {
      order: 7;
    }
    & > div:nth-of-type(8) {
      order: 8;
    }
    & > div:nth-of-type(9) {
      order: 9;
    }
    & > div:nth-of-type(10) {
      order: 10;
    }
    & > div:nth-of-type(11) {
      order: 12;
    }
    & > div:nth-of-type(12) {
      order: 11;
    }
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 200px);
    & > div {
      height: 200px;
      width: 200px;
      & > h3 {
        font-size: 1.1rem;
        margin-bottom: 15px;
        padding: 0 10px;
      }
      & > p {
        font-size: 0.95rem;
        padding: 0 10px;
      }
    }
  }
`;