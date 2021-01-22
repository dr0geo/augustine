import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import { Menu as MenuIcon } from '@styled-icons/evaicons-solid';

const StyledHeader = styled.header`
  align-items: center;
  background: url(${props => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  padding: 0 40px;
  @media only screen and (min-width: 800px) {
    min-height: 550px;
  }
  @media only screen and (min-width: 1200px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

const Logo = styled.div`
  margin: 20px;
  padding: 15px 30px;
  width: 280px;
  & > h1 {
    color: #012f6a;
    font-size: 1.3rem;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 40px;
    width: auto;
    & > h1 {
      font-size: 1.8rem;
      height: auto;
      justify-content: center;
      margin-top: 20px;
    }
  }
`;

const Close = styled(CloseOutline)`
  color: #012f6a;
  margin: 0 auto;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const MenuIc = styled(MenuIcon)`
  color: #012f6a;
  margin-bottom: 10px;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const FlexDiv = styled.nav`
  background-color: #f4f6f3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  left: 0;
  position: fixed;
  text-align: center;
  top: 0;
  transform: ${props => (props.isClicked ? 'scale(1)' : 'scale(0)')};
  transition: transform 0.2s ease-in-out 0.1s;
  width: 100vw;
  z-index: 100;
  @media only screen and (min-width: 1200px) {
    background: linear-gradient(hsla(0deg, 0%, 100%, 0.8), hsla(0deg, 0%, 100%, 0.8));
    flex-direction: row;
    height: auto;
    position: static;
    transform: scale(1);
  }
`;

const Anchor = styled.a`
  color: #012f6a;
  &:visited {
    color: #012f6a;
  }
  @media only screen and (min-width: 1200px) {
    border-bottom: ${props => props.isSelected ? '2px solid #012f6a' : '2px solid transparent'};
    margin: 20px 0;
    padding: 7px 0;
    transition: border-bottom 0.2s ease-in-out;
    &:hover {
      border-bottom: 2px solid #012f6a;
      cursor: pointer;
    }
  }
`;

const logo = (
  <Logo>
    <Image src="/images/logo/logo.webp" alt="" height={320} width={450} />
    <h1>Crêperie Contemporaine - Paris</h1>
  </Logo>
);

const Header = props => {
  return (
    <StyledHeader bg={props.bg}>
      {props.logo ? logo : <h1>{props.title}</h1>}
      <MenuIc onClick={props.toggleMenu} size={40} />
      <FlexDiv isClicked={props.isClicked}>
        <Link href="/" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 1}>
            Accueil
          </Anchor>
        </Link>
        <Link href="/la-carte" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 2}>
            La Carte
          </Anchor>
        </Link>
        <Link href="/reserver" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 3}>
            Réservez une table
          </Anchor>
        </Link>Header
Header
        <Link href="/contact" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 6}>
            Contact
          </Anchor>
        </Link>
        <Close onClick={props.hideMenu} size={70} />
      </FlexDiv>
    </StyledHeader>
  );
};

export default Header;
