import Head from 'next/head';
import { useState } from 'react';

import { db } from '@/utils/firebase';
import Header from '@/components/Header';
import { Section } from '@/elements/Divs';
import Discount from '@/components/reservation/Discount';
import DateChoice from '@/components/reservation/DateChoice';
import PersonalInfo from '@/components/reservation/PersonalInfo';
import Success from '@/components/reservation/Success';
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

  // Guests number:
  const [guestsNumber, setGuestsNumber] = useState(1);

  const handlePeopleIncrease = () => {
    guestsNumber < 8 && setGuestsNumber(guestsNumber + 1);
  };
  
  const handlePeopleDecrease = () => {
    guestsNumber > 1 && setGuestsNumber(guestsNumber - 1);
  };

  // Booking time:
  const [hours, setHours] = useState('19');
  const [minutes, setMinutes] = useState('00');
  const [time, setTime] = useState(`${hours}:${minutes}`);

  const handleHoursSelection = e => {
    setHours(e.target.value);
  }

  const handleMinutesSelection = e => {
    setMinutes(e.target.value);
  }

  const handleNextStep = () => {
    setTime(`${hours}:${minutes}`);
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

  // Handle discount:
  const [discount, setDiscount] = useState(false);

  const applyDiscount = () => {
    setDiscount(true);
  }

  const removeDiscount = () => {
    setDiscount(false);
  }

  // Handle booking submission:
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [errorInBooking, setErrorInBooking] = useState(null);

  // Display spinner according to loading state:
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Format date for database and admin panel (YYYY-MM-DD):
    const formatedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const bookingRef = {
      date: formatedDate,
      time,
      guestsNumber,
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
          type: 'booking',
          discount
        })
      });
      goToNextStep();
    } catch {
      setErrorInBooking('Une erreur s\'est produite, veuillez réessayer... Si le problème persiste, n\'hésitez pas à nous contacter par téléphone !');
    } finally {
      setIsLoading(false);
    }
  }

  // Display current booking step:
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
      <Header
        isSelected={3}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="/images/background/reserver.webp"
        title="Réserver une table"
      />
      <Section bgColor="white">
        <h2>
          Nous vous attendons
          <br />
          <span className="cursive">chez Augustine</span>
        </h2>
        <Discount />
      </Section>
      <Section bgColor="#e3e9ef">

        {/* First booking step */}
        {bookingStep === 1 && (
          <DateChoice
            dateSentence={dateSentence}
            guestsNumber={guestsNumber}
            handleDateDecrease={handleDateDecrease}
            handleDateIncrease={handleDateIncrease}
            handlePeopleDecrease={handlePeopleDecrease}
            handlePeopleIncrease={handlePeopleIncrease}
            hours={hours}
            handleHoursSelection={handleHoursSelection}
            handleMinutesSelection={handleMinutesSelection}
            handleNextStep={handleNextStep}
            discount={discount}
            applyDiscount={applyDiscount}
            removeDiscount={removeDiscount}
          />
        )}

        {/* Second booking step */}
        {bookingStep === 2 && (
          <PersonalInfo 
            goToPreviousStep={goToPreviousStep}
            guestsNumber={guestsNumber}
            dateSentence={dateSentence}
            time={time}
            handleInputValues={handleInputValues}
            handleSubmit={handleSubmit}
            errorInBooking={errorInBooking}
            discount={discount}
          />
        )}

        {/* Booking confirmation */}
        {bookingStep === 3 && (
          <Success 
            bookingConfirmation={bookingConfirmation}
          />
        )}
      </Section>
      <Footer />
    </>
  );
};

export default Reserver;
