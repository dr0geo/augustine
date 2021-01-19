import styled from 'styled-components';

import { Section } from '@/elements/Divs';

const Container = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 40px auto 30px auto;
  max-width: 1200px;
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

const StyledDiv = styled.li`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px lightgray;
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 300px;
  padding: 0;
  transition: transform 0.2s ease-in-out;
  & img {
    border-radius: 5px 5px 0 0;
    display: block;
    margin: auto;
  }
  & > a > p {
    font-size: 0.85rem;
    margin: 10px auto;
  }
  & > p {
    font-weight: 600;
    padding: 10px 0;
  }
  & + & {
    margin-top: 50px;
  }
  @media only screen and (min-width: 1200px) {
    & + & {
      margin-top: 0px;
    }
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
        <em>votre expérience</em>
      </h2>
      <Container>
        {selectedPosts !== undefined &&
          selectedPosts.map(post => (
            <StyledDiv key={post.id}>
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
            </StyledDiv>
          ))}
      </Container>
    </Section>
  );
};

export default Share;
