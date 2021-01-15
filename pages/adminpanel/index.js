import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Card from '@/components/adminpanel/Card';
import LoginForm, { Container } from '@/components/adminpanel/LoginForm';

const AdminPanel = () => {
  // Manage admin log status for the UI:
  const [isLoggedIn, setIsLoggedIn] = useState('false');

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      setIsLoggedIn('true');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn('true');
  }

  const handleLogout = () => {
    fetch('/api/logout')
      .then(() => sessionStorage.removeItem('isLoggedIn'))
      .then(() => setIsLoggedIn('false'))
      .catch(err => console.log(err));
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Crêperie Augustine | Administrateur</title>
      </Head>
      {isLoggedIn === 'false' ? (
        <LoginForm handleLogin={handleLogin} />
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
          <button onClick={handleLogout}>Se déconnecter</button>
        </Container>
      )}
    </>
  );
};

export default AdminPanel;
