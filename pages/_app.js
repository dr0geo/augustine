import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-display: block;
    font-family: 'Raleway';
    font-weight: 400;
    src: 
      url('/fonts/raleway/Raleway-Regular.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-Regular.woff') format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Raleway';
    font-weight: 600;
    src: 
      url('/fonts/raleway/Raleway-SemiBold.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-SemiBold.woff') format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Raleway';
    font-weight: 700;
    src: 
      url('/fonts/raleway/Raleway-Bold.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-Bold.woff') format('woff');
  }

  @font-face {
    font-display: block;
    font-family: 'Dancing-Script';
    font-weight: 400;
    src: 
      url('/fonts/dancing-script/DancingScript-SemiBold.woff2') format('woff2'),
      url('/fonts/dancing-script/DancingScript-SemiBold.woff') format('woff');
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Raleway', serif;
    margin: 0;
    overflow: ${props => props.isClicked && 'hidden'};
    padding: 0;
  }

  a {
    color: white;
    text-decoration: none;
    &:visited {
      color: white;
    }
  }

  h1 {
    color: #012f6a;
    font-family: 'Dancing-Script', sans serif;
    font-size: 2.6rem;
    text-align: center;
    @media only screen and (min-width: 1200px) {
      align-items: center;
      display: flex;
      font-size: 3.8rem;
      height: 400px;
      margin-top: 0;
    }
  }

  h2 {
    color: #ac6c14;
    text-align: center;
    & > em {
      color: #012f6a;
      font-family: 'Dancing-Script', sans-serif;
      font-size: 1.6rem;
    }
    & > strong {
      color: white;
      font-family: 'Dancing-Script', sans-serif;
      font-size: 1.6rem;
    }
    @media only screen and (min-width: 1200px) {
      font-size: 2rem;
      & > em, & > strong {
        font-size: 2rem;
      }
    }
  }

  h3 {
    font-weight: 600;
    text-align: center;
  }

  p {
    margin: auto;
    max-width: 1200px;
    padding: 0 20px;
    text-align: center;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    list-style-position: outside;
  }

  button {
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
  }
`;

const App = ({ Component, pageProps }) => {
  // Manage header state for each page:
  const [isClicked, setIsClicked] = useState(false);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  const hideMenu = () => {
    setIsClicked(false);
  };

  return (
    <>
      <GlobalStyle isClicked={isClicked} />
      <Component
        {...pageProps} 
        isClicked={isClicked}
        toggleMenu={toggleMenu}
        hideMenu={hideMenu}
      />
    </>
  );
};

export default App;
