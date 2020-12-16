import styled from 'styled-components';
import Link from 'next/link';

import { Section, FlexDiv } from '@/elements/Divs';
import { RestaurantCard } from '@/elements/Cards';
import { BlackButton } from '@/elements/Buttons';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-regular';

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
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
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
`;

const PreviousButton = styled(BlackButton)`
  border: 1px solid white;
  color: #012f6a;
  display: flex;
  font-weight: 400;
  justify-content: space-around;
  margin: 0 20px 40px 20px;
  max-width: 130px;
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
  & > div {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15px;
  }
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
`;

export const DateChoice = props => (
  <Section bgColor="#e3e9ef">
    <PreviousButton onClick={props.goToPreviousStep}>
      <LeftArrow size={20} /> Retour
    </PreviousButton>
    <WhiteDiv>
      <LeftArrow size={20} onClick={props.handleDateDecrease} />
      <FlexPar>{props.dateSentence}</FlexPar>
      <RightArrow size={20} onClick={props.handleDateIncrease} />
    </WhiteDiv>
    <WhiteDiv>
      <LeftArrow size={20} onClick={props.handlePeopleDecrease} />
      <FlexPar>
        {props.people} {props.people === 1 ? 'personne' : 'personnes'}
      </FlexPar>
      <RightArrow size={20} onClick={props.handlePeopleIncrease} />
    </WhiteDiv>
    <WhiteDiv>
      <FlexPar>
        <p>Réservations disponibles</p>
        <div>
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
        </div>
      </FlexPar>
    </WhiteDiv>
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
    <PreviousButton onClick={props.goToPreviousStep}>
      <LeftArrow size={20} /> Retour
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
          En validant ma réservation, j'accepte les conditions d'utilisation et
          la politique de confidentialité.
        </p>
        <ValidateButton type="submit">Valider</ValidateButton>
      </form>
    </Container>
  </Section>
);

// Booking successfully submitted:
const SuccessContainer = styled.div`
  background-color: white;
  margin: auto;
  padding: 20px;
  width: 95%;
  & > p {
    color: #012f6a;
    line-height: 1.5rem;
    padding: 0;
    & > a {
      color: #012f6a;
      border-bottom: 1px solid #012f6a;
    }
    & > em {
      font-weight: 600; 
    }
  }
`;

export const Success = props => (
  <Section bgColor="#e3e9ef">
    <SuccessContainer>
      <p>
        Nous vous remercions pour votre réservation. Celle-ci a bien été
        enregistrée avec la référence <em>{props.bookingConfirmation}</em> et nous sommes
        impatients de vous recevoir dans notre restaurant !<br />
        Vous pouvez maintenant revenir à la <Link href="/"><a title="Cliquez pour revenir à la page d'accueil">page d'accueil</a></Link>.
      </p>
    </SuccessContainer>
  </Section>
);
