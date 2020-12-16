import Head from 'next/head';
import firebase from '@/utils/firebase';

import Reservations from '@/components/adminpanel/Reservations';
import LoginForm from '@/components/adminpanel/LoginForm';

const AdminPanel = ({ isLoggedIn }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!isLoggedIn 
        ? <LoginForm />
        : (
        <>
          <h2>Bienvenue sur le panneau administrateur !</h2>
          <Reservations />
        </>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const isLoggedIn = firebase.auth().currentUser !== null;

  return {
    props: { isLoggedIn }
  };
};

export default AdminPanel;
