import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  section {
    background: linear-gradient(hsla(0deg, 0%, 0%, 0.7), hsla(0deg, 0%, 0%, 0.7)), url('/images/crepe.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    & > div {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      & > div {
        background: url('/images/logo.webp');
        background-position: center;
        background-size: contain;
        border-radius: 5px;
        height: 200px;
        margin-bottom: 50px;
        width: 300px;
        @media only screen and (min-width: 1200px) {
          height: 400px;
          width: 550px;
        }
      }
      & > p {
        color: white;
        font-family: Helvetica, sans-serif;
        line-height: 1.5em;
        max-width: 1200px;
        padding: 0 20px;
        text-align: center;
      }
    }
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
