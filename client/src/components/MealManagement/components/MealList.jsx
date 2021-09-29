import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import MealItem from './MealItem';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* This is better for small screens, once min() is better supported */
    /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
    grid-gap: 1rem;
    /* This is the standardized property now, but has slightly less support */
    margin: 1rem;
`;

function MealList(props)
{
    const { meals, showMealOverlay } = props;

    return (
        <Container>
            {
                meals.map((meal, index) => (
                    <MealItem
                        onClickCb={(e) =>
                        {
                            e.preventDefault();
                            showMealOverlay(meal.id);
                        }}
                        key={index}
                        image={meal.mealImage}
                        name={meal.name}
                    />
                ))
            }
        </Container>
    )
}

export default MealList
