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
        onClick={() => props.handleRestaurantSelection(1)}
      >
        <div>Paris 01</div>
      </Restaurant>
      <Restaurant
        bgUrl="/images/restaurant/upstairs.jpeg"
        onClick={() => props.handleRestaurantSelection(2)}
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
