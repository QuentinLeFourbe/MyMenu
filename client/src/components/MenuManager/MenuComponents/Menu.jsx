import React, { useContext } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Meal from './Meal'
import dayjs from 'dayjs';
import { AppContext } from '../../../AppContext';

const Container = styled.div`
    margin: 2px;
    border-left: ${props => props.first ? "0px" : "1px"} solid lightgrey;
    border-radius: 1px;
    flex-grow: 1;
    /* width: 30vw; */
    display: flex;
    flex-flow: column wrap;
    width: 50%;

`;

const MealList = styled.div`
    min-height: 50px;
    background-color: ${props => props.isDraggingOver ? "#ff6e6118" : "white"};
    padding: 0rem 0 1rem 0;
    flex-grow: 1;
`;

const Title = styled.h4`
    margin: 8px;
    padding: 2px;
`;

function Menu(props)
{
    const { dataState } = useContext(AppContext);
    const { title, date, type, menuData } = props;

    const menuId = (menuData !== undefined && menuData._id !== undefined) ? menuData._id : dayjs(date).format('MM-DD-YYYY') + '_' + type;

    const meals = (menuData !== undefined && dataState.meals.length > 0) ? menuData.meals.map(mealId => dataState.meals.find(meal => meal.id === mealId)) : [];

    return (
        <Container first={props.first}>
            <Title>{title}</Title>
            <Droppable droppableId={menuId} direction='vertical'>
                {
                    (provided, snapshot) => (
                        <MealList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {meals.map((meal, index) =>
                                // <Meal
                                //     key={meal.id}
                                //     parentId={menuId}
                                //     meal={meal}
                                //     index={index}
                                //     deletable
                                // />
                                <Draggable draggableId={`${menuId}_${meal.id}`} index={index} key={meal.id}>
                                    {(provided, snapshot) => (
                                        <Meal
                                            innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            parentId={menuId}
                                            meal={meal}
                                            deletable
                                        >
                                        </Meal>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </MealList>
                    )
                }
            </Droppable>
        </Container>
    )
}

export default Menu
