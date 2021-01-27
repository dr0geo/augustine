import Head from 'next/head';

import { PopUp } from '@/elements/Divs';
import Header from '@/components/Header';
import Presentation from '@/components/accueil/Presentation';
import Promesse from '@/components/accueil/Promesse';
import RecipesGrid from '@/components/accueil/Recettes';
import Book from '@/components/accueil/Book';
import Share from '@/components/accueil/Share';
import Footer from '@/components/Footer';

const Accueil = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine | Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Bienvenue sur le site de la crêperie Augustine située à Paris 1er ! Venez découvrir nos succulentes recettes, et réservez votre table en ligne ou commandez directement depuis notre site !" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creperie-augustine.com/" />
        <meta property="og:title" content="Crêperie Augustine" />
        <meta property="og:description" content="Bienvenue sur le site de la crêperie Augustine située à Paris 1er ! Venez découvrir nos succulentes recettes, et réservez votre table en ligne ou commandez directement depuis notre site !" />
        <meta property="og:image" content="/images/logo/logoOG.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creperie-augustine.com/" />
        <meta property="twitter:title" content="Crêperie Augustine" />
        <meta property="twitter:description" content="Bienvenue sur le site de la crêperie Augustine située à Paris 1er ! Venez découvrir nos succulentes recettes, et réservez votre table en ligne ou commandez directement depuis notre site !" />
        <meta property="twitter:image" content="/images/logo/logoOG.webp" />
      </Head>

      <PopUp />

      <Header 
        isSelected={1}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="/images/background/accueil.webp"
        logo={true}
      />
      <main>
        <Presentation />
        <Promesse />
        <RecipesGrid />
        <Book />
        <Share posts={props.posts} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  // Retrieve instagram posts at build time:
  const uid = process.env.INSTAGRAM_UID;
  const token = process.env.INSTAGRAM_TOKEN;
  
  const res = await fetch(`https://graph.instagram.com/${uid}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,username&access_token=${token}`);
  const posts = await res.json();

  return {
    props: { posts },
    // Use ISR every 5 minutes:
    revalidate: 300
  }
}

export default Accueil;
