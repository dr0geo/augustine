import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Spinner9 } from '@styled-icons/icomoon';
import styled, { keyframes } from 'styled-components';

import Filter from '@/components/adminpanel/Filter';
import Orders from '@/components/adminpanel/Orders';
import Tabs from '@/components/adminpanel/Tabs';

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

const todayDate = new Date(Date.now());
const day = todayDate.getDate().toString().padStart(2, '0');
const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
const year = todayDate.getFullYear();
const dateString = `${year}-${month}-${day}`;

const Commandes = () => {

  const router = useRouter();

  // Check if admin is logged in:
  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      router.replace('/adminpanel');
    }
  }, []);

  const [date, setDate] = useState(dateString);
  const [orderId, setOrderId] = useState('');
  const [selected, setSelected] = useState(1);

  const selectDate = e => {
    setDate(e.target.value);
  };

  const getById = e => {
    setOrderId(e.target.value);
  }

  const allDates = () => {
    setDate('');
  }

  const handleSelectTab = tab => setSelected(tab);

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
          <title>Crêperie Augustine | Commandes</title>
        </Head>
        <Filter selectDate={selectDate} getById={getById} allDates={allDates} dateString={dateString} />
        <Tabs selected={selected} handleSelectTab={handleSelectTab} />
        <Orders data={selected === 1 ? data.new : data.validated} date={date} orderId={orderId} selected={selected} />
      </>
    );
  }
};

export default Commandes;
