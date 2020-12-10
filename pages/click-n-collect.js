import { db } from '@/utils/firebase';

import Menu from '@/components/Menu';
import { BlackButton } from '@/elements/Buttons';

const ClicknCollect = props => {
  return (
    <>
      <Menu
        isSelected={4} 
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
      />
      <h1>Commandez en ligne et venez récupérer votre commande</h1>
      <h2>Entrees</h2>
      <ul>
        {props.entrees.map((entree, index) => {
          return ( 
            <li key={index}>
              <h3>{entree.name}</h3>
              <p>{entree.description}</p>
              <p>{entree.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Salades</h2>
      <ul>
        {props.salades.map((salade, index) => {
          return ( 
            <li key={index}>
              <h3>{salade.name}</h3>
              <p>{salade.description}</p>
              <p>{salade.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Classiques</h2>
      <ul>
        {props.classiques.map((classique, index) => {
          return ( 
            <li key={index}>
              <h3>{classique.name}</h3>
              <p>{classique.description}</p>
              <p>{classique.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Gourmandes</h2>
      <ul>
        {props.gourmandes.map((gourmande, index) => {
          return ( 
            <li key={index}>
              <h3>{gourmande.name}</h3>
              <p>{gourmande.description}</p>
              <p>{gourmande.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Crêpes classiques</h2>
      <ul>
        {props.classiquesCrepes.map((crepe, index) => {
          return ( 
            <li key={index}>
              <h3>{crepe.name}</h3>
              <p>{crepe.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Crêpes gourmandes</h2>
      <ul>
        {props.gourmandesCrepes.map((crepe, index) => {
          return ( 
            <li key={index}>
              <h3>{crepe.name}</h3>
              <p>{crepe.description}</p>
              <p>{crepe.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
      <h2>Formules</h2>
      <ul>
        {props.formules.map((formula, index) => {
          return ( 
            <li key={index}>
              <h3>{formula.name}</h3>
              <p>{formula.description}</p>
              <p>{formula.price.toFixed(2)}€</p>
              <BlackButton>Ajouter</BlackButton>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {

  // Create general function to retrieve each sub-collection:
  const retrieveData = async (docName, collectionName, resultsArray) => {
    const docs = await docName.collection(collectionName).get();
    docs.forEach(doc => resultsArray.push(doc.data()));
  }
  
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

export default ClicknCollect;
