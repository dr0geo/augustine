import styled from 'styled-components';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-regular';

import { Button } from '@/elements/Buttons';

const WhiteField = styled.div`
  align-items: center;
  background-color: white;
  color: #012f6a;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  padding: 10px;
  max-width: 500px;
`;

export const LArrow = styled(LeftArrow)`
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

export const FlexPar = styled.div`
  align-items: center;
  color: #012f6a;
  display: flex;
  flex-direction: column;
  font-family: 'Dancing-Script', Georgia, serif;
  font-size: 1.2rem;
  justify-content: space-around;
  margin: auto;
  padding: 0;
  text-align: center;
`;

const TimeList = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  & > select {
    appearance: none;
    background-color: white;
    border: 2px solid #e3e9ef;
    border-radius: 5px;
    color: #012f6a;
    font-family: 'Dancing-Script', Georgia, serif;
    font-size: 1rem;
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

export const ReducParag = styled.p`
  border: 1px solid #ac6c14;
  color: #ac6c14;
  font-weight: 600;
  margin: 30px auto;
  max-width: 500px;
  padding: 10px;
`;

const DateChoice = props => {

  // Check if there is a discount according to the day of the week:
  const discountDay = ['Dimanche', 'Lundi', 'Mardi'].includes(props.dateSentence.split(' ')[0]);

  if (discountDay) {
    props.applyDiscount();
  } else {
    props.removeDiscount();
  }

  return (
    <>
      <WhiteField>
        <LArrow size={20} onClick={props.handleDateDecrease} />
        <FlexPar>{props.dateSentence}</FlexPar>
        <RArrow size={20} onClick={props.handleDateIncrease} />
      </WhiteField>
      <WhiteField>
        <LArrow size={20} onClick={props.handlePeopleDecrease} />
        <FlexPar>
          {props.guestsNumber}{' '}
          {props.guestsNumber === 1 ? 'personne' : 'personnes'}
        </FlexPar>
        <RArrow size={20} onClick={props.handlePeopleIncrease} />
      </WhiteField>
      <WhiteField>
        <FlexPar>
          <p>Heure de la réservation</p>
          <TimeList>
            <select
              onChange={e => props.handleHoursSelection(e)}
              defaultValue={props.hours}
            >
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
      </WhiteField>

      {/* Check if discount applies */}
      {props.discount && <ReducParag>20% de réduction à cette date !</ReducParag>}

      <Button
        onClick={props.handleNextStep}
        bgColor="#012f6a"
        borderColor="#012f6a"
        color="#fff"
        isCursive={true}
      >
        Continuer
      </Button>
    </>
  );
};

export default DateChoice;
