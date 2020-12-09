import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Menu from '@/components/Menu';
import { FlexDiv, GridDiv, GridWrapper, Section } from '@/elements/Divs';
import { RestaurantCard, PromessCard } from '@/elements/Cards';
import { BlackButton, WhiteButton } from '@/elements/Buttons';
import Footer from '@/components/Footer';

const Accueil = () => {
  return (
    <>
      <Head>
        <title>Crêperie Augustine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Menu isSelected={1} />

      <main>
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
            Venez déguster les crêpes et galettes Augustine dans le 1er et le
            8ème arrondissement de Paris. Nos deux restaurants ont été
            entièrement rénovés, et n’attendent que vous !
          </p>
          <BlackButton 
            href="https://goo.gl/maps/MPwfHjV2Acxp852R9"
            rel="noopener, noreferrer"
            target="_blank"
          >
            Voir sur la carte
          </BlackButton>
        </Section>

        <Section bgColor="#fcf3ea">
          <h2>
            La promesse
            <br />
            <em>Augustine</em>
          </h2>
          <FlexDiv>
            <PromessCard>
              <figure>
                <div>
                  <Image
                    src="/images/icons/wheat-sack.png"
                    alt="Sac de blé"
                    height={50}
                    width={50}
                  />
                </div>
              </figure>
              <figcaption>
                Une farine de blé sans additifs, issue de l’agriculture
                française
              </figcaption>
            </PromessCard>
            <PromessCard>
              <figure>
                <div>
                  <Image
                    src="/images/icons/eggs.png"
                    alt="Oeufs frais"
                    height={50}
                    width={50}
                  />
                </div>
              </figure>
              <figcaption>
                Des oeufs frais pondus en France et issus d’un élevage en plein
                air
              </figcaption>
            </PromessCard>
            <PromessCard>
              <figure>
                <div>
                  <Image
                    src="/images/icons/bio.png"
                    alt="Logo Bio"
                    height={50}
                    width={50}
                  />
                </div>
              </figure>
              <figcaption>
                Des produits bio respectant l’environnement
              </figcaption>
            </PromessCard>
          </FlexDiv>
        </Section>

        <Section bgUrl="/images/background/grid-bg.jpg">
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
                  src="/images/background/grid-bg.jpg"
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
                <p>
                  Raclette, Jambon au torchon, Pommes de terres, Crème fraîche
                </p>
              </div>
            </GridDiv>
          </GridWrapper>
        </Section>

        <Section bgColor="#012f6a">
          <h2>
            Réservez
            <br />
            <strong>votre table</strong>
          </h2>
          <FlexDiv>
            <PromessCard isWhite={true}>
              <figure>
                <div>
                  <Image
                    src="/images/icons/resto.png"
                    alt="Restaurant"
                    height={40}
                    width={50}
                  />
                </div>
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
                <div>
                  <Image
                    src="/images/icons/click-and-collect.png"
                    alt="Click & Collect"
                    height={50}
                    width={50}
                  />
                </div>
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
                <div>
                  <Image
                    src="/images/icons/uber-eats.png"
                    alt="Logo Bio"
                    height={50}
                    width={40}
                  />
                </div>
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

        <Section bgColor="white">
          <h2>
            Partagez
            <br />
            <em>votre expérience</em>
          </h2>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Accueil;
