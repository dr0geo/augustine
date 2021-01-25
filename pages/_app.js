import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-display: swap;
    font-family: 'Raleway';
    font-weight: 400;
    src: url('/fonts/raleway/Raleway-Regular.woff2') format('woff2');
  }
  
  @font-face {
    font-display: swap;
    font-family: 'Dancing-Script';
    font-weight: 400;
    src: url('/fonts/dancing-script/DancingScript-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-display: swap;
    font-family: 'Raleway';
    font-weight: 600;
    src: url('/fonts/raleway/Raleway-SemiBold.woff2') format('woff2');
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Raleway', Tahoma, serif;
    margin: 0;
    overflow: ${props => props.isClicked && 'hidden'};
    overflow-x: hidden;
    padding: 0;
  }

  h1 {
    color: #012f6a;
    font-family: 'Dancing-Script', Georgia, serif;
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
    font-size: 1.6rem;
    font-weight: 600;
    margin: 20px auto;
    text-align: center;
    & > .cursive {
      color: #012f6a;
      font-family: 'Dancing-Script', Georgia, serif;
      font-size: 1.6rem;
    }
    & > .white {
      color: white;
    }
    @media only screen and (min-width: 1200px) {
      font-size: 2rem;
      & > .cursive {
        font-size: 2rem;
      }
    }
  }

  h3 {
    font-weight: 600;
    text-align: center;
  }

  p {
    line-height: 1.5;
    max-width: 1200px;
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  strong {
    font-weight: 600;
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
