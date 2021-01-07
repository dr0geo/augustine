import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import { Basket2 } from '@styled-icons/bootstrap';

const ResultDiv = styled.div`
  align-items: center;
  display: grid;
  gap: 25px;
  grid-template-rows: repeat(4, auto);
  justify-items: center;
  padding: 25px 0;
  & + & {
    border-top: 1px solid lightgray;
  }
  & > div > form {
    display: flex;
    justify-content: space-around;
    margin: auto;
    width: 220px;
    & > div {
      align-items: center;
      display: flex;
      & > input {
        margin: 0 10px 0 0;
        transform: scale(1.4);
      }
    }
  }
  & > div > p {
    padding: 0 0;
  }
  & > div > p + form {
    margin-top: 20px;
  }
  & > div:last-of-type {
    background-color: #012f6a;
    border-radius: 5px;
    padding: 5px;
  }
  @media only screen and (min-width: 1200px) {
    grid-auto-flow: column;
    grid-template-columns: 250px 2fr 0.5fr;
    grid-template-rows: repeat(2, auto);
    & > div > form > div > input {
      transform: scale(1);
    }
    & > div:first-of-type, div:last-of-type {
      grid-row: 1 / 3;
    }
    & > div:last-of-type {
      transform: scale(0.75);
    }
    @media (any-hover: hover) {
      & > div:last-of-type:hover {
        cursor: pointer;
        transform: scale(0.85);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
`;

const OrderResultDiv = props => {
  // State to manage choice between 'Crêpe' and 'Gaufre' on a per item basis:
  const [typeOfFood, setTypeOfFood] = useState('Crêpe');
  let foodName;

  if (props.isSelected === 3) {
    foodName = `${typeOfFood} ${props.food.name}`;
  } else {
    foodName = props.food.name;
  }

  return (
    <ResultDiv>
      <div>
        <Image
          src="/images/icons/food-placeholder.png"
          alt=""
          height={200}
          width={200}
        />
      </div>
      <div>
        <h3>{foodName}</h3>
        {props.food.description && <p>{props.food.description}</p>}
        {props.isSelected === 3 && (
          <form>
            <div>
              <input
                id={`crepe-${props.food.name}`}
                type="radio"
                name={`type-${props.food.name}`}
                defaultChecked={true}
                onChange={() => setTypeOfFood('Crêpe')}
              />
              <label htmlFor={`crepe-${props.food.name}`}>Crêpe</label>
            </div>
            <div>
              <input
                id={`gaufre-${props.food.name}`}
                type="radio"
                name={`type-${props.food.name}`}
                onChange={() => setTypeOfFood('Gaufre')}
              />
              <label htmlFor={`gaufre-${props.food.name}`}>Gaufre</label>
            </div>
          </form>
        )}
      </div>
      <div>
        <p>{props.food.price.toFixed(2)}€</p>
      </div>
      <div>
        <Basket2
          size={40}
          color="white"
          onClick={() => props.addToBasket(props.food, foodName)}
        />
      </div>
    </ResultDiv>
  );
};

export default OrderResultDiv;
