import styled from 'styled-components';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Filter from '@/components/adminpanel/Filter';
import Orders from '@/components/adminpanel/Orders';
import Tabs from '@/components/adminpanel/Tabs';
import Spinner from '@/elements/Spinner';
import { db } from '@/utils/firebase';

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

const Commandes = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from database:
  const [newOrders, setNewOrders] = useState([]);
  const [validatedOrders, setValidatedOrders] = useState([]);

  useEffect(() => {

    // Get and listen for new orders:
    const getNewOrders = db.collection('orders').onSnapshot(snapshot => {
      const retrievedNewOrders = [];
      snapshot.forEach(doc => retrievedNewOrders.push({
        id: doc.id,
        ...doc.data()
      }));
      setNewOrders(retrievedNewOrders);
    });

    // Get and listen for validated orders:
    const getValidatedOrders = db.collection('filedOrders').onSnapshot(snapshot => {
      const retrievedValidatedOrders = [];
      snapshot.forEach(doc => retrievedValidatedOrders.push({
        id: doc.id,
        ...doc.data()
      }));
      setValidatedOrders(retrievedValidatedOrders);
    });

    // Retrieve all data from database:
    Promise.all([getNewOrders, getValidatedOrders])
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));

    // Cleanup function:
    return () => {
      getNewOrders();
      getValidatedOrders();
    }
  }, []);

  // Filters settings:
  const [date, setDate] = useState(dateString);
  const [orderId, setOrderId] = useState('');
  const [selected, setSelected] = useState(1);

  const selectDate = e => {
    setDate(e.target.value);
  };

  const getById = e => {
    setOrderId(e.target.value);
  };

  const allDates = () => {
    setDate('');
  };

  const handleSelectTab = tab => setSelected(tab);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Crêperie Augustine | Commandes</title>
      </Head>
      {isLoading
        ? <Spinner />
        : (
        <>
          <Filter
            selectDate={selectDate}
            getById={getById}
            allDates={allDates}
            dateString={dateString}
            date={date}
          />
          <Title>Commandes</Title>
          <Tabs selected={selected} handleSelectTab={handleSelectTab} newNumber={newOrders.length} validatedNumber={validatedOrders.length} />
          <Orders
            data={selected === 1 ? newOrders : validatedOrders}
            date={date}
            orderId={orderId}
            selected={selected}
          />
        </>
      )}
    </>
  );
};

export default Commandes;
