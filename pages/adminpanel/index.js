import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import firebase from '@/utils/firebase';
import Card from '@/components/adminpanel/Card';
import LoginForm, { Container } from '@/components/adminpanel/LoginForm';
import Spinner from '@/elements/Spinner';

const CardCont = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    width: 500px;
  }
`;

const Button = styled.button`
  background-color: #d02f36;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  padding: 10px;
  transition: opacity 0.2s ease-in-out;
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
  @media (any-hover: hover) {
    &:hover {
      opacity: 0.8;
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
          <CardCont>
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
          </CardCont>
          <Button onClick={handleLogout}>Se déconnecter</Button>
          {isLoading && <Spinner />}
        </Container>
      </>
    );
  }
};

export default AdminPanel;
