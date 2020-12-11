import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  align-items: center;
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.6), hsla(0deg, 0%, 0%, 0.6)),
    url(${props => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 0 40px;
  @media only screen and (min-width: 1200px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    min-height: 550px;
  }
`;

const Logo = styled.div`
  background-color: hsla(0deg, 0%, 100%, 0.5);
  border-radius: 5px;
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

const Icon = styled.div`
  margin-bottom: 20px;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const FlexDiv = styled.div`
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.6), hsla(0deg, 0%, 0%, 0.6)),
    url('/images/background/header-bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
  position: absolute;
  text-align: center;
  transform: ${props => (props.isClicked ? 'scale(1)' : 'scale(0)')};
  transition: transform 0.2s ease-in-out 0.1s;
  width: 100vw;
  z-index: 1;
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
  @media only screen and (min-width: 1200px) {
    border-bottom: ${props => props.isSelected ? '2px solid white' : '2px solid transparent'};
    color: white;
    margin: 20px 0;
    padding: 7px 0;
    transition: border-bottom 0.2s ease-in-out;
    &:hover {
      border-bottom: 2px solid white;
      cursor: pointer;
    }
  }
`;

const logo = (
  <Logo>
    <Link href="/">
      <a>
        <Image src="/images/logo/logo.png" alt="" height={300} width={450} />
      </a>
    </Link>
    <h1>crêperie contemporaine - Paris</h1>
  </Logo>
);

const Menu = props => {
  return (
    <Header bg={props.bg}>
      {props.logo ? logo : <h1>{props.title}</h1>}
      <Icon onClick={props.toggleMenu}>
        <Image src="/images/icons/menud.png" alt="" height={50} width={50} />
      </Icon>
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
        <Link href="/la-cuisine" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 5}>
            La Cuisine
          </Anchor>
        </Link>
        <Link href="/contact" passHref>
          <Anchor onClick={props.hideMenu} isSelected={props.isSelected === 6}>
            Contact
          </Anchor>
        </Link>
        <Icon onClick={props.hideMenu}>
          <Image src="/images/icons/close.png" alt="" height={35} width={35} />
        </Icon>
      </FlexDiv>
    </Header>
  );
};

export default Menu;
