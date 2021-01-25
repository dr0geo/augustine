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
        <meta
          name="description"
          content="Bienvenue sur le site de la crêperie Augustine située à Paris 1er arrondissement. Laissez-vous tenter par nos succulentes recettes !"
        />
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
