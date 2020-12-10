import Head from 'next/head';

import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

const Reserver = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine - Réserver</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Réservez votre table dans l'un de nos deux restaurants Parisiens directement depuis notre site !"
        />
      </Head>
      <Menu
        isSelected={3}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
      />
      <p>Réservez</p>
      <Footer />
    </>
  );
}

export default Reserver;
