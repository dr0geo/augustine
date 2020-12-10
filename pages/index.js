import Head from 'next/head';

import Menu from '@/components/Menu';
import Presentation from '@/components/accueil/Presentation';
import Promesse from '@/components/accueil/Promesse';
import Grid from '@/components/accueil/Grid';
import Book from '@/components/Book';
import Share from '@/components/accueil/Share';
import Footer from '@/components/Footer';

const Accueil = (props) => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine - Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bienvenue sur le site de la crêperie Augustine située à Paris. Laissez-vous tenter par nos succulentes recettes !"
        />
      </Head>
      <Menu 
        isSelected={1}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
      />
      <main>
        <Presentation />
        <Promesse />
        <Grid />
        <Book />
        <Share posts={props.posts} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const url = 'https://www.instagram.com/creperieaugustine/';
  const token = process.env.INSTAGRAM_TOKEN;
  
  const res = await fetch(`https://graph.facebook.com/v9.0/instagram_oembed?url=${url}&access_token=${token}`);
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 60
  }
}

export default Accueil;
