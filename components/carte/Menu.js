import styled from 'styled-components';

import Categories from '@/components/carte/Categories';
import Results from '@/components/carte/Results';

const MenuSection = styled.section`
  @media only screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
    margin: 30px auto;
    max-width: 1160px;
  }
`;

const Menu = props => {
  return (
    <MenuSection>
      <Categories isSelected={props.isSelected} handleClick={props.handleClick} />
      <Results
        isSelected={props.isSelected}
        selectedFood={props.selectedFood} 
        isCategorySelected={props.isCategorySelected}
        handleCategoryClick={props.handleCategoryClick}
      />
    </MenuSection>
  );
}

export default Menu;
