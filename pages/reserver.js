import Head from 'next/head';
import { useState } from 'react';

import { db } from '@/utils/firebase';
import Menu from '@/components/Menu';
import { Section } from '@/elements/Divs';
import { DateChoice, Personal, Success } from '@/components/reservation/Dynamic';
import Footer from '@/components/Footer';
import Spinner from '@/elements/Spinner';

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
  const [bookingStep, setBookingStep] = useState(1);

  const goToNextStep = () => {
    setBookingStep(bookingStep + 1);
  };

  const goToPreviousStep = () => {
    setBookingStep(bookingStep - 1);
    setErrorInBooking('');
  };

  // Manage booking information:

  // Date:
  const todayDate = new Date(Date.now());

  const [date, setDate] = useState(todayDate);
  // Sentence to display in the date input:
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

  const handleTimeSelection = e => {
    setTime(e.target.value);
    goToNextStep();
  }

  // Personal information:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputValues = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
    }
  }

  // Handle booking submission:
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [errorInBooking, setErrorInBooking] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formatedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const bookingRef = {
      date: formatedDate,
      time,
      people,
      firstName,
      lastName,
      email,
      phoneNumber
    }

    try {
      const ref = await db.collection('bookings').add(bookingRef);
      setBookingConfirmation(ref.id);
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingId: ref.id,
          bookingRef,
          type: 'booking'
        })
      });
      goToNextStep();
    } catch {
      setErrorInBooking('Une erreur s\'est produite, veuillez réessayer... Si le problème persiste, n\'hésitez pas à nous contacter par téléphone !');
    } finally {
      setIsLoading(false);
    }
  }

  // Display on screen according to current booking step:
  return (
    <>
      <Head>
        <title>Crêperie Augustine | Réserver</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Réservez votre table dans notre crêperie Parisienne directement depuis notre site !"
        />
      </Head>
      {isLoading && <Spinner />}
      <Menu
        isSelected={3}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="/images/restaurant/downstairs.webp"
        title="Réserver une table"
      />
      <Section bgColor="white">
        <h2>
          Nous vous attendons
          <br />
          <em>chez Augustine</em>
        </h2>
      </Section>
      {bookingStep === 1 && (
        <DateChoice
          dateSentence={dateSentence}
          people={people}
          time={time}
          handleDateDecrease={handleDateDecrease}
          handleDateIncrease={handleDateIncrease}
          handlePeopleDecrease={handlePeopleDecrease}
          handlePeopleIncrease={handlePeopleIncrease}
          handleTimeSelection={handleTimeSelection}
        />
      )}
      {bookingStep === 2 && (
        <Personal 
          goToPreviousStep={goToPreviousStep}
          people={people}
          dateSentence={dateSentence}
          time={time}
          handleInputValues={handleInputValues}
          handleSubmit={handleSubmit}
          errorInBooking={errorInBooking}
        />
      )}
      {bookingStep === 3 && (
        <Success 
          bookingConfirmation={bookingConfirmation}
        />
      )}
      <Footer />
    </>
  );
};

export default Reserver;
