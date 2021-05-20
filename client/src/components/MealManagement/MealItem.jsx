import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const MealContainer = styled(animated.a)`
    &::before{
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        border-radius: 1rem;
        background-color:transparent;
        top: 0;
        left: 0;
        opacity:0.5;
    }

    &:hover:before{
        /* background-color: #f3f3f3; */
    }

    text-decoration: none;
    display:flex;
    min-height: 300px;
    border-radius: 1rem;
    background-size: cover;
    background-image: url('/api/${props => props.image}');
    background-position: center; 
    position: relative;
`;

const ItemLabel = styled.label`
&::before{
        content: "";
        height: 100%;
        width: 100%;
        border-radius: 0rem 0rem 1rem 1rem;
        background-color: #838383;
        position: absolute;
        top: 0;
        left: 0;
        opacity:0.5;
        z-index: -1;
    }

    color: white;
    flex-grow:1;
    align-self: flex-end;
    position: relative;
    padding:0.5rem;
    z-index: 1;
`;

function MealItem(props) {
    const { onClickCb, image, name } = props;
    const [isHovered, setIsHovered] = useState(false);
    const spring = useSpring({
        from: {
            opacity: 1,
            y: 0,
        },
        opacity: isHovered ? 0.3 : 1,
        y: isHovered ? -5 : 0,
    })

    const mouseEnter = () => {
        setIsHovered(true);
    }

    const mouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <MealContainer style={spring} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}
            href="#"
            onClick={onClickCb}
            image={image}>
            <ItemLabel>{name}</ItemLabel>
        </MealContainer>
    )
}

export default MealItem
