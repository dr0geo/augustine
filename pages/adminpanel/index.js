import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import firebase from '@/utils/firebase';
import Card from '@/components/adminpanel/Card';
import LoginForm, { Container } from '@/components/adminpanel/LoginForm';
import Spinner from '@/elements/Spinner';

const Button = styled.button`
  background-color: #d02f36;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px;
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;

const AdminPanel = () => {

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAdminLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await firebase.auth().signOut();
      setAdminLoggedIn(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // If no admin is logged in:
  if (!adminLoggedIn) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <title>Crêperie Augustine | Administrateur</title>
        </Head>
        {isLoading 
          ? <Spinner />
          : <LoginForm />
        }
      </>
    );

  // Display UI if admin is logged in:
  } else {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <title>Crêperie Augustine | Administrateur</title>
        </Head>
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
          <Button onClick={handleLogout}>Se déconnecter</Button>
          {isLoading && <Spinner />}
        </Container>
      </>
    );
  }
};

export default AdminPanel;
