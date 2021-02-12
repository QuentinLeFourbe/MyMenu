import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Day from './MenuManager/Day'
import initialData from './MenuManager/InitialData'
import WeeksNavBar from './MenuManager/WeeksNavBar'
import FloatingMealManager from './FloatingMealManager/FloatingMealManager'


const DaysContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-right: 5%;
    margin-left: 5%;
`;

// const Container = styled.div`
//     display: flex;
//     flex-flow: column wrap;
//     justify-content: center;
// `;


const Container = styled.div`
  display:grid;
  grid-template-columns: 20% auto 15%;
  grid-template-rows: auto;
  grid-template-areas:
  "leftPanel highBar highbar"
  "leftPanel main main"
  "leftPanel lowBar lowbar";
  z-index: -1;
`;

const GridArea = styled.div`
  grid-area: ${props => props.name};
`;

function MenuManagerComponent() {

    const [menuData, setMenuData] = useState(initialData)

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        const mealId = draggableId.slice(draggableId.lastIndexOf('_') + 1);
        const dropSource = source.droppableId.slice(0, source.droppableId.indexOf('_'))
        const dropDestination = destination.droppableId.slice(0, destination.droppableId.indexOf('_'))
        const mealTimeSource = source.droppableId.slice(source.droppableId.indexOf('_') + 1)
        const mealTimeDestination = destination.droppableId.slice(destination.droppableId.indexOf('_') + 1)

        const newDays = [...menuData.days];
        const destinationDayIndex = menuData.days.findIndex(day => day.id === dropDestination);
        const sourceDayIndex = menuData.days.findIndex(day => day.id === dropSource);

        if (mealTimeSource === 'lunch') {
            const newLunchMenu = [...newDays[sourceDayIndex].lunchMealsIds];
            newLunchMenu.splice(source.index, 1);
            newDays[sourceDayIndex] = { ...newDays[sourceDayIndex], lunchMealsIds: newLunchMenu }
        }
        else if (mealTimeSource == 'diner') {
            const newLunchMenu = [...newDays[sourceDayIndex].dinerMealsIds];
            newLunchMenu.splice(source.index, 1);
            newDays[sourceDayIndex] = { ...newDays[sourceDayIndex], dinerMealsIds: newLunchMenu }
        }

        //Add the element to the destination
        if (mealTimeDestination === 'lunch') {
            const newLunchMenu = [...newDays[destinationDayIndex].lunchMealsIds];
            newLunchMenu.splice(destination.index, 0, mealId);
            newDays[destinationDayIndex] = { ...newDays[destinationDayIndex], lunchMealsIds: newLunchMenu }
        }
        else if (mealTimeDestination == 'diner') {
            const newLunchMenu = [...newDays[destinationDayIndex].dinerMealsIds];
            newLunchMenu.splice(destination.index, 0, mealId);
            newDays[destinationDayIndex] = { ...newDays[destinationDayIndex], dinerMealsIds: newLunchMenu }
        }

        setMenuData(
            {
                ...menuData,
                days: newDays
            }
        )

    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <GridArea name="leftPanel">
                    <FloatingMealManager />
                </GridArea>

                <GridArea name="highBar">
                    <WeeksNavBar />
                </GridArea>
                <GridArea name="main">

                    <DaysContainer>
                        {menuData.days.map(day => <Day
                            key={day.id}
                            title={day.name}
                            dayId={day.id}
                            lunchMeals={
                                day.lunchMealsIds.map(mealId =>
                                    initialData.meals.find(meal =>
                                        mealId === meal.id
                                    )
                                )
                            }
                            dinerMeals={
                                day.dinerMealsIds.map(
                                    mealId => initialData.meals.find(
                                        meal => mealId === meal.id
                                    )
                                )
                            }
                        />)}
                    </DaysContainer>

                </GridArea>
            </Container>
        </DragDropContext>

    )
}

export default MenuManagerComponent
