import React, { useState, useContext, useEffect } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Meal from './Meal'
import dayjs from 'dayjs';
import { AppContext } from '../../../AppContext';
import AddMealComponent from './NewMealComponent/AddMealComponent';
import { AddMealToMenu, CreateMenu, FetchMeals, FetchMenus, GetNewMenu, UpdateMenu } from '../../../Helpers/DataHelper';
import { animated, useSpring, config } from 'react-spring'

const Container = styled.div`
    /* margin: 0 1rem 0 1rem; */
    border-left: ${props => props.first ? "0px" : "1px"} solid lightgrey;
    
    border-radius: 1px;
    /* flex-grow: 1; */
    /* width: 30vw; */
    display: flex;
    flex-flow: column wrap;
    width: 50%;
    /* padding-left: 8px; */
    @media (max-width: 600px){
        border-top: ${props => props.first ? "0px" : "1px"} solid lightgrey;
        border-left: none;
        width: auto;
        margin-top: 1rem;
    }
`;

const MealList = styled(animated.div)`
    min-height: 60px;
    background-color: ${props => props.isDraggingOver ? "#ff6e6118" : "white"};
    /* padding: 0rem 0px 0rem 8px; */
    flex-grow: 1;
`;

const Title = styled.div`
    margin: 8px;
    padding: 2px;
    color: #ff6f61;
    font-size: 1.5rem;
    /* text-align: center; */
`;

function Menu({ title, date, type, menuData, first, dataLoading })
{
    const { dataState, dataDispatch } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const menuId = (menuData !== undefined && menuData._id !== undefined) ? menuData._id : dayjs(date).format('MM-DD-YYYY') + '_' + type;

    const meals = (menuData !== undefined && dataState.meals.length > 0) ? menuData.meals.map(mealId => dataState.meals.find(meal => meal.id === mealId)) : [];

    const addMealToMenu = async (mealId) =>
    {
        const currentMenu = dataState.menus.find(menu => menu._id === menuId);
        if (currentMenu !== undefined)
        {
            AddMealToMenu(mealId, currentMenu);
            await UpdateMenu(dataDispatch, currentMenu);
        }
        else 
        {
            const newMenu = GetNewMenu(date, type, [mealId]);
            await CreateMenu(dataDispatch, newMenu);
            await FetchMenus(dataDispatch, dataState.weekDates.startDate, dataState.weekDates.endDate);
        }
    }

    useEffect(() =>
    {
        // await new Promise(r => setTimeout(r, 500));
        setShowMenu(!dataLoading);
    }, [dataLoading])

    const spring = useSpring({
        opacity: showMenu ? 1 : 0,
    });

    return (
        <Container first={first}>
            <Title>{title}</Title>
            {/* <animated.div style={spring}> */}
            <Droppable droppableId={menuId} direction='vertical'>
                {
                    (provided, snapshot) => (
                        <MealList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            style={spring}
                        >
                            {meals.map((meal, index) =>
                                // <Meal
                                //     key={meal.id}
                                //     parentId={menuId}
                                //     meal={meal}
                                //     index={index}
                                //     deletable
                                // />
                                <Draggable draggableId={`${menuId}_${index}_${meal.id}`} index={index} key={`${index}_${meal.id}`}>
                                    {(provided, snapshot) => (
                                        <Meal
                                            innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            parentId={menuId}
                                            meal={meal}
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
            {/* </animated.div> */}
            <AddMealComponent addMealHandler={addMealToMenu} />
        </Container>
    )
}

export default Menu