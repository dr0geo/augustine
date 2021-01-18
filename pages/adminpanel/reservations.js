import { useState, useEffect } from 'react';
import Head from 'next/head';

import { db } from '@/utils/firebase';
import Filter from '@/components/adminpanel/Filter';
import Reservations from '@/components/adminpanel/Reservations';
import Tabs from '@/components/adminpanel/Tabs';
import Spinner from '@/elements/Spinner';
import { Title, Total, todayDate, dateString } from '@/components/adminpanel/Elements';

const DisplayReservations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch data from database:
  const [newBookings, setNewBookings] = useState([]);
  const [validatedBookings, setValidatedBookings] = useState([]);

  useEffect(() => {

    // Get and listen for new bookings:
    const getNewBookings = db.collection('bookings').onSnapshot(snapshot => {
      const retrievedNewBookings = [];
      snapshot.forEach(doc => retrievedNewBookings.push({
        id: doc.id,
        ...doc.data()
      }));
      setNewBookings(retrievedNewBookings);
      // Error handling:
    }, () => {
      setErrorMessage('Une erreur s\'est produite lors de la connexion à la base de données, veuillez réessayer. Si le problème persiste, contactez votre équipe de dévelopement.')
    });

    // Get and listen for validated bookings:
    const getValidatedBookings = db.collection('filedBookings').onSnapshot(snapshot => {
      const retrievedValidatedBookings = [];
      snapshot.forEach(doc => retrievedValidatedBookings.push({
        id: doc.id,
        ...doc.data()
      }));
      setValidatedBookings(retrievedValidatedBookings);
      // Error handling:
    }, () => {
      setErrorMessage('Une erreur s\'est produite lors de la connexion à la base de données, veuillez réessayer. Si le problème persiste, contactez votre équipe de dévelopement.')
    });

    // Retrieve all data from database:
    Promise.all([getNewBookings, getValidatedBookings])
      .finally(() => setIsLoading(false));
    
    // Cleanup function:
    return () => {
      getNewBookings();
      getValidatedBookings();
    }
  }, []);

  // Filters settings:
  const [date, setDate] = useState(dateString);
  const [bookingId, setBookingId] = useState('');
  const [selected, setSelected] = useState(1);

  const selectDate = e => {
    setDate(e.target.value);
  };

  const getById = e => {
    setBookingId(e.target.value);
  }

  const allDates = () => {
    setDate('');
  }

  const handleSelectTab = tab => setSelected(tab);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Crêperie Augustine | Réservations</title>
      </Head>
      {isLoading
        ? <Spinner />
        : errorMessage
          ? <Total>{errorMessage}</Total>
          : (
            <>
            {newBookings.length > 0 && 
              <Total>
                Vous avez <span onClick={allDates}>{newBookings.length} {newBookings.length > 1 ? 'nouvelles réservations' : 'nouvelle réservation'}
                </span> !
              </Total>
            }
            <Filter selectDate={selectDate} getById={getById} allDates={allDates} dateString={dateString} date={date} />
            <Title>
              {date !== '' && 
                `Réservations pour ${date !== '' && todayDate.toLocaleDateString('fr-FR') === (new Date(date)).toLocaleDateString('fr-FR') ? 'aujourd\'hui' : `le ${(new Date(date)).toLocaleDateString('fr-FR')}`}`
              }
              {date === '' &&
                'Toutes les réservations'
              }
            </Title>
            <Tabs selected={selected} handleSelectTab={handleSelectTab} />
            <Reservations data={selected === 1 ? newBookings : validatedBookings} date={date} bookingId={bookingId} selected={selected} />
          </>
        )
      }
    </>
  );
}

export default DisplayReservations;
