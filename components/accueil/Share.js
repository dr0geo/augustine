import styled from 'styled-components';

import { Section } from '@/elements/Divs';

const Container = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto 30px auto;
  max-width: 1200px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const InstaCard = styled.li`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px lightgray;
  display: flex;
  flex-direction: column;
  height: 450px;
  margin-top: 50px;
  padding: 0;
  transition: transform 0.2s ease-in-out;
  width: 300px;
  & img {
    border-radius: 5px 5px 0 0;
    display: block;
    margin: auto;
  }
  & > a > p {
    font-size: 0.85rem;
    margin: 10px auto;
    padding: 0 5px;
  }
  & > p {
    font-weight: 600;
    padding: 10px 0;
  }
  @media only screen and (min-width: 768px) {
    @media (any-hover: hover) {
      &:hover {
        transform: scale(1.02);
      }
    }
  }
`;

const StyledAnchor = styled.a`
  color: black;
  &:visited {
    color: black;
  }
`;

const Share = ({ posts }) => {
  const selectedPosts = posts.data?.slice(0, 3);
  return (
    <Section bgColor="white">
      <h2>
        Partagez
        <br />
        <span className="cursive">votre expérience</span>
      </h2>
      <Container>
        {selectedPosts !== undefined &&
          selectedPosts.map(post => (
            <InstaCard key={post.id}>
              <StyledAnchor
                href={post.permalink}
                rel="noopener, noreferrer"
                target="_blank"
              >
                <img
                  src={post.media_url || post.thumbnail_url}
                  alt=""
                  height={300}
                  width={300}
                  loading="lazy"
                />
                <p>{post.caption}</p>
              </StyledAnchor>
              <p>
                <StyledAnchor
                  href="https://www.instagram.com/creperieaugustine/"
                  rel="noopener, noreferrer"
                  target="_blank"
                >
                  @{post.username}
                </StyledAnchor>
              </p>
            </InstaCard>
          ))}
      </Container>
    </Section>
  );
};

export default Share;
