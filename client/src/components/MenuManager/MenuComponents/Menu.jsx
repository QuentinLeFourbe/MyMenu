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
    border-top: ${props => props.first ? "0px" : "1px"} dashed lightgrey;
    
    border-radius: 1px;
    flex-grow: 1;
    display: flex;
    flex-flow: column wrap;
    @media (max-width: 600px){
        border-top: ${props => props.first ? "0px" : "1px"} solid lightgrey;
        border-left: none;
        width: auto;
        margin-top: 1rem;
    }
`;

const MealList = styled(animated.div)`
    min-height: 150px;
    background-color: ${props => props.isDraggingOver ? "#ff6e6118" : "white"};
    flex-grow: 1;
`;

const Title = styled.div`
    margin: 8px;
    padding: 2px;
    color: #ff6f61;
    font-size: 1rem;
`;

function Menu({ title, date, type, menuData, first, dataLoading })
{
    const { dataState, dataDispatch } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [menuMeals, setMenuMeals] = useState([]); //Will store meals OBJECT
    let menuDroppableId = (menuData !== undefined && menuData._id !== undefined) ? menuData._id : dayjs(date).format('MM-DD-YYYY') + '_' + type;


    const addMeal = async (mealId) =>
    {
        if (menuData !== undefined && menuData._id !== undefined)
        {
            await UpdateMenu(dataDispatch, { ...menuData, meals: [...menuData.meals, mealId] })
        }
        else 
        {
            const newMenu = GetNewMenu(date, type, [mealId]);
            await CreateMenu(dataDispatch, newMenu);
            await FetchMenus(dataDispatch, dataState.weekDates.startDate, dataState.weekDates.endDate);
        }
    }

    const removeMeal = async (mealId) =>
    {
        const menuWithRemovedMeal = { ...menuData, _id: menuData._id, meals: menuData.meals.filter(meal_id => meal_id !== mealId) }
        await UpdateMenu(dataDispatch, menuWithRemovedMeal);
    }

    useEffect(() =>
    {
        if (menuData === undefined)
        {
            setMenuMeals([]);
        }

        menuDroppableId = (menuData !== undefined && menuData._id !== undefined) ? menuData._id : dayjs(date).format('MM-DD-YYYY') + '_' + type;
        const menuMealsIds = menuData !== undefined ? menuData.meals : [];
        const menuMeals = menuMealsIds.map((mealId, index) =>
        {
            const meal = dataState.meals.find(meal => meal.id === mealId)
            if (meal === undefined)
            {
                console.error(`Meal undefined ! The meal may not exist. Meal ID: ${mealId} ; Index in menu: ${index}`);
                return;
            }
            return meal;
        });
        setMenuMeals(menuMeals);
    }, [menuData])

    useEffect(async () =>
    {
        if (dataLoading)
        {
            setShowMenu(false);
        } else
        {
            await new Promise(r => setTimeout(r, 200));
            setShowMenu(true);
        }
    }, [dataLoading])

    const spring = useSpring({
        opacity: showMenu ? 1 : 0,
        config: config.tight,
    });

    return (
        <Container first={first}>
            <Title>{title}</Title>
            <Droppable droppableId={menuDroppableId} direction='vertical'>
                {
                    (provided, snapshot) => (
                        <MealList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                            style={spring}
                        >
                            {showMenu && menuMeals.map((meal, index) =>
                                <Draggable draggableId={`${menuDroppableId}_${index}_${meal.id}`} index={index} key={`${index}_${meal.id}`}>
                                    {(provided, snapshot) => (
                                        <Meal
                                            innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            mealName={meal.name}
                                            mealId={meal.id}
                                            removeMealHandler={removeMeal}
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
            <AddMealComponent addMealHandler={addMeal} />
        </Container>
    )
}

export default Menu