import { Section, FlexDiv } from '@/elements/Divs';
import { RestaurantCard } from '@/elements/Cards';
import { BlackButton } from '@/elements/Buttons';

const Presentation = () => {
  return (
    <Section bgColor="white">
      <h2>
        Découvrez nos deux
        <br />
        <em>restaurants parisiens</em>
      </h2>
      <FlexDiv>
        <RestaurantCard bgUrl="/images/restaurant/stairs.jpeg">
          <div>végétal</div>
        </RestaurantCard>
        <RestaurantCard bgUrl="/images/restaurant/upstairs.jpeg">
          <div>chaleureux</div>
        </RestaurantCard>
        <RestaurantCard bgUrl="/images/restaurant/downstairs.jpeg">
          <div>gourmand</div>
        </RestaurantCard>
      </FlexDiv>
      <p>
        Venez déguster les crêpes et galettes Augustine dans le 1er et le 8ème
        arrondissement de Paris. Nos deux restaurants ont été entièrement
        rénovés, et n’attendent que vous !
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
