import React, { useState } from 'react'
import styled from 'styled-components'
import QuickMenuButton from './QuickMenuButton';
import QuickMenuContainer from './QuickMenuContainer';
import MenuIcon from '@material-ui/icons/Menu';
import { useSpring, animated, config, useTransition, useTrail } from 'react-spring'

const Container = styled.div`
margin-left: auto;
z-index: 1;
`;

const MenuButtonContainer = styled(animated.button)`
    display:flex;
    align-items:center;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    font-size: 50px;
    @media(max-width: 600px){
        font-size: 40px;
    }
`;

function QuickMenu()
{
    const [showMenu, setShowMenu] = useState(false);

    const menuTransition = useTransition(showMenu, {
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: { opacity: 0 },
    });

    const buttonMouseEnter = () =>
    {
        // setIsHovered(true);
        setShowMenu(true);
    }

    const buttonMouseLeave = () =>
    {
        // setIsHovered(false);
        setShowMenu(false);
    }

    return (
        <Container onMouseEnter={buttonMouseEnter} onMouseLeave={buttonMouseLeave}>
            {menuTransition((style, isMenuShowed) =>
                isMenuShowed ? (
                    <animated.div style={style}>
                        <QuickMenuContainer show={showMenu} />
                    </animated.div>
                )
                    :
                    (
                        <animated.div style={style}>
                            <MenuButtonContainer   >
                                <MenuIcon fontSize='inherit' />
                            </MenuButtonContainer>
                        </animated.div>
                    )
            )}


        </Container>
    )
}

export default QuickMenu
