import { useState } from 'react';
import styled from 'styled-components';

interface MenuInterface {
    selectedOption: (value : string) => void;
}

enum MenuOptionEnum {
    Popular = 'popular',
    Upcoming = 'upcoming'
}

export const Menu = ({selectedOption} : MenuInterface) => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
      <>
        <BurgerMenu onClick={()=> setMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </BurgerMenu>
        <MenuWrapper className={isMenuOpen ? 'open' : ''}>
            <div>
            <MenuOption onClick={()=> selectedOption(MenuOptionEnum.Popular)}>
                Popular
            </MenuOption>
            <MenuOption onClick={()=> selectedOption(MenuOptionEnum.Upcoming)}>
                Popular
            </MenuOption>
            </div>
        </MenuWrapper>
      </>
    )
}

const BurgerMenu = styled.label`
    display:flex;
    flex-direction:column;
    width: 40px;
    cursor:pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1001;
    span {
        background-color: ${({ theme }) => theme.colors.blue};
        height:7px;
        margin: 5px 0;
        &:nth-of-type(1){
            width:50%;
        }
        &:nth-of-type(2){
        width:100%;
        }
        &:nth-of-type(3){
        width:75%;
        }
    }
`;

const MenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: -100vh;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.black};
    transition: all 0.5s;
    &.open {
        top: 0;
    }
`;

const MenuOption = styled.p`
    background-color: ${({ theme }) => theme.colors.blue};
`;