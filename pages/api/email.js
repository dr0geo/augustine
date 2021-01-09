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
        <h1>Votre commande est validée !</h1>
        <p>${req.body.orderRef.firstName},<br />
        Merci pour votre commande ! Celle-ci a bien été prise en compte avec la référence <strong>${req.body.orderId}</strong>.</p>
        <p>Voici un récapitulatif des informations liées à votre commande :</p>
        <ul>
          <li>Date souhaitée de retrait de la commande : ${(new Date(req.body.orderRef.date)).toLocaleDateString('fr-FR')}</li>
          <li>Heure souhaitée de retrait de la commande : ${req.body.orderRef.time}</li>
          <li> Articles: ${orderItems.join(', ')}</li>
        </ul>
        <p>Nous vous remercions pour votre commande et espérons vous revoir très vite chez nous !</p>
        <br />
        <p>L'équipe de la Crêperie Augustine.</p> 
      `
    }
  }

  await transporter.sendMail(confirmation);

  res.status(200).end();
}

export default sendConfirmationEmail;
