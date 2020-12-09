import { db } from '@/utils/firebase';

import { BlackButton } from '@/elements/Buttons';

const ClicknCollect = props => {
  return (
    <>
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
        {props.clasCrepes.map((crepe, index) => {
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
        {props.gourmCrepes.map((crepe, index) => {
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
        {props.formulas.map((formula, index) => {
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
  // Retrieve all foods in collection 'foods':
  const dbFoods = db.collection('foods').doc('pUn7ePba4vpsZ2v0nbHY');

  // Entrees:
  const dbEntrees = await dbFoods.collection('entrees').get();
  const entrees = [];
  dbEntrees.forEach(doc => entrees.push(doc.data()));

  // Salades:
  const dbSalades = await dbFoods.collection('salades').get();
  const salades = [];
  dbSalades.forEach(doc => salades.push(doc.data()));

  // Galettes Classiques:
  const classiquesGal = await dbFoods.collection('classiques').get();
  const classiques = [];
  classiquesGal.forEach(doc => classiques.push(doc.data()));

  // Galettes Gourmandes:
  const gourmandesGal = await dbFoods.collection('gourmandes').get();
  const gourmandes = [];
  gourmandesGal.forEach(doc => gourmandes.push(doc.data()));

  // Crepes classiques:
  const classiquesCrepes = await dbFoods.collection('crepes-classiques').get();
  const clasCrepes = [];
  classiquesCrepes.forEach(doc => clasCrepes.push(doc.data()));

  // Crepes gourmandes:
  const gourmandesCrepes = await dbFoods.collection('crepes-gourmandes').get();
  const gourmCrepes = [];
  gourmandesCrepes.forEach(doc => gourmCrepes.push(doc.data()));
  
  // Retrieve all formulas:
  const dbFormulas = await db.collection('formules').get();
  const formulas = [];
  dbFormulas.forEach(doc => formulas.push(doc.data()));

  return {
    props: { 
      entrees,
      salades,
      classiques,
      gourmandes,
      clasCrepes,
      gourmCrepes,
      formulas,
    },
    revalidate: 1
  };
};

export default ClicknCollect;
