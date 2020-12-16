import Head from 'next/head';
import Link from 'next/link';
import firebase from '@/utils/firebase';

import Card from '@/components/adminpanel/Card';
import LoginForm, { Container } from '@/components/adminpanel/LoginForm';

const AdminPanel = ({ isLoggedIn }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <Container>
          <h2>
            <em>
              Bienvenue sur le panneau administrateur de la crêperie Augustine!
            </em>
          </h2>
          <Link href="/adminpanel/reservations">
            <a>
              <Card>
                <h3>Réservations</h3>
              </Card>
            </a>
          </Link>
          <Link href="/adminpanel/commandes">
            <a>
              <Card>
                <h3>Commandes</h3>
              </Card>
            </a>
          </Link>
        </Container>
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
