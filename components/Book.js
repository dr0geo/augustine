import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import { FlexDiv, Section } from '@/elements/Divs';
import { PromessCard } from '@/elements/Cards';
import { WhiteButton } from '@/elements/Buttons';

const shakingAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(0px)
  }
  75% {
    transform: translateX(2px)
  }
`;

const ShakingDiv = styled.div`
  &:hover {
    animation: 0.1s ${shakingAnimation} 2;
  }
`;

const Book = () => {
  return (
    <Section bgColor="#012f6a">
      <h2>
        Réservez
        <br />
        <strong>votre table</strong>
      </h2>
      <FlexDiv>
        <PromessCard isWhite={true}>
          <figure>
            <ShakingDiv>
              <Image
                src="/images/icons/resto.png"
                alt="Restaurant"
                height={40}
                width={50}
              />
            </ShakingDiv>
          </figure>
          <figcaption>
            <h3>Réserver une table</h3>
            <p>dans l'un de nos deux restaurants à Paris</p>
            <Link href="/" passHref>
              <WhiteButton>J'y vais</WhiteButton>
            </Link>
          </figcaption>
        </PromessCard>
        <PromessCard isWhite={true}>
          <figure>
            <ShakingDiv>
              <Image
                src="/images/icons/click-and-collect.png"
                alt="Click & Collect"
                height={50}
                width={50}
              />
            </ShakingDiv>
          </figure>
          <figcaption>
            <h3>Click & Collect</h3>
            <p>nous vous appelons lorsque votre commande est prête</p>
            <Link href="/" passHref>
              <WhiteButton>J'y vais</WhiteButton>
            </Link>
          </figcaption>
        </PromessCard>
        <PromessCard isWhite={true}>
          <figure>
            <ShakingDiv>
              <Image
                src="/images/icons/uber-eats.png"
                alt="Logo Bio"
                height={50}
                width={40}
              />
            </ShakingDiv>
          </figure>
          <figcaption>
            <h3>Livraison à domicile</h3>
            <p>la carte d'Augustine à déguster chez vous</p>
            <Link href="/" passHref>
              <WhiteButton>J'y vais</WhiteButton>
            </Link>
          </figcaption>
        </PromessCard>
      </FlexDiv>
    </Section>
  );
};

export default Book;
