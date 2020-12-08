import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  @media only screen and (min-width: 1200px) {
    background: linear-gradient(hsla(0deg, 0%, 0%, 0.6), hsla(0deg, 0%, 0%, 0.6)), url('/images/background/header-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const Logo = styled.div`
  padding: 20px 0;
  width: 150px;
  @media only screen and (min-width: 1200px) {
    margin-bottom: 40px;
    width: auto;
  }
`;

const Icon = styled.div`
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

const FlexDiv = styled.div`
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.6), hsla(0deg, 0%, 0%, 0.6)), url('/images/background/header-bg.jpg');
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
  transform: ${props => props.isClicked ? 'scale(1)' : 'scale(0)'};
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
    & a {
      border-bottom: 2px solid transparent;
      color: white;
      margin: 20px 0;
      padding: 7px 0;
      transition: border-bottom 0.2s ease-in-out;
      &:hover {
        border-bottom: 2px solid white;
      }
    }
  }
`;

const Menu = () => {

  const [isClicked, setIsClicked] = useState(false);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  }

  const hideMenu = () => {
    setIsClicked(false);
  }

  return (
    <Header>
      <Logo>
        <Link href="/">
          <a>
            <Image
              src="/images/placeholder.png"
              alt=""
              height={480}
              width={600}
            />
          </a>
        </Link>
      </Logo>
      <Icon onClick={toggleMenu}>
        <Image
          src="/images/placeholder.png"
          alt=""
          height={35}
          width={35}
        />
      </Icon>
      <FlexDiv isClicked={isClicked}>
        <Link href="/">
          <a onClick={hideMenu}>Accueil</a>
        </Link>
        <Link href="/">
          <a onClick={hideMenu}>La Carte</a>
        </Link>
        <Link href="/">
          <a onClick={hideMenu}>Réservez une table</a>
        </Link>
        <Link href="/">
          <a onClick={hideMenu}>Click & Collect</a>
        </Link>
        <Link href="/">
          <a onClick={hideMenu}>La Cuisine</a>
        </Link>
        <Link href="/">
          <a onClick={hideMenu}>Contact</a>
        </Link>
        <Icon onClick={hideMenu}>
          <Image
            src="/images/placeholder.png"
            alt=""
            height={35}
            width={35}
          />
          <p>Fermer</p>
        </Icon>
      </FlexDiv>
    </Header>
  );
};

export default Menu;
