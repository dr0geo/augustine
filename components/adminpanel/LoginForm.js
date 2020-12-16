import styled from 'styled-components';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
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

const LoginForm = () => (
  <Container>
    <h2><em>Espace Administrateur - Crêperie Augustine</em></h2>
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
);

export default LoginForm;
