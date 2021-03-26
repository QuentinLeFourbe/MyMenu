import React, { useState, useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { getMeal } from '../../../api';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    padding: 8px;
`;

function Meal(props) {
    const { meal, index, parentId } = props;
  
    return (
        <Draggable draggableId={`${parentId}_${meal.id}`} index={index}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {meal.name}
                </Container>
            )}
        </Draggable>
    )
}

export default Meal
