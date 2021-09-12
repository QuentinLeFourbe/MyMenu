import React, { useState } from 'react'
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';


const ArrowButton = styled(animated.button)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:2rem;
    @media (max-width: 600px){
        font-size: 1.5rem;
    }
    padding: 0px;
    border: none;
    background: none;
    /* border-radius: 50%; */
    padding: 0.5rem;
    cursor: pointer;
`;

function WeekNavArrow(props) {
    const { children, onClick } = props;
    const [isHovered, setIsHovered] = useState(false);

    const spring = useSpring({
        color: isHovered ? '#ff6f61' : 'black',
        // backgroundColor: isHovered ? '#ff6f61' : 'transparent',
        config: config.tight,
        transform: isHovered ? 'scale(1.2,1.2)' : 'scale(1,1)',
    })

    const onMouseEnter = () => {
        setIsHovered(true);
    }

    const onMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <ArrowButton style={spring} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </ArrowButton>
    )
}

export default WeekNavArrow
