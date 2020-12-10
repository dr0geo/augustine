import Head from 'next/head';

import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

const Cuisine = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine - La Cuisine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Lisez nos différents articles pour en apprendre un peu plus sur vos crêperies Parisiennes favorites !"
        />
      </Head>
      <Menu
        isSelected={5}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
      />
      <p>La cuisine</p>
      <Footer />
    </>
  );
};

export default Cuisine;
