import { useState } from 'react';
import styled from 'styled-components';

import Spinner from '../elements/Spinner';

const Container = styled.section`
  background-color: #e3e9ef;
  margin-bottom: 0;
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  padding: 30px 10px;
  & > input {
    border: 1px solid gray;
    border-radius: 5px;
    color: #012f6a;
    max-width: 500px;
    padding: 10px;
    transition: border 0.2s ease-in-out;
    width: 90%;
    & + input {
      margin-top: 20px;
    }
    &:focus {
      border: 1px solid #012f6a;
    }
    &::placeholder {
      color: #012f6a;
      font-family: 'Raleway', sans-serif;
    }
  }
  & > textarea {
    border: 1px solid gray;
    border-radius: 5px;
    color: #012f6a;
    font-family: 'Raleway', sans-serif;
    font-size: 0.9rem;
    height: 300px;
    margin: 20px auto;
    max-width: 500px;
    padding: 10px;
    resize: none;
    transition: border 0.2s ease-in-out;
    width: 90%;
    &:focus {
      border: 1px solid #012f6a;
    }
    &::placeholder {
      color: #012f6a;
      font-family: 'Raleway', sans-serif;
    }
  }
  & > button {
    background-color: #012f6a;
    border: 2px solid #012f6a;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    padding: 10px 20px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        background-color: white;
        color: #012f6a;
      }
    }
  }
`;

const ErrorParag = styled.div`
  color: red;
  font-weight: 600;
  margin: 20px auto;
  text-align: center;
`;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const query = {
      lastName,
      firstName,
      email,
      phoneNumber,
      message
    }

    try {
      const res = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        type: 'contact'
      })
    })
    
    if (res.status === 400) {
      throw new Error();
    }

    } catch {
      setErrorMessage('Une erreur s\'est produite, veuillez réessayer... Si le problème persiste, n\'hésitez pas à nous contacter par téléphone !');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom *"
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Prénom *"
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail *"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          name="tel"
          placeholder="Téléphone"
          minLength="10"
          maxLength="13"
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <textarea
          placeholder="Votre demande... *"
          minLength="10"
          onChange={e => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Envoyer la demande</button>
        {errorMessage && <ErrorParag>{errorMessage}</ErrorParag>}
      </Form>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default ContactForm;
