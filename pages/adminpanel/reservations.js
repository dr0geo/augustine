import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import firebase from '@/utils/firebase';
import Filter from '@/components/adminpanel/Filter';
import Reservations from '@/components/adminpanel/Reservations';

const DisplayReservations = ({ isLoggedIn }) => {
  const router = useRouter();
  
  useEffect(() => {
    !isLoggedIn && router.push('/adminpanel');
  }, []);

  const [restaurant, setRestaurant] = useState(0);
  const [date, setDate] = useState('');
  const [bookingId, setBookingId] = useState('');

  const selectRestaurant = e => {
    setRestaurant(parseInt(e.target.value));
  };

  const selectDate = e => {
    setDate(e.target.value);
  };

  const getById = e => {
    setBookingId(e.target.value);
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <>
        <Link href="/adminpanel">
          <a>Retour à l'accueil administrateur</a>
        </Link>
        <Filter selectRestaurant={selectRestaurant} selectDate={selectDate} getById={getById} />
        <Reservations restaurant={restaurant} date={date} bookingId={bookingId} />
      </>
    </>
  );
};

export const getServerSideProps = async () => {
  const isLoggedIn = firebase.auth().currentUser !== null;

  return {
    props: { isLoggedIn }
  };
};

export default DisplayReservations;
