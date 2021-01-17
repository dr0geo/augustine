import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import { db } from '@/utils/firebase';
import Filter from '@/components/adminpanel/Filter';
import Reservations from '@/components/adminpanel/Reservations';
import Tabs from '@/components/adminpanel/Tabs';
import Spinner from '@/elements/Spinner';

const Title = styled.h1`
  font-size: 3rem;
  height: auto;
  justify-content: center;
  margin-bottom: 50px;
`;

const todayDate = new Date(Date.now());
const day = todayDate.getDate().toString().padStart(2, '0');
const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
const year = todayDate.getFullYear();
const dateString = `${year}-${month}-${day}`;

const DisplayReservations = () => {
  const [isLoading, setIsLoading] = useState(true);

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
    });

    // Get and listen for validated bookings:
    const getValidatedBookings = db.collection('filedBookings').onSnapshot(snapshot => {
      const retrievedValidatedBookings = [];
      snapshot.forEach(doc => retrievedValidatedBookings.push({
        id: doc.id,
        ...doc.data()
      }));
      setValidatedBookings(retrievedValidatedBookings);
    });

    // Retrieve all data from database:
    Promise.all([getNewBookings, getValidatedBookings])
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
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
        : (
            <>
            <Filter selectDate={selectDate} getById={getById} allDates={allDates} dateString={dateString} date={date} />
            <Title>Réservations</Title>
            <Tabs selected={selected} handleSelectTab={handleSelectTab} newNumber={newBookings.length} validatedNumber={validatedBookings.length} />
            <Reservations data={selected === 1 ? newBookings : validatedBookings} date={date} bookingId={bookingId} selected={selected} />
          </>
        )}
    </>
  );
}

export default DisplayReservations;
