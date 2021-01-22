import { db } from '@/utils/firebase';
import { useState } from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import Menu from '@/components/carte/Menu';
import Footer from '@/components/Footer';

const Carte = props => {
  // To change display of selected main category of food button:
  const [selectedMainFood, setSelectedMainFood] = useState(0);
  // To change display of selected subcategory of food tab: 
  const [selectedSubFood, setSelectedSubFood] = useState(0);
  // To display food items:
  const [selectedFood, setSelectedFood] = useState(props.entrees);
  
  // Select main type of food:
  const handleClick = ({ target }) => {
    setSelectedMainFood(parseInt(target.value));
    setSelectedSubFood(0);
    setSelectedFood(() => {
      switch (target.value) {
        case '0':
          return props.entrees;
        case '1':
          return props.salades;
        case '2':
          return props.galettes;
        case '3':
          return props.crepes;
        case '4':
          return props.boissons;
        case '5':
          return props.formules;
      }
    });
  };

  // Select subtype of food:
  const handleCategoryClick = ({ target }) => {
    setSelectedSubFood(parseInt(target.value));
  };

  return (
    <>
      <Head>
        <title>Crêperie Augustine | La Carte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Découvrez la carte de nos différentes galettes et crêpes, ainsi que nos formules, boissons, salades et entrées. Nous serons ravis de vous accueillir dans notre restaurant Parisien."
        />
      </Head>
      <Header
        isSelected={2}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="/images/background/carte.webp"
        title="La Carte"
      />
      <h2>Parcourez<br /><span className="cursive">la carte Augustine</span></h2>
      <Menu 
        selectedMainFood={selectedMainFood}
        selectedSubFood={selectedSubFood}
        handleClick={handleClick}
        selectedFood={selectedFood}
        handleCategoryClick={handleCategoryClick}
      />
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

  // Retrieve all drinks in collection 'drinks':
  const dbDrinks = db.collection('drinks').doc('znRDAknerTd91N6ddKkx');

  const fraiches = [];
  const chaudes = [];
  const aperitifs = [];
  const alcoolisees = [];

  retrieveData(dbDrinks, 'fraiches', fraiches);
  retrieveData(dbDrinks, 'chaudes', chaudes);
  retrieveData(dbDrinks, 'aperitifs', aperitifs);
  retrieveData(dbDrinks, 'alcoolisees', alcoolisees);

  // Retrieve all formulas in collection 'formules':
  const dbFormulas = await db.collection('formules').get();
  const formules = [];
  dbFormulas.forEach(doc => formules.push(doc.data()));

  return {
    props: {
      entrees,
      salades,
      galettes: [
        { title: 'Classiques', data: classiques },
        { title: 'Gourmandes', data: gourmandes }
      ],
      crepes: [
        { title: 'Classiques', data: classiquesCrepes },
        { title: 'Gourmandes', data: gourmandesCrepes }
      ],
      boissons: [
        { title: 'Fraiches', data: fraiches },
        { title: 'Chaudes', data: chaudes },
        { title: 'Apéritifs', data: aperitifs },
        { title: 'Alcoolisées', data: alcoolisees }
      ],
      formules
    },
    // Use ISR once a day:
    revalidate: 86400
  };
};

export default Carte;
