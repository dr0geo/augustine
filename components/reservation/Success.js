import styled from 'styled-components';
import Link from 'next/link';
import { CheckCircleFill } from '@styled-icons/octicons';

const SuccessContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 50px auto;
  max-width: 600px;
  padding: 20px;
  width: 95%;
  & > p {
    color: #012f6a;
    line-height: 1.5;
    margin-top: 30px;
    max-width: 500px;
    & > a {
      color: #012f6a;
      border-bottom: 1px solid #012f6a;
    }
    & > em {
      font-weight: 600;
    }
  }
  @media only screen and (min-width: 760px) {
    flex-direction: row;
    & > p {
      margin-top: 0;
    }
  }
`;

const Success = props => (
  <SuccessContainer>
    <CheckCircleFill size={80} color="#012f6a" />
    <p>
      Nous vous remercions pour votre réservation. Celle-ci a bien été
      enregistrée avec la référence <em>{props.bookingConfirmation}</em> et
      nous sommes impatients de vous recevoir dans notre restaurant !<br />
      Vous pouvez maintenant revenir à la <Link href="/"><a title="Cliquez pour revenir à la page d'accueil">page d'accueil</a></Link>.
    </p>
  </SuccessContainer>
);

export default Success;
