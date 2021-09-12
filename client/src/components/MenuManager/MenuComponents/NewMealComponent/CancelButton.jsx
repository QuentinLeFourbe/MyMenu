import React, { useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring';
import CancelIcon from '@material-ui/icons/Cancel';

const Button = styled(animated.button)`
    margin-left: 1rem;
    border: none;
    background-color: transparent;
    margin: 0px;
    padding: 0px;
    margin-left: 1rem;
    cursor: pointer;
`;

function CancelButton({ onClickHandler })
{
    const [hovered, setHovered] = useState(false)

    const spring = useSpring({
        color: hovered ? '#cc3c3c' : '#ff4a4a',
        // backgroundColor:  hovered ? '#3fb13f' : 'white',
        // borderColor: hovered ? '#ff4a4a' : 'black',
        // x: hovered ? 0 : 0,
        config: config.tight,
    })

    const onMouseEnter = () =>
    {
        setHovered(true);
    }

    const onMouseLeave = () =>
    {
        setHovered(false);
    }

    return (
        <Button style={spring} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClickHandler}>
            <CancelIcon fontSize="large" />
        </Button>
    )
}

export default CancelButton
