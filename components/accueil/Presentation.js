import { Section, FlexDiv } from '@/elements/Divs';
import { RestaurantCard } from '@/elements/Cards';
import { BlackButton } from '@/elements/Buttons';
import Image from 'next/image';

const Presentation = () => {
  return (
    <Section bgColor="white">
      <h2>
        Découvrez notre
        <br />
        <em>restaurant parisien</em>
      </h2>
      <FlexDiv>
        <RestaurantCard>
          <Image src="/images/restaurant/stairs.webp" alt="" height={250} width={250} objectFit="cover" quality={100} className="round-border" />
          <div>Végétal</div>
        </RestaurantCard>
        <RestaurantCard>
          <Image src="/images/restaurant/downstairs.webp" alt="" height={250} width={250} objectFit="cover" quality={100} className="round-border" />
          <div>Chaleureux</div>
        </RestaurantCard>
        <RestaurantCard>
          <Image src="/images/restaurant/upstairs.webp" alt="" height={250} width={250} objectFit="cover" quality={100} className="round-border" />
          <div>Gourmand</div>
        </RestaurantCard>
      </FlexDiv>
      <p>
        Venez déguster les crêpes et galettes Augustine dans le 1er arrondissement de Paris. Notre restaurant a été entièrement rénové, et n’attend que vous !
      </p>
      <BlackButton
        href="https://goo.gl/maps/MPwfHjV2Acxp852R9"
        rel="noopener, noreferrer"
        target="_blank"
      >
        Voir sur la carte
      </BlackButton>
    </Section>
  );
};

export default Presentation;
