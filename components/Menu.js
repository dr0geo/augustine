import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  align-items: center;
  background: linear-gradient(hsla(0deg, 0%, 0%, 0.6), hsla(0deg, 0%, 0%, 0.6)), url('/images/background/header-bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  @media only screen and (min-width: 1200px) {
    flex-direction: column-reverse;
    justify-content: center;
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
    font-family: 'Dancing-Script', sans-serif;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 40px;
    width: auto;
    & > h1 {
      font-size: 1.8rem;
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

const Menu = props => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  const hideMenu = () => {
    setIsClicked(false);
  };

  return (
    <Header>
      <Logo>
        <Link href="/">
          <a>
            <Image
              src="/images/logo/logo.png"
              alt=""
              height={300}
              width={450}
            />
          </a>
        </Link>
        <h1>crêperie contemporaine - Paris</h1>
      </Logo>
      <Icon onClick={toggleMenu}>
        <Image src="/images/icons/menu.webp" alt="" height={50} width={50} />
      </Icon>
      <FlexDiv isClicked={isClicked}>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 1}>
            Accueil
          </Anchor>
        </Link>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 2}>
            La Carte
          </Anchor>
        </Link>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 3}>
            Réservez une table
          </Anchor>
        </Link>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 4}>
            Click & Collect
          </Anchor>
        </Link>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 5}>
            La Cuisine
          </Anchor>
        </Link>
        <Link href="/" passHref>
          <Anchor onClick={hideMenu} isSelected={props.isSelected === 6}>
            Contact
          </Anchor>
        </Link>
        <Icon onClick={hideMenu}>
          <Image src="/images/icons/close.png" alt="" height={35} width={35} />
        </Icon>
      </FlexDiv>
    </Header>
  );
};

export default Menu;
