import styled from 'styled-components';
import Image from 'next/image';

import { Section } from '@/elements/Divs';
import { Button } from '@/elements/Buttons';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  @media only screen and (min-width: 1200px) {
    justify-content: space-around;
    max-width: 1200px;
  }
`;

const RestaurantCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 250px;
  margin: 20px 20px;
  width: 250px;
  & .image {
    border-radius: 5px 5px 0 0;
  }
  & .caption{
    align-items: center;
    background-color: hsl(213deg, 98%, 21%, 0.8);
    border-radius: 0 0 5px 5px;
    color: white;
    display: flex;
    font-family: 'Dancing-Script', Georgia, serif;
    font-size: 1.3rem;
    height: 50px;
    justify-content: center;
  }
`;

const IntroductionParag = styled.p`
  margin: 20px auto;
`;

const Presentation = () => {
  return (
    <Section bgColor="white">
      <h2>
        Découvrez notre
        <br />
        <span className="cursive">restaurant parisien</span>
      </h2>
      <CardsContainer>
        <RestaurantCard>
          <Image
            src="/images/restaurant/stairs.webp"
            alt=""
            height={250}
            width={250}
            objectFit="cover"
            quality={100}
            className="image"
          />
          <div className="caption">Végétal</div>
        </RestaurantCard>
        <RestaurantCard>
          <Image
            src="/images/restaurant/downstairs.webp"
            alt=""
            height={250}
            width={250}
            objectFit="cover"
            quality={100}
            className="image"
          />
          <div className="caption">Chaleureux</div>
        </RestaurantCard>
        <RestaurantCard>
          <Image
            src="/images/restaurant/upstairs.webp"
            alt=""
            height={250}
            width={250}
            objectFit="cover"
            quality={100}
            className="image"
          />
          <div className="caption">Gourmand</div>
        </RestaurantCard>
      </CardsContainer>
      <IntroductionParag>
        Venez déguster les crêpes et galettes Augustine dans le 1er
        arrondissement de Paris. Notre restaurant a été entièrement rénové, et
        n’attend que vous !
      </IntroductionParag>
      <Button
        bgColor="#012f6a"
        borderColor="#012f6a"
        color="#fff"
        href="https://goo.gl/maps/MPwfHjV2Acxp852R9"
        rel="noopener, noreferrer"
        target="_blank"
      >
        Voir sur la carte
      </Button>
    </Section>
  );
};

export default Presentation;
