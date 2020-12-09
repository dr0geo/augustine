import Head from 'next/head';

import Menu from '@/components/Menu';
import Presentation from '@/components/accueil/Presentation';
import Promesse from '@/components/accueil/Promesse';
import Grid from '@/components/accueil/Grid';
import Book from '@/components/Book';
import Share from '@/components/accueil/Share';
import Footer from '@/components/Footer';

const Accueil = () => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bienvenue sur le site de la crêperie Augustine située à Paris. Laissez-vous tenter par nos succulentes recettes !"
        />
      </Head>
      <Menu isSelected={1} />
      <main>
        <Presentation />
        <Promesse />
        <Grid />
        <Book />
        <Share />
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
