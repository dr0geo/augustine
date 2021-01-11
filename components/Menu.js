import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline';
import { Menu as MenuIcon } from '@styled-icons/evaicons-solid';

const Header = styled.header`
  align-items: center;
  background: url(${props => `${props.bg}-small.webp`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 0 40px;
  @media only screen and (min-width: 1200px) {
    background: url(${props => `${props.bg}.webp`});
    background-position: bottom -100px center;
    flex-direction: column-reverse;
    justify-content: flex-end;
    min-height: 550px;
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

const FlexDiv = styled.div`
  background-color: #f4f6f3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  position: fixed;
  text-align: center;
  transform: ${props => (props.isClicked ? 'scale(1)' : 'scale(0)')};
  transition: transform 0.2s ease-in-out 0.1s;
  width: 100vw;
  z-index: 100;
  @media only screen and (min-width: 1200px) {
    background: none;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    max-width: 1100px;
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
    <h1>crêperie contemporaine - Paris</h1>
  </Logo>
);

const Menu = props => {
  return (
    <Header bg={props.bg}>
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
        </Link>
        <Link href="/click-n-collect" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 4}>
            Click & Collect
          </Anchor>
        </Link>
        <Link href="/contact" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 6}>
            Contact
          </Anchor>
        </Link>
        <Close onClick={props.hideMenu} size={70} />
      </FlexDiv>
    </Header>
  );
};

export default Menu;
