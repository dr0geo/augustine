import { useState } from 'react';
import styled from 'styled-components';

import firebase from '@/utils/firebase';
import Spinner from '@/elements/Spinner';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  & > h2 {
    margin-top: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  max-width: 280px;
  & > input {
    border: 2px solid #e3e9ef;
    border-radius: 10px;
    color: #012f6a;
    margin: 10px auto;
    padding: 10px;
    width: 240px;
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

const ErrMessage = styled.div`
  color: red;
`;

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch {
      setErrorMessage('Mauvais nom d\'utilisateur ou mot de passe');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <h2><em>Espace Administrateur - Crêperie Augustine</em></h2>
      <Form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="E-mail" 
          required 
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </Form>
      {errorMessage !== '' && <ErrMessage>{errorMessage}</ErrMessage>}
      {isLoading && <Spinner />}
    </Container>
  );
}

export default LoginForm;
