import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    font-weight: 400;
    src: 
      url('/fonts/Raleway-Regular.woff2') format('woff2'),
      url('/fonts/Raleway-Regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-weight: 600;
    src: 
      url('/fonts/Raleway-SemiBold.woff2') format('woff2'),
      url('/fonts/Raleway-SemiBold.woff') format('woff');
  }

  @font-face {
    font-family: 'Raleway';
    font-weight: 700;
    src: 
      url('/fonts/Raleway-Bold.woff2') format('woff2'),
      url('/fonts/Raleway-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'Dancing-Script';
    font-weight: 600;
    src: 
      url('/fonts/DancingScript-SemiBold.woff2') format('woff2'),
      url('/fonts/DancingScript-SemiBold.woff') format('woff');
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    &:visited {
      color: white;
    }
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
