import styled from 'styled-components';

import { LArrow, FlexPar, ReducParag } from '@/components/reservation/DateChoice';
import { Button } from '@/elements/Buttons';

const PrevButtonContainer = styled.div`
  margin: 0 auto 40px auto;
  max-width: 500px;
`;

const PreviousButton = styled.button`
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  color: #012f6a;
  display: flex;
  font-weight: 400;
  justify-content: space-between;
  padding: 10px;
  width: 100px;
  @media only screen and (min-width: 1200px) {
    transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out, color 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        background-color: #012f6a;
        border: 1px solid #012f6a;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 500px;
  padding: 20px;
  & .recap {
    font-size: 0.9rem;
    margin: 20px auto 0 auto;
  }
  & input {
    border: 2px solid #e3e9ef;
    border-radius: 5px;
    color: #012f6a;
    margin: 10px auto;
    padding: 10px;
    transition: border 0.2s ease-in-out;
    width: 100%;
    &::placeholder {
      color: #012f6a;
    }
    &:focus {
      border: 2px solid #012f6a;
    }
  }
  & .privacy {
    font-size: 0.9rem;
  }
`;

const ErrorParag = styled.p`
  color: red;
  font-weight: 600;
  margin-top: 20px;
`;

const PersonalInfo = props => (
  <>
    <PrevButtonContainer>
      <PreviousButton onClick={props.goToPreviousStep}>
        <LArrow size={20} /> Retour
      </PreviousButton>
    </PrevButtonContainer>
    <Container>
      <FlexPar>
        Confirmez votre réservation chez Augustine Paris 1er
      </FlexPar>
      <p className="recap">
        Pour {props.guestsNumber}{' '}
        {props.guestsNumber === 1 ? 'personne' : 'personnes'}, le{' '}
        {props.dateSentence.toLowerCase()} à {props.time}
      </p>

      {/* Check if discount applies */}
      {props.discount && <ReducParag>20% de réduction à cette date !</ReducParag>}

      <form>
        <input
          type="text"
          placeholder="Prénom *"
          name="firstName"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="text"
          placeholder="Nom *"
          name="lastName"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="e-mail"
          placeholder="E-mail *"
          name="email"
          required
          onChange={props.handleInputValues}
        />
        <input
          type="tel"
          placeholder="Téléphone *"
          name="phoneNumber"
          minLength="10"
          maxLength="13"
          required
          onChange={props.handleInputValues}
        />
        <p className="privacy">
          En validant ma réservation, j'accepte les conditions d'utilisation et
          la politique de confidentialité.
        </p>
        <Button
          onClick={props.handleSubmit}
          bgColor="#012f6a"
          borderColor="#012f6a"
          color="#fff"
          isCursive={true}
        >
          Valider
        </Button>

        {/* If error during booking submission */}
        {props.errorInBooking && (
          <ErrorParag>{props.errorInBooking}</ErrorParag>
        )}
      </form>
    </Container>
  </>
);

export default PersonalInfo;
