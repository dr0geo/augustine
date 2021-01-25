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
  /* Separate each result */
  & + & {
    border-top: 1px solid lightgray;
  }
  & > div > h3 {
    margin-bottom: 10px;
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
  & > div > select {
    appearance: none;
    background-color: #e3e9ef;
    border: 1px solid #012f6a;
    border-radius: 5px;
    color: #012f6a;
    display: block;
    margin: 20px auto;
    padding: 10px;
    text-align: center;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    width: 220px;
    @media (any-hover: hover) {
      &:hover {
        background-color: #012f6a;
        color: white;
        cursor: pointer;
      }
    }
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
  }
`;

const Basket = styled.div`
  background-color: #012f6a;
  border-radius: 5px;
  padding: 5px;
  @media only screen and (min-width: 1200px) {
    transform: scale(0.75);
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        transform: scale(0.85);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
`;

const DisabledBasket = styled(Basket)`
  opacity: 0.3;
  @media only screen and (min-width: 1200px) {
    @media (any-hover: hover) {
      &:hover {
        cursor: not-allowed;
        transform: scale(0.75);
      }
    }
  }
  
`;

const OrderResultDiv = props => {
  // State to manage choice between 'Crêpe' and 'Gaufre' on a per item basis:
  const [typeOfFood, setTypeOfFood] = useState('Crêpe');

  // State to manage option according to different foods:
  const [option, setOption] = useState('');

  const handleOptionSelection = e => {
    setOption(e.target.value);
  }

  // Manage food name according to options selected:
  let foodName;

  // For crêpes and gaufres:
  if (props.selectedMainFood === 3) {
    if (option === '') {
      foodName = `${typeOfFood} ${props.food.name.toLowerCase()}`;
    } else {
      foodName = `${typeOfFood} ${option.toLowerCase()}`
    }
  // All other kinds of food:
  } else {
    if (option === '') {
      foodName = props.food.name;
    } else {
      foodName = `${option}`;
    }
  }

  // States to manage different menu options selections:
  const [menuChoiceOne, setMenuChoiceOne] = useState('');
  const [menuChoiceTwo, setMenuChoiceTwo] = useState('');
  const [menuChoiceThree, setMenuChoiceThree] = useState('');

  // Display options in the different menus:
  let menuChoicesArray;

  if (props.food.choice) {
    // Check if there are two or three choices and store them in a fixed order:
    if (props.food.choice.choice3) {
      menuChoicesArray = [
        props.food.choice.choice1, 
        props.food.choice.choice2,
        props.food.choice.choice3
      ];
    } else {
      menuChoicesArray = [
        props.food.choice.choice1, 
        props.food.choice.choice2
      ]
    }

    if (menuChoicesArray.length === 3) {
      // Change foodName only if all three choices are selected:
      if ([menuChoiceOne, menuChoiceTwo, menuChoiceThree].every(choice => choice !== '')) {
        foodName += ` (${menuChoiceOne}, ${typeOfFood} ${menuChoiceTwo}, ${menuChoiceThree})`;
      }
      // Change foodName only if all two choices are selected:
    } else if (menuChoiceOne !== '' && menuChoiceTwo !== '') {
      foodName += ` (${menuChoiceOne}, ${menuChoiceTwo})`;
    }
  }

  const handleMenuSelection = (e, index) => {
    switch (index) {
      case 0:
        setMenuChoiceOne(e.target.value);
        break;
      case 1:
        setMenuChoiceTwo(e.target.value);
        break;
      case 2:
        setMenuChoiceThree(e.target.value);
        break;
    }
  }

  return (
    <ResultDiv>
      {/* First grid item */}
      <div>
        <Image
          src="/images/icons/food-placeholder.webp"
          alt=""
          height={200}
          width={200}
        />
      </div>
      {/* Second grid item */}
      <div>
        <h3>{foodName}</h3>
        {props.food.restrictions && <><p><em>{props.food.restrictions}</em></p><br /></>}
        {/* For drinks, change description to not display alcohol */}
        {props.selectedMainFood !== 5 ? props.food.description && <p>{props.food.description}</p> : <p>{props.food.descriptionCnC}</p>}
        {/* Choose between crêpe and gaufre */}
        {props.selectedMainFood === 3 && (
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
        {/* Choose option */}
        {props.food.options && 
          <select onChange={handleOptionSelection}>
            <option key="initial" value="" defaultValue>Choisissez une option</option>
            {props.food.options.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        }
        {/* Choose menu choices */}
        {props.food.choice &&
          <>
            {menuChoicesArray.map((choice, index) => {
              // Add crêpe or gaufre option for concerned menu choice:
              if (index === menuChoicesArray.length - 2) {
                return (
                  <>
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
                    {/* Display a dropdown list for crêpes and gaufres */}
                    <select key={choice} onChange={e => handleMenuSelection(e, index)}>
                      <option key="initial" value="" defaultValue>Choisissez une option</option>
                      {/* Options groups for crêpes/gaufres long lists */}
                      {choice.length > 14 
                        ? <><optgroup label="Classiques">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(0, 14)}
                      </optgroup>
                      <optgroup label="Gourmandes">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(14)}
                      </optgroup></>
                        
                        : choice.map(option => <option key={option} value={option}>{option}</option>)
                      }
                    </select>
                  </>
                )
                // Galette choice:
              } else if (menuChoicesArray.length === 3 && index === 0) {
                return (
                  <select key={choice} onChange={e => handleMenuSelection(e, index)}>
                    <option key="initial" value="" defaultValue>Choisissez une option</option>
                    {/* Options group for long galettes lists */}
                    {choice.length > 8
                      ? <>
                      <optgroup label="Classiques">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(0, 7)}
                      </optgroup>
                      <optgroup label="Gourmandes">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(7)}
                      </optgroup>
                      </>
                      : choice.map(option => <option key={option} value={option}>{option}</option>)
                    }
                  </select>
                )
              } else {
                // Drink choices:
                return (
                  <select key={choice} onChange={e => handleMenuSelection(e, index)}>
                    <option key="initial" value="" defaultValue>Choisissez une option</option>
                    {/* Options groups for long lists of drinks */}
                    {choice.length > 16
                      ? <>
                      <optgroup label="Eau">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(0, 2)}
                      </optgroup>
                      <optgroup label="Jus">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(2, 6)}
                      </optgroup>
                      <optgroup label="Soda">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(6, 14)}
                      </optgroup>
                      <optgroup label="Café / Thé">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(14, )}
                      </optgroup>
                      </>
                      // Options groups for other drinks lists:
                      : <><optgroup label="Eau">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(0, 2)}
                      </optgroup>
                      <optgroup label="Jus">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(2, 6)}
                      </optgroup>
                      <optgroup label="Soda">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(6, 14)}
                      </optgroup>
                      <optgroup label="Autre">
                        {choice.map(option => <option key={option} value={option}>{option}</option>).slice(14, 16)}
                      </optgroup>
                      </>
                    }
                  </select>
                )
              }
            }
            )}
          </>
        }
      </div>
      {/* Third grid item */}
      <div>
        <p>{typeOfFood === 'Gaufre' ? (props.food.price + 1).toFixed(2) : props.food.price.toFixed(2)}€</p>
      </div>
      {/* Fourth grid item */}
      {/* For options, display disabled basket if it is not selected */}
      {props.food.options && option === ''
        // For menus, if one choice is not selected, display a disabled basket: 
        || props.food.choice && menuChoicesArray.length === 3 && [menuChoiceOne, menuChoiceTwo, menuChoiceThree].some(item => item === '') 
        || props.food.choice && menuChoicesArray.length === 2 && [menuChoiceOne, menuChoiceTwo].some(item => item === '')
        
        ? <DisabledBasket>
            <Basket2
              size={40}
              color="white"
              title="Choisissez une option"
            />
          </DisabledBasket>
        : <Basket>
            <Basket2
              size={40}
              color="white"
              onClick={() => props.addToBasket(props.food, foodName)}
            />
          </Basket>
      }
    </ResultDiv>
  );
};

export default OrderResultDiv;
