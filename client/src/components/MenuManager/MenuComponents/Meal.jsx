import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { updateMenu } from '../../../api';
import { AppContext } from '../../../AppContext';
import DeleteMealButton from './DeleteMealButton';
import { useSpring, animated, config } from 'react-spring';

const Container = styled(animated.div)`
    display: flex;
    margin: 8px;
    background-color: white;
    padding: 8px;
    border: ${props => props.isDragging ? "1px dashed lightgrey" : "1px solid lightgrey"};

`;

function Meal(props)
{
    const [isHovered, setIsHovered] = useState(false);
    const {mealName,mealId, isDragging, removeMealHandler} = props

    const spring = useSpring({
        color: (isHovered || isDragging) ? "#fda59c" : "black",
        // border: (isHovered || isDragging) ? "1px dashed lightgrey" : "1px solid lightgrey",
        // backgroundColor: (isHovered || isDragging) ? "#fda59c" : "white",
        config: config.tight,
    })

    const onMouseEnter = () =>
    {
        setIsHovered(true);
    }

    const onMouseLeave = () =>
    {
        setIsHovered(false);
    }

    const deleteMeal = () => {
        removeMealHandler(mealId)
    }

    return (
        <div
            {...props}
            ref={props.innerRef}
        >
            <Container
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={spring}
                isDragging = {isDragging}
            >
                {mealName}
                <DeleteMealButton deleteMeal={deleteMeal} />

            </Container>
        </div>

    )
}

export default Meal
