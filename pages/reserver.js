import Head from 'next/head';
import { useState } from 'react';

import Menu from '@/components/Menu';
import { Section } from '@/elements/Divs';
import { RestaurantChoice, DateChoice } from '@/components/reservation/Dynamic';
import Footer from '@/components/Footer';

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

const Reserver = props => {
  // Manage booking steps:
  const [bookingStep, setBookingStep] = useState(0);
  const goToNextStep = () => {
    setBookingStep(bookingStep + 1);
  };
  const goToPreviousStep = () => {
    setBookingStep(bookingStep - 1);
  };
  // Manage booking information:

  // Restaurant selection:
  const [restaurant, setRestaurant] = useState(1);

  const handleRestaurantSelection = restaurantNumber => {
    setRestaurant(restaurantNumber);
    goToNextStep();
  };

  // Date:
  const todayDate = new Date(Date.now());

  const [date, setDate] = useState(todayDate);
  const dateSentence = `${weekDays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

  const handleDateIncrease = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };
  const handleDateDecrease = () => {
    date > todayDate && setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  // Number of people:
  const [people, setPeople] = useState(1);

  const handlePeopleIncrease = () => {
    people < 8 && setPeople(people + 1);
  };
  const handlePeopleDecrease = () => {
    people > 1 && setPeople(people - 1);
  };

  // Booking time:
  const [time, setTime] = useState('');

  return (
    <>
      <Head>
        <title>Crêperie Augustine - Réserver</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Réservez votre table dans l'un de nos deux restaurants Parisiens directement depuis notre site !"
        />
      </Head>
      <Menu
        isSelected={3}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="/images/restaurant/downstairs.jpeg"
        title="Réserver une table"
      />
      <Section bgColor="white">
        <h2>
          Nous vous attendons
          <br />
          <em>chez Augustine</em>
        </h2>
      </Section>
      {bookingStep === 0 && (
        <RestaurantChoice
          handleRestaurantSelection={handleRestaurantSelection}
        />
      )}
      {bookingStep === 1 && (
        <DateChoice
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          dateSentence={dateSentence}
          people={people}
          time={time}
          handleDateDecrease={handleDateDecrease}
          handleDateIncrease={handleDateIncrease}
          handlePeopleDecrease={handlePeopleDecrease}
          handlePeopleIncrease={handlePeopleIncrease}
        />
      )}
      <Footer />
    </>
  );
};

export default Reserver;
