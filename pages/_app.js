import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    font-weight: 400;
    src: 
      url('/fonts/raleway/Raleway-Regular.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-weight: 600;
    src: 
      url('/fonts/raleway/Raleway-SemiBold.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-SemiBold.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-weight: 700;
    src: 
      url('/fonts/raleway/Raleway-Bold.woff2') format('woff2'),
      url('/fonts/raleway/Raleway-Bold.woff') format('woff');
  }

  @font-face {
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
    font-family: 'Raleway', sans-serif;
    margin: 0;
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
    font-size: 1.3rem;
    text-align: center;
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
    text-align: center;
  }

  p {
    padding: 0 20px;
    text-align: center;
  }

  li {
    list-style-type: none;
  }
`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
