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
      <Categories selectedMainFood={props.selectedMainFood} handleClick={props.handleClick} />
      <Results
        selectedMainFood={props.selectedMainFood}
        selectedFood={props.selectedFood} 
        selectedSubFood={props.selectedSubFood}
        handleCategoryClick={props.handleCategoryClick}
      />
    </MenuSection>
  );
}

export default Menu;
