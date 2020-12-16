import styled from 'styled-components';
import Link from 'next/link';

import { Section, FlexDiv } from '@/elements/Divs';
import { RestaurantCard } from '@/elements/Cards';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-regular';
import { CheckCircleFill } from '@styled-icons/octicons';

// Restaurant selection:
const Sec = styled(Section)`
  padding-top: 0;
`;

const Div = styled(FlexDiv)`
  @media only screen and (min-width: 1200px) {
    justify-content: center;
  }
`;

const Restaurant = styled(RestaurantCard)`
  @media only screen and (min-width: 1200px) {
    transition: opacity 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        opacity: 0.85;
      }
    }
  }
`;

export const RestaurantChoice = props => (
  <Sec bgColor="white">
    <Div>
      <Restaurant
        bgUrl="/images/restaurant/stairs.jpeg"
        onClick={() => props.handleRestaurantSelection(1)}
      >
        <div>Paris 01</div>
      </Restaurant>
      <Restaurant
        bgUrl="/images/restaurant/upstairs.jpeg"
        onClick={() => props.handleRestaurantSelection(8)}
      >
        <div>Paris 08</div>
      </Restaurant>
    </Div>
  </Sec>
);

// Date and time selection:
const WhiteDiv = styled.div`
  align-items: center;
  background-color: white;
  color: #012f6a;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  max-width: 280px;
  padding: 10px;
  @media only screen and (min-width: 600px) {
    max-width: 450px;
  }
`;

const LimitedWidthDiv = styled.div`
  margin: auto;
  max-width: 280px;
  @media only screen and (min-width: 600px) {
    max-width: 450px;
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
  font-family: 'Dancing-Script', sans-serif;
  font-size: 1.2rem;
  justify-content: space-around;
  margin: auto;
  padding: 0;
`;

const TimeButton = styled.option`
  background-color: #012f6a;
  border: 1px solid #012f6a;
  color: white;
  font-family: 'Dancing-Script', sans-serif;
  margin: 10px;
  padding: 8px 0;
  text-align: center;
  width: 65px;
  @media only screen and (min-width: 1200px) {
    transition: opacity 0.2s ease-in-out;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        opacity: 0.85;
      }
    }
  }
`;

export const DateChoice = props => (
  <Section bgColor="#e3e9ef">
    <LimitedWidthDiv>
      <PreviousButton onClick={props.goToPreviousStep}>
        <LArrow size={20} /> Retour
      </PreviousButton>
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
          <p>Réservations disponibles</p>
          <datalist>
            <TimeButton value="19:00" onClick={props.handleTimeSelection}>
              19:00
            </TimeButton>
            <TimeButton value="19:45" onClick={props.handleTimeSelection}>
              19:45
            </TimeButton>
            <TimeButton value="20:15" onClick={props.handleTimeSelection}>
              20:15
            </TimeButton>
            <TimeButton value="20:45" onClick={props.handleTimeSelection}>
              20:45
            </TimeButton>
            <TimeButton value="21:30" onClick={props.handleTimeSelection}>
              21:30
            </TimeButton>
          </datalist>
        </FlexPar>
      </WhiteDiv>
    </LimitedWidthDiv>
  </Section>
);

// Personal information:
const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 280px;
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
      width: 240px;
      &::placeholder {
        color: #012f6a;
      }
      &:focus {
        border: 2px solid #012f6a;
      }
    }
    & > p {
      font-size: 0.9rem;
    }
  }
  @media only screen and (min-width: 600px) {
    max-width: 450px;
    & > form > input {
      width: 410px;
    }
  }
`;

const ValidateButton = styled.button`
  background-color: #012f6a;
  border: none;
  border-radius: 5px;
  color: white;
  display: block;
  font-family: 'Dancing-Script', sans-serif;
  font-size: 1.3rem;
  margin: 20px auto 0 auto;
  padding: 10px;
  width: 130px;
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
            Confirmez votre réservation chez Augustine Paris{' '}
            {props.restaurant.toString().padStart(2, '0')}
          </p>
        </FlexPar>
        <p>
          Pour {props.people} personnes, le {props.dateSentence} à {props.time}
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
  margin: auto;
  max-width: 700px;
  padding: 20px;
  width: 95%;
  & > p {
    color: #012f6a;
    line-height: 1.5rem;
    margin-top: 20px;
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
`;

export const Success = props => (
  <Section bgColor="#e3e9ef">
    <SuccessContainer>
      <CheckCircleFill size={80} color="green" />
      <p>
        Nous vous remercions pour votre réservation. Celle-ci a bien été
        enregistrée avec la référence <em>{props.bookingConfirmation}</em> et
        nous sommes impatients de vous recevoir dans notre restaurant !<br />
        Vous pouvez maintenant revenir à la{' '}
        <Link href="/">
          <a title="Cliquez pour revenir à la page d'accueil">page d'accueil</a>
        </Link>
        .
      </p>
    </SuccessContainer>
  </Section>
);
