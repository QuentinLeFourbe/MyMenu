import React, { useState } from 'react'
import styled from 'styled-components'
import { animated, config, useSpring } from 'react-spring'

const MealButton = styled(animated.button)`
    /* margin: 0.3rem; */
    border: none;
    padding: 0.5rem;
    background: white;
    font-size: 1rem;
    cursor: pointer;
`;

function MealListItem({ mealId, children, addMealHandler })
{
    const [isHovered, setIsHovered] = useState(false);

    const addMeal = () =>
    {
        addMealHandler(mealId);
    }

    const onMouseEnter = () =>
    {
        setIsHovered(true);
    }

    const onMouseLeave = () =>
    {
        setIsHovered(false);
    }

    const spring = useSpring({
        backgroundColor: isHovered ? "#f1f1f1" : "white",
        config: config.tight
    })

    return (
        <MealButton style={spring} onMouseDown={addMeal} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}  >
            {children}
        </MealButton>
    )
}

export default MealListItem
