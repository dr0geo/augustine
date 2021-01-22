import styled from 'styled-components';
import Link from 'next/link';
import { FacebookCircle, Instagram } from '@styled-icons/boxicons-logos';

const FooterFlexDiv = styled.div`
  & > div:last-of-type > p:first-of-type {
    text-decoration: underline;
  }
  & > div:last-of-type > p > a {
    margin: 20px 0;
  }
  & p {
    margin-top: 15px;
  }
  @media only screen and (min-width: 731px) {
    justify-content: space-between;
    max-width: 1200px;
    & > div:first-of-type {
      & * {
        text-align: left;
      }
      & p {
        margin-top: 0;
        padding-left: 0;
      }
    }
    & > div:last-of-type {
      & * {
        text-align: right;
      }
      & p {
        padding-right: 0;
      }
    }
  }
`;

const StyledFooter = styled.footer`
  background-color: #ac6c14;
  color: white;
  position: ${props => props.isBasketDisplayed ? 'absolute' : 'static'};
  transform: ${props => props.isBasketDisplayed ? 'scaleY(0)' : 'scaleY(1)'};
  transform-origin: top center;
  transition: transform 0.2s ease-in-out;
  & > div > div {
    padding: 10px 40px;
    & > div > p {
      width: 200px;
    }
  }
  & a + a {
    margin-left: 20px;
  }
  @media only screen and (min-width: 1200px) {
    /* Hide basket box shadow */
    position: relative;
    transform: scaleY(1);
    z-index: 1;
    /* Hide mobile basket when on a desktop view */
    & + div + div {
      display: none;
    }
  }
`;

const CenteredDiv = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const Fb = styled(FacebookCircle)`
  @media only screen and (min-width: 1200px) {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;

const Insta = styled(Instagram)`
  @media only screen and (min-width: 1200px) {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;

const Footer = props => {
  return (
    <StyledFooter isBasketDisplayed={props.isBasketDisplayed}>
      <FooterFlexDiv>
        <div>
          <h2>
            <strong>Notre adresse</strong>
          </h2>
          <div>
            <p>
              <a href="https://www.google.fr/maps/place/Augustine/@48.8598185,2.3160919,14z/data=!4m5!3m4!1s0x47e66e258641144b:0x5c25c717c82c8462!8m2!3d48.8634037!4d2.3341628" target="_blank" rel="noreferrer" title="Voir sur Google Maps">2 - 4 rue de l'Echelle
              <br />
              75001 Paris</a>
              <br />
              <br />
              <a href="tel:+33183929448">01 83 92 94 48</a>
            </p>
          </div>
        </div>
        <div>
          <h2>
            <strong>Restez connectés !</strong>
          </h2>
          <p>
            <Link href="/contact">
              <a title="Cliquez pour accéder au formulaire de contact">Contactez-nous</a>
            </Link>
          </p>
          <CenteredDiv>
            <a
              href="https://www.facebook.com/crepesaugustine"
              rel="noopener, noreferrer"
              target="_blank"
              title="Page Facebook de la crêperie Augustine"
            >
              <Fb size={50} />
            </a>
            <a
              href="https://www.instagram.com/creperieaugustine/"
              rel="noopener, noreferrer"
              target="_blank"
              title="Page Instagram de la crêperie Augustine"
            >
              <Insta size={55} />
            </a>
          </CenteredDiv>
        </div>
      </FooterFlexDiv>
    </StyledFooter>
  );
};

export default Footer;
