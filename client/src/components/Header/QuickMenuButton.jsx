import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import { useSpring, animated, config, useTransition, useTrail } from 'react-spring'

const MenuButtonContainer = styled(animated.button)`
    display:flex;
    align-items:center;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    font-size: 50px;
`;

function QuickMenuButton(props) {
    const { showMenu } = props;
    const [isHovered, setIsHovered] = useState(false);

    const spring = useSpring({
        color: isHovered ? "#ff6f61" : "black",
        config: config.tight,
    });

    

    return (
        <MenuButtonContainer style={spring}  >
            <MenuIcon fontSize='inherit' />
        </MenuButtonContainer>
    )
}

export default QuickMenuButton
