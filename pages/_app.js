import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';

import { ScrollToTop } from '@/elements/Buttons';

const GlobalStyle = createGlobalStyle`
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
    font-weight: 600;
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
      <ScrollToTop
        size={50} 
        onClick={() => window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })}
      />
    </>
  );
};

export default App;
