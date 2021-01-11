import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px auto;
  padding: 0 30px;

  @media only screen and (min-width: 520px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: 260px;
    height: 450px;
    margin-top: ${props => props.isCnC ? '30px' : '0'};
  }
`;

const FlexDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const ImageDiv = styled.div`
  display: none;
  @media only screen and (min-width: 1200px) {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    width: 80px;
  }
`;

const Category = styled.button`
  background-color: ${props => (props.isSelected ? '#012f6a' : 'white')};
  border: 1px solid ${props => (props.isSelected ? '#012f6a' : '#e3e9ef')};
  border-radius: 5px;
  color: ${props => (props.isSelected ? 'white' : 'black')};
  padding: 15px 10px;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  @media only screen and (min-width: 1200px) {
    ${props => props.isSelected && '& + div { opacity: 1 }'};
    width: 160px;
    @media (any-hover: hover) {
      &:hover {
        ${props => !props.isSelected && 'background-color: #e3e9ef'};
        cursor: pointer;
        & + div {
          opacity: 1;
        }
      }
    }
  }
`;

const Categories = props => {
  return (
    <Container isCnC={props.isCnC}>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 0}
          value={0}
          onClick={props.handleClick}
        >
          Entrées
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/entrees.webp"
            alt=""
            height={50}
            width={80}
          />
        </ImageDiv>
      </FlexDiv>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 1}
          value={1}
          onClick={props.handleClick}
        >
          Salades
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/salades.webp"
            alt=""
            height={50}
            width={80}
          />
        </ImageDiv>
      </FlexDiv>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 2}
          value={2}
          onClick={props.handleClick}
        >
          Galettes
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/galettes.webp"
            alt=""
            height={50}
            width={80}
          />
        </ImageDiv>
      </FlexDiv>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 3}
          value={3}
          onClick={props.handleClick}
        >
          Crêpes & Gaufres
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/crepes.webp"
            alt=""
            height={50}
            width={45}
          />
        </ImageDiv>
      </FlexDiv>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 4}
          value={4}
          onClick={props.handleClick}
        >
          Boissons
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/boissons.webp"
            alt=""
            height={50}
            width={50}
          />
        </ImageDiv>
      </FlexDiv>
      <FlexDiv>
        <Category
          isSelected={props.isSelected === 5}
          value={5}
          onClick={props.handleClick}
        >
          Menu
        </Category>
        <ImageDiv>
          <Image
            src="/images/icons/menu/menu.webp"
            alt=""
            height={50}
            width={60}
          />
        </ImageDiv>
      </FlexDiv>
    </Container>
  );
};

export default Categories;
