import { db } from '@/utils/firebase';
import Head from 'next/head';

import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

const Carte = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine - La Carte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Découvrez la carte de nos différentes galettes et crêpes, ainsi que nos formules, boissons, salades et entrées. Nous serons ravis de vous accueillir dans nos restaurants Parisiens."
        />
      </Head>
      <Menu
        isSelected={2}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
      />
      <p>La carte</p>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  // Create general function to retrieve each sub-collection:
  const retrieveData = async (docName, collectionName, resultsArray) => {
    const docs = await docName.collection(collectionName).get();
    docs.forEach(doc => resultsArray.push(doc.data()));
  };

  // Retrieve all foods in collection 'foods':
  const dbFoods = db.collection('foods').doc('pUn7ePba4vpsZ2v0nbHY');

  const entrees = [];
  const salades = [];
  const classiques = [];
  const gourmandes = [];
  const classiquesCrepes = [];
  const gourmandesCrepes = [];

  retrieveData(dbFoods, 'entrees', entrees);
  retrieveData(dbFoods, 'salades', salades);
  retrieveData(dbFoods, 'classiques', classiques);
  retrieveData(dbFoods, 'gourmandes', gourmandes);
  retrieveData(dbFoods, 'crepes-classiques', classiquesCrepes);
  retrieveData(dbFoods, 'crepes-gourmandes', gourmandesCrepes);

  // Retrieve all formulas:
  const dbFormulas = await db.collection('formules').get();
  const formules = [];
  dbFormulas.forEach(doc => formules.push(doc.data()));

  // Retrieve all drinks:
  const dbDrinks = db.collection('drinks').doc('znRDAknerTd91N6ddKkx');

  const fraiches = [];
  const chaudes = [];
  const aperitifs = [];
  const alcoolisees = [];

  retrieveData(dbDrinks, 'fraiches', fraiches);
  retrieveData(dbDrinks, 'chaudes', chaudes);
  retrieveData(dbDrinks, 'aperitifs', aperitifs);
  retrieveData(dbDrinks, 'alcoolisees', alcoolisees);

  return {
    props: {
      entrees,
      salades,
      classiques,
      gourmandes,
      classiquesCrepes,
      gourmandesCrepes,
      formules,
      fraiches,
      chaudes,
      aperitifs,
      alcoolisees
    },
    revalidate: 86400
  };
};

export default Carte;
