import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../AppContext';
import { FLOAT_DROPPABLE_ID } from '../../../Constant';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Meal from '../MenuComponents/Meal';
 

const ResultContainer = styled.div`
    overflow: auto;
    /* background-color:white; */
    margin-top: 0;
`;

//Display the meals passed in props
function FloatingMealList(props)
{
    const { meals } = props;
    

    return (
        <>
            <Droppable droppableId={FLOAT_DROPPABLE_ID} isDropDisabled={true} >
                {
                    (provided, snapshot) => (
                        <ResultContainer
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {meals.map((meal, index) =>
                                <Draggable draggableId={`${FLOAT_DROPPABLE_ID}_${meal.id}`} index={index} key={meal.id}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Meal
                                                innerRef={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                parentId={FLOAT_DROPPABLE_ID}
                                                meal={meal} style={{
                                                    ...provided.draggableProps.style,
                                                    transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
                                                }}
                                            />
                                            {snapshot.isDragging && (
                                                <Meal meal={meal} style={{ transform: 'none !important' }}></Meal>
                                            )}

                                        </React.Fragment>
                                    )}
                                </Draggable>
                            )}
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
