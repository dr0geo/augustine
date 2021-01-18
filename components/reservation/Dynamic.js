import styled from 'styled-components';
import Link from 'next/link';

import { Section } from '@/elements/Divs';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-regular';
import { CheckCircleFill } from '@styled-icons/octicons';

// Date and time selection:
const WhiteDiv = styled.div`
  align-items: center;
  background-color: white;
  color: #012f6a;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  max-width: 300px;
  padding: 10px;
  @media only screen and (min-width: 600px) {
    max-width: 450px;
  }
`;

const LimitedWidthDiv = styled.div`
  margin: auto;
  max-width: 300px;
  @media only screen and (min-width: 600px) {
    max-width: 400px;
  }
  @media only screen and (min-width: 760px) and (orientation: portrait) {
    margin: 100px auto;
  }
`;

const PreviousButton = styled.button`
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  color: #012f6a;
  display: flex;
  font-weight: 400;
  justify-content: space-between;
  margin: 0 0 40px 0;
  width: 100px;
  padding: 10px;
  @media only screen and (min-width: 1200px) {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        background-color: #012f6a;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const LArrow = styled(LeftArrow)`
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const RArrow = styled(RightArrow)`
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const FlexPar = styled.div`
  align-items: center;
  color: #012f6a;
  display: flex;
  flex-direction: column;
  font-family: 'Dancing-Script', Georgia, serif;
  font-size: 1.2rem;
  justify-content: space-around;
  margin: auto;
  padding: 0;
`;

const TimeList = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
  & > select {
    appearance: none;
    background-color: white;
    border: 2px solid #e3e9ef;
    border-radius: 5px;
    color: #012f6a;
    font-family: 'Dancing-Script', Georgia, serif;
    font-size: 1.1rem;
    padding: 5px 10px;
    &:focus {
      border: 2px solid #012f6a;
    }
    @media (any-hover: hover) {
      cursor: pointer;
    }
  }
  & > p {
    padding: 0 3px;
  }
`;

export const DateChoice = props => (
  <Section bgColor="#e3e9ef">
    <LimitedWidthDiv>
      <WhiteDiv>
        <LArrow size={20} onClick={props.handleDateDecrease} />
        <FlexPar>{props.dateSentence}</FlexPar>
        <RArrow size={20} onClick={props.handleDateIncrease} />
      </WhiteDiv>
      <WhiteDiv>
        <LArrow size={20} onClick={props.handlePeopleDecrease} />
        <FlexPar>
          {props.people} {props.people === 1 ? 'personne' : 'personnes'}
        </FlexPar>
        <RArrow size={20} onClick={props.handlePeopleIncrease} />
      </WhiteDiv>
      <WhiteDiv>
        <FlexPar>
          <p>Heure de la réservation</p>
          <TimeList>
            <select onChange={e => props.handleHoursSelection(e)} defaultValue={props.hours}>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
            </select>
            <p>h</p>
            <select onChange={e => props.handleMinutesSelection(e)}>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              {props.hours !== '21' && <option value="45">45</option>}
            </select>
          </TimeList>
        </FlexPar>
      </WhiteDiv>
      <ValidateButton onClick={props.handleNextStep}>Valider</ValidateButton>
    </LimitedWidthDiv>
  </Section>
);

// Personal information:
const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 300px;
  padding: 20px;
  & > p {
    font-size: 0.9rem;
    margin: 20px auto;
    padding: 0;
  }
  & > form {
    & > input {
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
    & > p {
      font-size: 0.9rem;
      padding: 0 0;
    }
  }
  @media only screen and (min-width: 600px) {
    max-width: 450px;
  }
`;

const ValidateButton = styled.button`
  background-color: #012f6a;
  border: 2px solid #012f6a;
  border-radius: 5px;
  color: white;
  display: block;
  font-family: 'Dancing-Script', Georgia, serif;
  font-size: 1.3rem;
  margin: 20px auto 0 auto;
  padding: 8px 10px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  width: 130px;
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        background-color: white;
        color: #012f6a;
        cursor: pointer;
      }
    }
  }
`;

const ErrorParag = styled.p`
  color: red;
  font-weight: 600;
  margin-top: 20px;
`;

export const Personal = props => (
  <Section bgColor="#e3e9ef">
    <LimitedWidthDiv>
      <PreviousButton onClick={props.goToPreviousStep}>
        <LArrow size={20} /> Retour
      </PreviousButton>
      <Container>
        <FlexPar>
          <p>
            Confirmez votre réservation chez Augustine Paris 1er
          </p>
        </FlexPar>
        <p>
          Pour {props.people} {props.people === 1 ? 'personne' : 'personnes'}, le {props.dateSentence.toLowerCase()} à {props.time}
        </p>
        <form onSubmit={props.handleSubmit}>
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
          <p>
            En validant ma réservation, j'accepte les conditions d'utilisation
            et la politique de confidentialité.
          </p>
          <ValidateButton type="submit">Valider</ValidateButton>
          {props.errorInBooking !== '' && <ErrorParag>{props.errorInBooking}</ErrorParag>}
        </form>
      </Container>
    </LimitedWidthDiv>
  </Section>
);

// Booking successfully submitted:
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
    line-height: 1.5rem;
    max-width: 500px;
    padding: 0;
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
  }
  @media only screen and (min-width: 760px) and (orientation: portrait) {
    margin: 200px auto;
  }
`;

export const Success = props => (
  <Section bgColor="#e3e9ef">
    <SuccessContainer>
      <CheckCircleFill size={80} color="#012f6a" />
      <p>
        Nous vous remercions pour votre réservation. Celle-ci a bien été
        enregistrée avec la référence <em>{props.bookingConfirmation}</em> et
        nous sommes impatients de vous recevoir dans notre restaurant !<br />
        Vous pouvez maintenant revenir à la <Link href="/"><a title="Cliquez pour revenir à la page d'accueil">page d'accueil</a></Link>.
      </p>
    </SuccessContainer>
  </Section>
);
