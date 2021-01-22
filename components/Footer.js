import styled from 'styled-components';
import Link from 'next/link';
import { FacebookCircle, Instagram } from '@styled-icons/boxicons-logos';

const FooterContainer = styled.footer`
  background-color: #ac6c14;
  color: white;
  display: flex;
  flex-direction: column;
  position: ${props => (props.isBasketDisplayed ? 'absolute' : 'static')};
  transform: ${props => (props.isBasketDisplayed ? 'scaleY(0)' : 'scaleY(1)')};
  transform-origin: top center;
  transition: transform 0.2s ease-in-out;
  & a {
    color: white;
    &:visited {
      color: white;
    }
  }
  @media only screen and (min-width: 768px) {
    flex-direction: row;
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

const MainBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 450px;
  @media only screen and (min-width: 768px) {
    align-items: flex-start;
    & * {
      margin-left: ${props => props.first ? '0' : 'auto'};
      margin-right: ${props => props.first ? 'auto' : '0'};
      text-align: ${props => props.first ? 'left' : 'right'};
    }
  }
`;

const ExternalLinks = styled.a`
  border-bottom: ${props => (props.underline ? '1px solid #fff' : 'none')};
  display: block;
  line-height: 1.5rem;
  margin: 10px auto;
  text-align: center;
`;

const SocialNetworksDiv = styled.div`
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
    <FooterContainer isBasketDisplayed={props.isBasketDisplayed}>
      <MainBlock first={true}>
        <h2>
          <span className="cursive white">Notre adresse</span>
        </h2>
        <ExternalLinks
          href="https://www.google.fr/maps/place/Augustine/@48.8598185,2.3160919,14z/data=!4m5!3m4!1s0x47e66e258641144b:0x5c25c717c82c8462!8m2!3d48.8634037!4d2.3341628"
          target="_blank"
          rel="noreferrer"
          title="Voir sur Google Maps"
        >
          2 - 4 rue de l'Echelle
          <br />
          75001 Paris
        </ExternalLinks>
        <ExternalLinks href="tel:+33183929448" underline={true}>
          01 83 92 94 48
        </ExternalLinks>
      </MainBlock>
      <MainBlock>
        <h2>
          <span className="cursive white">Restez connectés !</span>
        </h2>
        <Link href="/contact" passHref>
          <ExternalLinks
            title="Cliquez pour accéder au formulaire de contact"
            underline={true}
          >
            Contactez-nous
          </ExternalLinks>
        </Link>
        <SocialNetworksDiv>
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
        </SocialNetworksDiv>
      </MainBlock>
    </FooterContainer>
  );
};

export default Footer;
