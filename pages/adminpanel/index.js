import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

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

const fetcher = (...args) => fetch(...args).then(res => res.json());

const AdminPanel = () => {

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    fetch('/api/logout')
      .then(() => mutate('/api/login'))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  };

  const { data, error } = useSWR('/api/login', fetcher);

  // If no admin is logged in:
  if (error) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <title>Crêperie Augustine | Administrateur</title>
        </Head>
        <LoginForm />
      </>
    );
  }

  // Display spinner while retrieving log info:
  if (!data) {
    return <Spinner />;

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
