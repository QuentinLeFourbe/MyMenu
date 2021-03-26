import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../AppContext';
import { FLOAT_DROPPABLE_ID } from '../../../Constant';
import {  Droppable } from 'react-beautiful-dnd'
import Meal from '../MenuComponents/Meal';

const ResultContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 8px;
    overflow: auto;
    padding-top: 8px;
`;

const ResultItem = styled.div`
    margin: 2px;
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 1px;
`;

function FloatingMealList() {

    const { dataState } = useContext(AppContext);
    let meals = [];
    meals = dataState.meals;

    return (
        <>
            {/* <ResultContainer>
                {meals.map((meal) =>
                    <ResultItem>{meal.name}</ResultItem>
                )}
            </ResultContainer> */}
            <Droppable droppableId={FLOAT_DROPPABLE_ID}>
                {
                    provided => (
                        <ResultContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {meals.map((meal, index) =>
                                <Meal
                                    key={meal.id}
                                    parentId={FLOAT_DROPPABLE_ID}
                                    meal={meal}
                                    index={index}
                                />
                            )}
                            {provided.placeholder}
                        </ResultContainer>
                    )
                }
            </Droppable>
            {/* <Droppable droppableId={menuId}>
                {
                    provided => (
                        <MealList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {mealList.map((meal, index) =>
                                <Meal
                                    key={meal.id}
                                    parentId={menuId}
                                    meal={meal}
                                    index={index}
                                />)}
                            {provided.placeholder}
                        </MealList>
                    )
                }
            </Droppable> */}
        </>
    )
}

export default FloatingMealList
