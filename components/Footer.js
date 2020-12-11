import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { FlexDiv } from '@/elements/Divs';

const FooterFlexDiv = styled(FlexDiv)`
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
    max-width: 1200px;
    & > div:first-of-type {
      & * {
        text-align: left;
      }
      & p {
        padding-left: 0;
      }
    }
    & > div:last-of-type {
      & * {
        text-align: right;
      }
      & p {
        padding-bottom: 20px;
        padding-right: 0;
      }
    } 
  }
  
`;

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

const CenteredDiv = styled.div`
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterFlexDiv>
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
            <Link href="/contact">
              <a>Contactez-nous</a>
            </Link>
          </p>
          <CenteredDiv>
            <a href="#" rel="noopener, noreferrer" target="_blank">
              <Image
                src="/images/icons/fb.jpg"
                alt="Logo FaceBook"
                height={40}
                width={40}
              />
            </a>
            <a href="https://www.instagram.com/creperieaugustine/" rel="noopener, noreferrer" target="_blank">
              <Image
                src="/images/icons/insta.jpeg"
                alt="Logo Instagram"
                height={40}
                width={40}
              />
            </a>
          </CenteredDiv>
        </div>
      </FooterFlexDiv>
    </StyledFooter>
  );
};

export default Footer;
