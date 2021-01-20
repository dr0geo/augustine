import Image from 'next/image';

import { Section, FlexDiv } from '@/elements/Divs';
import { PromessCard } from '@/elements/Cards';

const Promesse = () => {
  return (
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
                src="/images/icons/wheat-sack.webp"
                alt="Sac de blé"
                height={50}
                width={50}
              />
            </div>
          </figure>
          <figcaption>
            Nos farines sont issues de l’agriculture biologique française
          </figcaption>
        </PromessCard>
        <PromessCard>
          <figure>
            <div>
              <Image
                src="/images/icons/eggs.webp"
                alt="Oeufs frais"
                height={50}
                width={50}
              />
            </div>
          </figure>
          <figcaption>
            Des oeufs bio pondus en France
          </figcaption>
        </PromessCard>
        <PromessCard>
          <figure>
            <div>
              <Image
                src="/images/icons/bio.webp"
                alt="Logo Bio"
                height={50}
                width={50}
              />
            </div>
          </figure>
          <figcaption>Des recettes élaborées par notre cheffe normande</figcaption>
        </PromessCard>
      </FlexDiv>
    </Section>
  );
};

export default Promesse;
