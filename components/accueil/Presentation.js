import { Section, FlexDiv } from '@/elements/Divs';
import { RestaurantCard } from '@/elements/Cards';
import { BlackButton } from '@/elements/Buttons';

const Presentation = () => {
  return (
    <Section bgColor="white">
      <h2>
        Découvrez notre
        <br />
        <em>restaurant parisien</em>
      </h2>
      <FlexDiv>
        <RestaurantCard bgUrl="/images/restaurant/stairs.webp">
          <div>végétal</div>
        </RestaurantCard>
        <RestaurantCard bgUrl="/images/restaurant/upstairs.webp">
          <div>chaleureux</div>
        </RestaurantCard>
        <RestaurantCard bgUrl="/images/restaurant/downstairs.webp">
          <div>gourmand</div>
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
