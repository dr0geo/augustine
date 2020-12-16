import Head from 'next/head';
import { useState } from 'react';

import Menu from '@/components/Menu';
import { Section } from '@/elements/Divs';
import { RestaurantChoice, DateChoice } from '@/components/reservation/Dynamic';
import Footer from '@/components/Footer';

const Reserver = props => {
  const [bookingStep, setBookingStep] = useState(0);

  const goToNextStep = () => {
    setBookingStep(bookingStep + 1);
  };

  const goToPreviousStep = () => {
    setBookingStep(bookingStep - 1);
  }

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
        {bookingStep === 0 && <RestaurantChoice goToNextStep={goToNextStep} />}
        {bookingStep === 1 && <DateChoice goToPreviousStep={goToPreviousStep} />}
      <Footer />
    </>
  );
};

export default Reserver;
