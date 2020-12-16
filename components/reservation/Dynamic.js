import styled from 'styled-components';
import { useState } from 'react';

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
        onClick={props.goToNextStep}
      >
        <div>Paris 01</div>
      </Restaurant>
      <Restaurant
        bgUrl="/images/restaurant/upstairs.jpeg"
        onClick={props.goToNextStep}
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
  justify-content: space-between;
  margin: 0 20px 40px 20px;
  max-width: 150px;
`;

const FlexPar = styled.p`
  align-items: center;
  color: #012f6a;
  display: flex;
  font-family: 'Dancing-Script', sans-serif;
  font-size: 1.2rem;
  justify-content: space-between;
  padding: 0;
`;

export const DateChoice = props => {
  const todayDate = new Date(Date.now());
  const weekDays = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ];
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ];

  const [date, setDate] = useState(todayDate);
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState('');

  return (
    <Section bgColor="#e3e9ef">
      <PreviousButton onClick={props.goToPreviousStep}>
        <LeftArrow size={20} /> Précédent
      </PreviousButton>
      <WhiteDiv>
        <LeftArrow 
          size={20} 
          onClick={() => {
            date > todayDate && setDate(new Date(date.setDate(date.getDate() - 1)));
          }}
        />
        <FlexPar>
          {`${weekDays[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()}`}
        </FlexPar>
        <RightArrow 
          size={20} 
          onClick={() => {
            setDate(new Date(date.setDate(date.getDate() + 1)));
          }}
          />
      </WhiteDiv>
      <WhiteDiv>
        <LeftArrow
          size={20}
          onClick={() => {
            people > 1 && setPeople(people - 1);
          }}
        />
        <FlexPar>
          {people} {people === 1 ? 'personne' : 'personnes'}
        </FlexPar>
        <RightArrow
          size={20}
          onClick={() => {
            people < 8 && setPeople(people + 1);
          }}
        />
      </WhiteDiv>
      <WhiteDiv>
        <FlexPar>Réservations disponibles</FlexPar>
      </WhiteDiv>
    </Section>
  );
};
