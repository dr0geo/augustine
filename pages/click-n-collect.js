import { db } from '@/utils/firebase';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';

import Menu from '@/components/Menu';
import Categories from '@/components/carte/Categories';
import OrderResults from '@/components/click-n-collect/OrderResults';
import Footer from '@/components/Footer';
import Basket, { BasketButton } from '@/components/click-n-collect/Basket';
import { CnCMenuSection } from '@/components/elements/Divs';
import OrderInfo from '@/components/click-n-collect/OrderInfo';

const ClicknCollect = props => {

  const [isSelected, setIsSelected] = useState(0);
  const [isCategorySelected, setIsCategorySelected] = useState(0);
  const [selectedFood, setSelectedFood] = useState(props.entrees);
  const [isBasketDisplayed, setIsBasketDisplayed] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('order')) {
      setBasketItems(JSON.parse(sessionStorage.getItem('order')));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('order', JSON.stringify(basketItems));
  }, [basketItems]);
  
  const handleClick = ({ target }) => {
    setIsSelected(parseInt(target.value));
    setIsCategorySelected(0);
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

  const handleCategoryClick = ({ target }) => {
    setIsCategorySelected(parseInt(target.value));
  };

  const toggleBasket = () => {
    setIsBasketDisplayed(!isBasketDisplayed);
  }

  const decreaseQuantity = item => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setBasketItems([...basketItems]);
    } else {
      setBasketItems(basketItems.filter(food => food.name !== item.name));
    }
  }

  const increaseQuantity = item => {
    item.quantity += 1;
    setBasketItems([...basketItems]);
  }

  const deleteItem = item => {
    setBasketItems(basketItems.filter(food => food.name !== item.name));
  }

  const addToBasket = (food, foodName) => {
    if (!basketItems.some(item => item.name === foodName)) {
      food.quantity = 1;
      setBasketItems([
        ...basketItems,
        {
          name: foodName,
          price: food.price,
          quantity: food.quantity,
          id: uuid()
        }
      ]);
    }
  }

  // Display order form:
  const [displaySection, setDisplaySection] = useState(false);
  // Personal information:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // Date:
  const todayDate = new Date(Date.now());
  const [date, setDate] = useState(todayDate);
  // Time:
  const [time, setTime] = useState('19:00:00')
  // Handle order submission:
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  
  const handleOrder = () => {
    window.scrollTo(0, 0);
    props.displayOrderForm();
    setDisplaySection(true);
  }

  const backToBasket = () => {
    setDisplaySection(false);
    props.hideOrderForm();
  }
  
  const handleInputValues = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      case 'time':
        setTime(e.target.value);
        break;
    }
  }

  const handleOrderSubmit = e => {
    e.preventDefault();

    const orderRef = {
      firstName,
      lastName,
      email,
      phoneNumber,
      date,
      time,
      basketItems
    }

    fetch('/api/commandes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderRef)
    })
      .then(res => res.json())
      .then(data => setOrderConfirmation(data.orderId))
      .catch(err => console.log(err));
  }

  const backToHomePage = () => {
    props.hideOrderForm();
    setDisplaySection(false);
    setOrderConfirmation(null);
    setBasketItems([]);
  }

  return (
    <>
      <Head>
        <title>Crêperie Augustine | Click & Collect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Commandez en ligne dans l'une de nos deux crêperies Parisiennes, et venez récupérer directement votre repas une fois prêt !"
        />
      </Head>
      <Menu
        isSelected={4}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="./images/food/augustine.jpeg"
        title="Click & Collect"
      />
      
      <CnCMenuSection>
        <h2>Parcourez<br /><em>la carte Augustine</em></h2>
        <Categories 
          isSelected={isSelected} 
          handleClick={handleClick}
          isCnC={true}
        />
        <OrderResults
          isSelected={isSelected}
          selectedFood={selectedFood}
          isCategorySelected={isCategorySelected}
          handleCategoryClick={handleCategoryClick}
          addToBasket={addToBasket}
        />
        <Basket 
          basketItems={basketItems}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          deleteItem={deleteItem}
          handleOrder={handleOrder}
        />
      </CnCMenuSection>
      <Footer />
      <Basket 
        isBasketDisplayed={isBasketDisplayed}
        basketItems={basketItems}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        deleteItem={deleteItem}
        handleOrder={handleOrder}
      />
      <BasketButton onClick={toggleBasket}>
        Mon panier
          {basketItems.length > 1
            ? ` (${basketItems.reduce((r, b) => {
              return r + b.quantity
              }, 0)} articles)` 
            : basketItems.length === 1
              ? basketItems[0].quantity > 1 
                ? ` (${basketItems[0].quantity} articles)`
                : ` (1 article)`
              : null
          }
      </BasketButton>
      <OrderInfo
        displaySection={displaySection}
        todayDate={todayDate}
        backToBasket={backToBasket}
        handleInputValues={handleInputValues}
        handleOrderSubmit={handleOrderSubmit}
        basketItems={basketItems}
        orderConfirmation={orderConfirmation}
        hideOrderForm={props.hideOrderForm}
        backToHomePage={backToHomePage}
      />
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

export default ClicknCollect;
