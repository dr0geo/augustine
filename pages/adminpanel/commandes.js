import Head from 'next/head';
import { useEffect, useState } from 'react';

import { db } from '@/utils/firebase';
import Filter from '@/components/adminpanel/Filter';
import Orders from '@/components/adminpanel/Orders';
import Tabs from '@/components/adminpanel/Tabs';
import Spinner from '@/elements/Spinner';
import { Title, Total, todayDate, dateString } from '@/components/adminpanel/Elements';

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
          {newOrders.length > 0 && 
            <Total>
              Vous avez <span onClick={allDates}>{newOrders.length} {newOrders.length > 1 ? 'nouvelles commandes' : 'nouvelle commande'}
              </span> !
            </Total>
          }
          <Filter
            selectDate={selectDate}
            getById={getById}
            allDates={allDates}
            dateString={dateString}
            date={date}
          />
          <Title>
          {date !== '' && 
            `Commandes pour ${date !== '' && todayDate.toLocaleDateString('fr-FR') === (new Date(date)).toLocaleDateString('fr-FR') ? 'aujourd\'hui' : `le ${(new Date(date)).toLocaleDateString('fr-FR')}`}`
          }
          {date === '' &&
            'Toutes les commandes'
          }
          </Title>
          <Tabs selected={selected} handleSelectTab={handleSelectTab} />
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
