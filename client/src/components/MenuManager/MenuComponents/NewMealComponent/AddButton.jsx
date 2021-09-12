import React, { useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring';
import AddIcon from '@material-ui/icons/Add';

const Button = styled(animated.button)`
    border: 1px black dashed;
    background-color: white;
    margin: 8px;
    cursor: pointer;
`;

function AddButton({ onClickHandler })
{
    const [hovered, setHovered] = useState(false)

    const spring = useSpring({
        color: hovered ? '#3fb13f' : 'black',
        // backgroundColor:  hovered ? '#3fb13f' : 'white',
        borderColor: hovered ? '#3fb13f' : 'black',
        y: hovered ? -2 : 0,
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
            <AddIcon fontSize="large" />
        </Button>
    )
}

export default AddButton
