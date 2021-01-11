import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let confirmation;

  if (req.body.type === 'CnC') {
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
          <li>Restaurant de retrait : Paris ${req.body.orderRef.restaurant}</li>
          <li>Date souhaitée de retrait de la commande : ${(new Date(req.body.orderRef.date)).toLocaleDateString('fr-FR')}</li>
          <li>Heure souhaitée de retrait de la commande : ${req.body.orderRef.time}</li>
          <li>Articles : ${orderItems.join(', ')}</li>
          <li>Total à régler sur place: ${req.body.orderRef.price.toFixed(2)}€</li>
        </ul>
        <p>Nous vous remercions pour votre commande et espérons vous revoir très vite chez nous !</p>
        <br />
        <p>L'équipe de la Crêperie Augustine.</p> 
      `
    }

  } else {
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
          <li>Restaurant : Augustine Paris ${req.body.bookingRef.restaurant}</li>
          <li>Nom de la réservation : ${req.body.bookingRef.lastName}</li>
          <li>Nombre de convives : ${req.body.bookingRef.people}</li>
          <li>Date : ${(new Date(req.body.bookingRef.date)).toLocaleDateString('fr-FR')}</li>
          <li>Heure : ${req.body.bookingRef.time}</li>
        </ul>
        <p>Nous vous remercions pour votre réservations et vous attendons avec impatience chez nous !</p>
        <br />
        <p>L'équipe de la Crêperie Augustine.</p> 
      `
    }
  }

  await transporter.sendMail(confirmation)
    .catch(error => console.log(error));
  res.status(200).end();
}

export default sendConfirmationEmail;
