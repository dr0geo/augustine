import styled from 'styled-components';

import { Section } from '@/elements/Divs';

const StyledDiv = styled.div`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px lightgray;
  display: flex;
  flex-direction: column;
  margin: auto;
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
  }
  & > p {
    font-weight: 600;
  }
  @media only screen and (min-width: 1200px) {
    &:hover {
      transform: scale(1.02);
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
      <ul>
        {selectedPosts !== undefined && selectedPosts.map(post => (
          <li key={post.id}>
            <StyledDiv>
              <StyledAnchor
                href={post.permalink}
                rel="noopener, noreferrer"
                target="_blank"
              >
                <img src={post.media_url || post.thumbnail_url} alt="" height={300} width={300} />
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
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Share;
