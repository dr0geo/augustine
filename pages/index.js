import Head from 'next/head';

import Menu from '@/components/Menu';
import Presentation from '@/components/accueil/Presentation';
import Promesse from '@/components/accueil/Promesse';
import Grid from '@/components/accueil/Grid';
import Book from '@/components/Book';
import Share from '@/components/accueil/Share';
import Footer from '@/components/Footer';

const Accueil = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine - Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bienvenue sur le site de la crêperie Augustine située à Paris. Laissez-vous tenter par nos succulentes recettes !"
        />
        <script src="https://www.instagram.com/static/bundles/metro/EmbedSDK.js/33cd2c5d5d59.js" async></script>
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
  const uid = process.env.INSTAGRAM_UID;
  const token = process.env.INSTAGRAM_TOKEN;
  
  const res = await fetch(`https://graph.instagram.com/${uid}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,username&access_token=${token}`);
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 300
  }
}

export default Accueil;
