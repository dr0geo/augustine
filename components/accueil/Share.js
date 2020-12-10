import styled from 'styled-components';

import { Section } from '@/elements/Divs';

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  & img {
    border-radius: 5px;
    display: block;
    margin: auto;
  }
  & > p {
    font-weight: 600;
  }
`;

const StyledAnchor = styled.a`
  color: black;
  &:visited {
    color: black;
  }
`;

const Share = ({ posts }) => {
  const selectedPosts = posts.data.slice(0, 3);
  return (
    <Section bgColor="white">
      <h2>
        Partagez
        <br />
        <em>votre expérience</em>
      </h2>
      <ul>
        {selectedPosts.map(post => (
          <li key={post.id}>
            <StyledDiv>
              <StyledAnchor
                href={post.permalink}
                rel="noopener, noreferrer"
                target="_blank"
              >
                <img src={post.media_url} alt="" height={250} width={250} />
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
