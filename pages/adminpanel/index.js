import styled from 'styled-components';
import Head from 'next/head';
import firebase from '@/utils/firebase';

import Reservations from '@/components/adminpanel/reservations';

const Container = styled.section`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 280px;
  & > input {
    border: 2px solid #e3e9ef;
    border-radius: 10px;
    color: #012f6a;
    margin: 10px auto;
    padding: 10px;
  }
  & > button {
    background-color: #012f6a;
    border: none;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
    padding: 10px;
    @media only screen and (min-width: 600px) {
      transition: opacity 0.2s ease-in-out;
      @media (any-hover: hover) {
        &:hover {
          cursor: pointer;
          opacity: 0.85;
        }
      }
    }
  }
  @media only screen and (min-width: 600px) {
    max-width: 400px;
  }
`;

const AdminPanel = ({ isLoggedIn }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!isLoggedIn && (
        <Container>
          <Form action="/api/login" method="POST">
            <input type="email" name="email" placeholder="E-mail" required />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
            />
            <button type="submit">Se connecter</button>
          </Form>
        </Container>
      )}
      {isLoggedIn && (
        <>
          <h2>Bienvenue sur le panneau administrateur !</h2>
          <Reservations />
        </>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const isLoggedIn = firebase.auth().currentUser !== null;

  return {
    props: { isLoggedIn }
  };
};

export default AdminPanel;
