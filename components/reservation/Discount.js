import styled from 'styled-components';

const InfoParag = styled.p`
  margin: 30px auto;
  & > a {
    border-bottom: 1px solid black;
    color: black;
  }
`;

const ReducParag = styled.p`
  border: 1px solid #ac6c14;
  color: #ac6c14;
  margin: 30px auto;
  max-width: 1000px;
  padding: 10px;
  & strong {
    font-weight: 600;
  }
`;

const Discount = () => {
  return (
    <>
      <InfoParag>Pour toute réservation de plus de 8 personnes, ou pour privatiser la crêperie, contactez-nous directement par <a href="tel:+33183929448">téléphone</a> ou par le <a href="/contact">formulaire</a> du site.</InfoParag>
      <ReducParag>Pour toute réservation un dimanche, lundi ou mardi, obtenez <strong>20% de réduction</strong> sur votre addition !</ReducParag>
    </>
  );
}

export default Discount;
