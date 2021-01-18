import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (req, res) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let confirmation;
  let query;

  if (req.body.type === 'order') {
    const orderItems = req.body.orderRef.basketItems.map(item => `${item.name} (x${item.quantity})`);

    confirmation = {
      from: '"Crêperie Augustine" <contact@creperie-augustine.com>',
      to: `${req.body.orderRef.email}`,
      subject: "Crêperie Augustine - Votre commande !",
      html: `
        <p>${req.body.orderRef.firstName},</p>
        <br />
        <p>Merci pour votre commande ! Celle-ci a bien été prise en compte avec la référence <strong>${req.body.orderId}</strong>.</p>
        <p>Voici un récapitulatif des informations liées à votre commande :</p>
        <ul>
          <li>Date souhaitée de retrait de la commande : ${(new Date(req.body.orderRef.date)).toLocaleDateString('fr-FR')}</li>
          <li>Heure souhaitée de retrait de la commande : ${req.body.orderRef.time}</li>
          <li>Articles : ${orderItems.join(', ')}</li>
          <li>Total à régler sur place: ${req.body.orderRef.price.toFixed(2)}€</li>
        </ul>
        <p>Nous vous remercions pour votre commande et espérons vous revoir très vite chez nous !</p>
        <br />
        <p>L'équipe de la <a href="https://creperie-augustine.com" target="_blank">crêperie Augustine</a>.</p>
      `
    }

  } else if (req.body.type === 'booking') {
    confirmation = {
      from: '"Crêperie Augustine" <contact@creperie-augustine.com>',
      to: `${req.body.bookingRef.email}`,
      subject: "Crêperie Augustine - Votre réservation !",
      html: `
        <p>${req.body.bookingRef.firstName},</p>
        <br />
        <p>Merci pour votre réservation ! Celle-ci a bien été prise en compte avec la référence <strong>${req.body.bookingId}</strong>.</p>
        <p>Voici un récapitulatif des informations liées à votre réservation :</p>
        <ul>
          <li>Nom de la réservation : ${req.body.bookingRef.lastName}</li>
          <li>Nombre de convives : ${req.body.bookingRef.people}</li>
          <li>Date : ${(new Date(req.body.bookingRef.date)).toLocaleDateString('fr-FR')}</li>
          <li>Heure : ${req.body.bookingRef.time}</li>
        </ul>
        <p>Nous vous remercions pour votre réservations et vous attendons avec impatience chez nous !</p>
        <br />
        <p>L'équipe de la <a href="https://creperie-augustine.com" target="_blank">crêperie Augustine</a>.</p>
      `
    }
  } else if (req.body.type === 'contact') {
    confirmation = {
      from: '"Crêperie Augustine" <contact@creperie-augustine.com>',
      to: `${req.body.query.email}`,
      subject: "Crêperie Augustine - Votre demande !",
      html: `
        <p>${req.body.query.firstName},</p>
        <br />
        <p>Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
        <br />
        <p>Merci pour votre message !</p>
        <br />
        <p>A très bientôt !</p>
        <br />
        <p>L'équipe de la <a href="https://creperie-augustine.com" target="_blank">crêperie Augustine</a>.</p>
      `
    }
    
    query = {
      from: `${req.body.query.email}`,
      to: 'geoffroy.vie@gmail.com',
      subject: "Contact via le site Augustine",
      html:`
        <p>Bonjour,</p>
        <br />
        <p>Vous avez reçu un message via le formulaire de contact du site web de la crêperie Augustine.</p>
        <h4>Nom du contact :</h4>
        <p>${req.body.query.firstName} ${req.body.query.lastName}</p>
        <h4>E-mail du contact :</h4>
        <p>${req.body.query.email}</p>
        <h4>Téléphone du contact (si renseigné) :</h4>
        <p>${req.body.query.phoneNumber}</p>
        <h4>Demande du contact :</h4>
        <p>${req.body.query.message}</p>
        `
    }
  }

  try {
    // Send customer confirmation:
    await transporter.sendMail(confirmation);

    // Send customer query to restaurant:
    if (req.body.type === 'contact') {
      await transporter.sendMail(query);
    }

    res.status(200).end();
  } catch {
    res.status(400).end();
  }
}

export default sendConfirmationEmail;
