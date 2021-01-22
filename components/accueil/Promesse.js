import styled from 'styled-components';
import Image from 'next/image';

import { Section } from '@/elements/Divs';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: auto;
  max-width: 1200px;
`;

const PromessCard = styled.div`
  background: none;
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
  width: 250px;
  & figure {
    margin: 10px auto;
    width: 100%;
  }
  & .image {
    align-items: center;
    background: white;
    border-radius: 100%;
    display:flex;
    height: 70px;
    justify-content: center;
    margin: auto;
    width: 70px;
  }
  & figcaption {
    margin-top: 20px;
    text-align: center;
  }
`;

const Promesse = () => {
  return (
    <Section bgColor="#fcf3ea">
      <h2>
        La promesse
        <br />
        <span className="cursive">Augustine</span>
      </h2>
      <CardsContainer>
        <PromessCard>
          <figure>
            <div className="image">
              <Image
                src="/images/icons/wheat-sack.webp"
                alt="Sac de blé"
                height={50}
                width={50}
              />
            </div>
            <figcaption>
              Nos farines sont issues de l’agriculture biologique française
            </figcaption>
          </figure>
        </PromessCard>
        <PromessCard>
          <figure>
            <div className="image">
              <Image
                src="/images/icons/eggs.webp"
                alt="Oeufs frais"
                height={50}
                width={50}
              />
            </div>
            <figcaption>
              Des oeufs bio pondus en France
            </figcaption>
          </figure>
        </PromessCard>
        <PromessCard>
          <figure>
            <div className="image">
              <Image
                src="/images/icons/bio.webp"
                alt="Logo Bio"
                height={50}
                width={50}
              />
            </div>
            <figcaption>Des recettes élaborées par notre cheffe normande</figcaption>
          </figure>
        </PromessCard>
      </CardsContainer>
    </Section>
  );
};

export default Promesse;
