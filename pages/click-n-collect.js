import Head from 'next/head';
import { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';

import { db } from '@/utils/firebase';
import Header from '@/components/Header';
import Categories from '@/components/carte/Categories';
import OrderResults from '@/components/click-n-collect/OrderResults';
import Basket, { BasketButton, BasketButtonOffset } from '@/components/click-n-collect/Basket';
import { CnCMenuSection } from '@/components/elements/Divs';
import OrderInfo from '@/components/click-n-collect/OrderInfo';
import Footer from '@/components/Footer';
import Spinner from '@/elements/Spinner';

const ClicknCollect = props => {
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

  // To display or hide the basket and manage its items:
  const [isBasketDisplayed, setIsBasketDisplayed] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  // Retrieve basket items when refreshing the page:
  useEffect(() => {
    if (sessionStorage.getItem('order')) {
      setBasketItems(JSON.parse(sessionStorage.getItem('order')));
    }
  }, []);

  // Save basket in session storage every time it changes:
  useEffect(() => {
    sessionStorage.setItem('order', JSON.stringify(basketItems));
  }, [basketItems]);
  
  const toggleBasket = () => {
    setIsBasketDisplayed(!isBasketDisplayed);
  }

  // Manage basket items quantity:
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
    // If the item is not already in the basket:
    if (!basketItems.some(item => item.name === foodName)) {
      food.quantity = 1;
      setBasketItems([
        ...basketItems,
        {
          name: foodName,
          price: foodName.includes('Gaufre') ? food.price + 1 : food.price,
          quantity: food.quantity,
          id: uuid()
        }
      ]);
      
    // If item is already in the basket:
    } else {
      // Iterate over basketItems array to find the already existing food:
      const newBasket = basketItems.map(food => {
        if (food.name === foodName) {
          food.quantity += 1
          return food;
        } else {
          return food;
        }
      });
      setBasketItems([...newBasket]);
    }
  }

  // Display order form:
  const [displayOrderForm, setDisplayOrderForm] = useState(false);

  // Personal information:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Date:
  const todayDate = new Date(Date.now());
  // Format date to an input readable date (YYYY-MM-DD):
  const formatedTodayDate = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`;

  const [date, setDate] = useState(formatedTodayDate);

  // Add 15 min of preparation to current time:
  const hours = todayDate.getHours();
  const minutes = todayDate.getMinutes();
  let timeToPickUpOrder;

  if (hours < 11 || (hours > 21 && minutes > 30)) {
    timeToPickUpOrder = '11:00';
  } else {
    const timeWithoutSecs = new Date(todayDate.setMinutes(todayDate.getMinutes() + 15)).toLocaleTimeString().split(':');
    timeWithoutSecs.pop();
    timeToPickUpOrder = timeWithoutSecs.join(':');
  }

  const [time, setTime] = useState(timeToPickUpOrder);

  const handleOrder = () => {
    setDisplayOrderForm(true);
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

  // Handle order submission:
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [errorInOrder, setErrorInOrder] = useState('');  
  
  const backToBasket = () => {
    setDisplayOrderForm(false);
    setErrorInOrder('');
  }

  // Handle app loading state:
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const price = basketItems.map(item => item.price * item.quantity).reduce((a, b) => a + b);

    const orderRef = {
      firstName,
      lastName,
      email,
      phoneNumber,
      date,
      time,
      basketItems,
      price
    }
    
    try {
      const ref = await db.collection('orders').add(orderRef);
      setOrderConfirmation(ref.id);
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: ref.id,
          orderRef,
          type: 'order'
        })
      });
    } catch {
      setErrorInOrder('Une erreur s\'est produite, veuillez réessayer... Si le problème persiste, n\'hésitez pas à nous contacter par téléphone !');
    } finally {
      setIsLoading(false);
    }
  }

  // Return to home page after order submission:
  const backToHomePage = () => {
    setIsBasketDisplayed(false);
    setDisplayOrderForm(false);
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
          content="Commandez en ligne dans notre crêperie Parisienne, et venez récupérer directement votre commande une fois prête !"
        />
      </Head>

      {isLoading && <Spinner />}

      <Header
        isSelected={4}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="./images/background/click-n-collect.webp"
        title="Click & Collect"
      />
      
      <CnCMenuSection>
        <h2>Parcourez<br /><span className="cursive">la carte Augustine</span></h2>
        <Categories 
          selectedMainFood={selectedMainFood} 
          handleClick={handleClick}
          isCnC={true}
        />
        <OrderResults
          selectedMainFood={selectedMainFood}
          selectedFood={selectedFood}
          selectedSubFood={selectedSubFood}
          handleCategoryClick={handleCategoryClick}
          addToBasket={addToBasket}
          isBasketDisplayed={isBasketDisplayed}
        />

        {/* Desktop basket */}
        <Basket 
          basketItems={basketItems}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          deleteItem={deleteItem}
          handleOrder={handleOrder}
        />
      </CnCMenuSection>
      <Footer
        isBasketDisplayed={isBasketDisplayed}
      />

      {/* Mobile basket */}
      <BasketButtonOffset />
      <Basket 
        isBasketDisplayed={isBasketDisplayed}
        basketItems={basketItems}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        deleteItem={deleteItem}
        handleOrder={handleOrder}
        isMobileBasket={true}
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

      {/* Validation step */}
      <OrderInfo
        displayOrderForm={displayOrderForm}
        todayDate={todayDate}
        backToBasket={backToBasket}
        handleInputValues={handleInputValues}
        handleOrderSubmit={handleOrderSubmit}
        basketItems={basketItems}
        orderConfirmation={orderConfirmation}
        backToHomePage={backToHomePage}
        time={time}
        errorInOrder={errorInOrder}
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

  retrieveData(dbDrinks, 'fraiches', fraiches);
  retrieveData(dbDrinks, 'chaudes', chaudes);
  
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
        { title: 'Chaudes', data: chaudes }
      ],
      formules
    },
    // Use ISR once a day:
    revalidate: 86400
  };
};

export default ClicknCollect;
