import Link from 'next/link';
import styled from 'styled-components';

import { FlexDiv } from '@/elements/Divs';

const StyledFooter = styled.footer`
  background-color: #ac6c14;
  color: white;

  & > div > div {
    padding: 10px 40px;
    & > div > p {
      width: 200px;
    }
  }
  & a + a {
    margin-left: 20px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FlexDiv>
        <div>
          <h2>
            <strong>Nos adresses</strong>
          </h2>
          <FlexDiv>
            <p>
              2 - 4 rue de l'Echelle
              <br />
              75001 Paris
              <br />
              <a href="tel:0100000000">01.00.00.00.00</a>
            </p>
            <p>
              Autre adresse
              <br />
              75008 Paris
              <br />
              <a href="tel:0100000000">01.00.00.00.00</a>
            </p>
          </FlexDiv>
        </div>
        <div>
          <h2>
            <strong>Restez connectés !</strong>
          </h2>
          <p>
            <Link href="/">
              <a>Contactez-nous</a>
            </Link>
          </p>
          <p>
            <a href="#" rel="noopener, noreferrer">
              Fb
            </a>
            <a href="#" rel="noopener, noreferrer">
              Insta
            </a>
          </p>
        </div>
      </FlexDiv>
    </StyledFooter>
  );
};

export default Footer;
