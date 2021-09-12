import React from 'react'
import styled from 'styled-components'

const MealButton = styled.button`
    margin: 0.3rem;
    border: none;
    padding: 0.3rem;
    background: white;
    font-size: 1rem;

    &:hover{
        background-color: lightgrey;
    }
`;

function MealListItem({ mealId, children, addMealHandler })
{

    const addMeal = () =>
    {
        addMealHandler(mealId);
    }


    return (
        <MealButton onMouseDown={addMeal}>
            {children}
        </MealButton>
    )
}

export default MealListItem
