import Head from 'next/head';

import Header from '@/components/Header';
import ContactForm from '@/components/contact/ContactForm';
import Footer from '@/components/Footer';

const Contact = props => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine | Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Contactez-nous via notre formulaire en ligne pour toute question relative à notre crêperie Parisienne, nous vous répondrons dans les plus brefs délais."
        />
      </Head>
      <Header
        isSelected={5}
        isClicked={props.isClicked}
        toggleMenu={props.toggleMenu}
        hideMenu={props.hideMenu}
        bg="./images/background/contact.webp"
        title="Contact"
      />
      <h2>Envoyez-nous<br /><span className="cursive">votre demande</span></h2>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Contact;
