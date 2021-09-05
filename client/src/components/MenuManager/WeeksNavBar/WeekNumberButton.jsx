import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'


const WeekNumber = styled(animated.label)`
    font-family: "Times New Roman", Times, serif;
    font-size: 2rem;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
`;

function WeekNumberButton(props) {
    const { children, selected, outter, inner } = props;

    const textColor = outter ? "lightgrey" : (inner ? "grey" : "black");
    const rotation = outter ? "scale(0.5,0.8)" : (inner ? "scale(0.7,0.9)" : "");

    const spring = useSpring({
        color: textColor,
        transform: rotation,
    })

    return (
        <WeekNumber style={spring}>
            {children}
        </WeekNumber>
    )
}

export default WeekNumberButton
