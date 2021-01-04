import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Spinner9 } from '@styled-icons/icomoon';
import styled, { keyframes } from 'styled-components';

import Filter from '@/components/adminpanel/Filter';
import Orders from '@/components/adminpanel/Orders';

const spinnerAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  & > * {
    animation: ${spinnerAnim} 1s infinite; 
  }
`;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Commandes = () => {

  const router = useRouter();

  // Check if admin is logged in:
  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      router.replace('/adminpanel');
    }
  }, []);

  const [restaurant, setRestaurant] = useState(0);
  const [date, setDate] = useState('');
  const [orderId, setOrderId] = useState('');

  const selectRestaurant = e => {
    setRestaurant(parseInt(e.target.value));
  };

  const selectDate = e => {
    setDate(e.target.value);
  };

  const getById = e => {
    setOrderId(e.target.value);
  }

  const allDates = () => {
    setDate('');
  }

  // Fetch orders on the client side:
  const { data, error } = useSWR('/api/commandes', fetcher, {
    refreshInterval: 60000
  });
  // If error, redirect to login screen:
  if (error) {
    router.replace('/adminpanel');
  }
  // Display a spinner while data is being fetched:
  if (!data) {
    return <SpinnerDiv><Spinner9 size={80} color="#012f6a" /></SpinnerDiv>;

  } else {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Filter selectRestaurant={selectRestaurant} selectDate={selectDate} getById={getById} allDates={allDates} />
        <Orders data={data} restaurant={restaurant} date={date} orderId={orderId} />
      </>
    );
  }
};

export default Commandes;
