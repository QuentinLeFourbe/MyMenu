import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Meal from './Meal'

const Container = styled.div`
    margin: 2px;
    border-left: ${props => props.first ? "0px" : "1px" } solid lightgrey;
    border-radius: 1px;
    flex-grow: 1;
`;

const MealList = styled.div`
    min-height: 50px;
`;

const Title = styled.h4`
    margin: 8px;
    padding: 2px;
`;

function Menu(props) {

    const { mealList, title, menuId } = props;

    return (
        
        <Container first={props.first}>
            <Title>{title}</Title>
            <Droppable droppableId={menuId}>
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
            </Droppable>
        </Container>
    )
}

export default Menu
