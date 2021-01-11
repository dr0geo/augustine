import Image from 'next/image';

import { GridDiv, GridWrapper, Section } from '@/elements/Divs';

const Grid = () => {
  return (
    <Section bgUrl="/images/background/grid-bg.webp">
      <GridWrapper>
        <h2>
          Venez déguster
          <br />
          <em>nos plats</em>
        </h2>
        <GridDiv>
          <div>
            <h3>Fourme d'ambert</h3>
            <p>Fourme d’Ambert AOP, Bacon, Oignons confits</p>
          </div>
          <div>
            <Image
              src="/images/background/grid-bg.webp"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <Image
              src="/images/food/bretonne.jpeg"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <h3>Bretonne</h3>
            <p>
              Pommes caramélisées, Caramel au beurre salé, Glace vanille,
              Chantilly
            </p>
          </div>
          <div>
            <h3>Augustine</h3>
            <p>Chocolat blanc, Coulis de framboise, Chantilly, Basilic</p>
          </div>
          <div>
            <Image
              src="/images/food/augustine.jpeg"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <Image
              src="/images/food/danube.jpeg"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <h3>Salade Danube</h3>
            <p>
              Saumon fumé, oeuf poché bio, chèvre, tomates cerises, aneth,
              pousses d’épinards et sa petite gaufre
            </p>
          </div>
          <div>
            <h3>Forestière</h3>
            <p>
              Emincé de poulet, Oeuf bio, Emmental, Crème de champignons,
              Oignons confits
            </p>
          </div>
          <div>
            <Image
              src="/images/food/forestiere.jpeg"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <Image
              src="/images/food/raclette.jpeg"
              alt=""
              height={200}
              width={200}
            />
          </div>
          <div>
            <h3>Raclette</h3>
            <p>Raclette, Jambon au torchon, Pommes de terres, Crème fraîche</p>
          </div>
        </GridDiv>
      </GridWrapper>
    </Section>
  );
};

export default Grid;
