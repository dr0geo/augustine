import styled from 'styled-components';
import Image from 'next/image';

import { Section } from '@/elements/Divs';

const GridWrapper = styled.div`
  background-color: hsla(0deg, 0%, 100%, 0.6);
  border-radius: 5px;
  margin: 0 auto;
  max-width: 330px;
  padding: 15px;
  & > h2 {
    margin-bottom: 50px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 660px;
    padding: 30px;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 860px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  margin: 0 auto;
  & > .grid-item {
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    text-align: center;
    width: 150px;
    & > h3 {
      color: #012f6a;
      font-size: 1rem;
      margin-bottom: 0;
      margin-top: 0;
      padding: 5px;
    }
    & > p {
      font-size: 0.85rem;
      margin-bottom: 0;
      margin-top: 0;
      padding: 5px;
    }
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 150px);

    /* Reorganize the grid items in correct order when modifying grid layout */
    & > .grid-item:nth-of-type(3) {
      order: 4;
    }
    & > .grid-item:nth-of-type(4) {
      order: 3;
    }
    & > .grid-item:nth-of-type(5) {
      order: 6;
    }
    & > .grid-item:nth-of-type(6) {
      order: 5;
    }
    & > .grid-item:nth-of-type(7) {
      order: 7;
    }
    & > .grid-item:nth-of-type(8) {
      order: 8;
    }
    & > .grid-item:nth-of-type(9) {
      order: 9;
    }
    & > .grid-item:nth-of-type(10) {
      order: 10;
    }
    & > .grid-item:nth-of-type(11) {
      order: 12;
    }
    & > .grid-item:nth-of-type(12) {
      order: 11;
    }
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 200px);
    & > .grid-item {
      height: 200px;
      width: 200px;
      & > h3 {
        font-size: 1.1rem;
        padding: 10px;
      }
      & > p {
        font-size: 0.95rem;
        padding: 10px;
      }
    }
  }
`;

const RecipesGrid = () => {
  return (
    <Section bgUrl="/images/background/grid-bg.webp">
      <GridWrapper>
        <h2>
          Nos
          <br />
          <span className="cursive">recettes</span>
        </h2>
        <Grid>
          <div className="grid-item">
            <h3>Fourme d'ambert</h3>
            <p>Fourme d’Ambert AOP, Bacon, Oignons confits</p>
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/salade.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/bretonne.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <h3>Bretonne</h3>
            <p>
              Pommes caramélisées, Caramel au beurre salé, Glace vanille,
              Chantilly
            </p>
          </div>
          <div className="grid-item">
            <h3>Augustine</h3>
            <p>Chocolat blanc, Coulis de framboise, Chantilly, Basilic</p>
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/augustine.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/danube.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <h3>Salade Danube</h3>
            <p>
              Saumon fumé, oeuf poché bio, chèvre, tomates cerises, aneth,
              pousses d’épinards et sa petite gaufre
            </p>
          </div>
          <div className="grid-item">
            <h3>Forestière</h3>
            <p>
              Emincé de poulet, Oeuf bio, Emmental, Crème de champignons,
              Oignons confits
            </p>
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/forestiere.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <Image
              src="/images/food/raclette.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div className="grid-item">
            <h3>Raclette</h3>
            <p>Raclette, Jambon au torchon, Pommes de terres, Crème fraîche</p>
          </div>
        </Grid>
      </GridWrapper>
    </Section>
  );
};

export default RecipesGrid;
