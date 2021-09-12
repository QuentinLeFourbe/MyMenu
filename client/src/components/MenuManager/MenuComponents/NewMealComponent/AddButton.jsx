import React, { useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring';
import AddIcon from '@material-ui/icons/Add';

const Button = styled(animated.button)`
    border: 1px black dashed;
    background-color: white;
    cursor: pointer;
    width: 100%;
    margin: 8px;
`;

const Container = styled(animated.div)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

function AddButton({ onClickHandler, springStyle })
{
    const [hovered, setHovered] = useState(false)

    const spring = useSpring({
        color: hovered ? '#3fb13f' : 'black',
        // backgroundColor:  hovered ? '#3fb13f' : 'white',
        borderColor: hovered ? '#3fb13f' : 'black',
        // y: hovered ? -2 : 0,
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
        <Container style={springStyle}>
            <Button style={spring} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClickHandler}>
                <AddIcon fontSize="large" />
            </Button>
        </Container>
    )
}

export default AddButton
