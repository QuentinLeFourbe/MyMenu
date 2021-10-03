import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../AppContext';
import styled from 'styled-components'
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Day from './Day';
import { animated, useTransition, config, useSpring } from 'react-spring';
import { createMenu, deleteMenu, getMenusBetweenDates, updateMenu } from '../../../api';
import { DragDropContext } from 'react-beautiful-dnd';
import { AddMealToMenu, DeleteMultipleMenus, FetchMenus, GetNewMenu, RemoveMealFromMenu } from '../../../Helpers/DataHelper';

const Container = styled(animated.div)`
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    align-items: stretch;
    /* border: solid black 1px; */
    margin-right: 2vw;
    margin-left: 2vw;
    margin-bottom: 5vh;
    /* display: grid; */
    /* grid-template-columns: repeat(7, 1fr); */
`;

function DaysContainer({ startDate, endDate, dataLoading })
{
    dayjs.extend(isoWeek);

    const { dataState, dataDispatch } = useContext(AppContext);
    const startWeekDay = startDate.isoWeekday();
    const endWeekDay = endDate.isoWeekday();

    const daysNumber = Array.from({ length: endWeekDay - startWeekDay + 1 }, (_, i) => i + startWeekDay);

    const spring = useSpring({
        from: { opacity: 0 },
        opacity: 1,
        delay: 700,
        config: config.molasses,
    })

    //region



    const onDragEnd = (result) =>
    {
        const { destination, source, draggableId } = result;
        if (!destination)
            return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const mealId = draggableId.slice(draggableId.lastIndexOf('_') + 1);
        const menuId = source.droppableId //un menuId
        const dropDestination = destination.droppableId; //Soit un menuId, soit une combinaison date et type de menu: MM-DD-YYYY_menuType

        const sourceMenu = dataState.menus.find(menu => menu._id === menuId);
        const menusToUpdate = [];

        //On a un menu source
        //Modifier le menu source que ce soit si on change l'ordre des plats dans le menu, ou si on bouge le plat vers un autre menu
        const sourceMenuWithRemovedMeal = RemoveMealFromMenu(mealId, sourceMenu);
        menusToUpdate.push(sourceMenuWithRemovedMeal);

        if (dropDestination.includes('_')) //On est sur un menu vide, donc qui n'est pas créé en BDD
        {
            const menuTypeDestination = destination.droppableId.slice(destination.droppableId.indexOf('_') + 1);
            const menuDateDestination = destination.droppableId.slice(0, destination.droppableId.indexOf('_'));
            const newMenuWithAddedMeal = GetNewMenu(dayjs(menuDateDestination, "MM-DD-YYYY").format(), menuTypeDestination, [mealId]);
            menusToUpdate.push(newMenuWithAddedMeal);
            console.log("Drop to a new menu. The new menu is: ");
            console.log(newMenuWithAddedMeal);
        }
        else
        { //On est sur un menu existant qu'il va falloir update en BDD après lui avoir ajouté le plat
            const existingMenu = dataState.menus.find(menu => menu._id === dropDestination);
            if (existingMenu === undefined)
            {
                console.error("Menu destination is not found in the dataState ! His ID is: " + dropDestination);
                return;
            }
            const existingMenuWithAddedMeal = AddMealToMenu(mealId, existingMenu, destination.index);
            console.log("Drop to an existing menu. The existing menu is: ");
            console.log(existingMenuWithAddedMeal);
            menusToUpdate.push(existingMenuWithAddedMeal);
        }

        dataDispatch({ type: 'menus/updateMultiple', payload: menusToUpdate });
        SyncDbMenus(menusToUpdate);
    }

    const SyncDbMenus = async (updatedMenus) =>
    {
        await Promise.all(updatedMenus.map(async (menu) =>
        {
            if (menu.meals.length === 0)
            {
                await deleteMenu(menu._id)
                    .catch(error =>
                    {
                        console.error("Error: " + error.message)
                    })
            } else if (menu._id === undefined)
            {
                await createMenu(menu)
                    .catch(error =>
                    {
                        console.error("Error: " + error.message)
                    })
            } else
            {
                await updateMenu(menu._id, menu)
                    .catch(error =>
                    {
                        console.error("Error: " + error.message)
                    });
            }
        }))
            .then(async () =>
            {
                await FetchMenus(dataDispatch, dataState.weekDates.startDate, dataState.weekDates.endDate);
            })

    }

    //useEffect to get the menus of the week when the page is loaded 
    useEffect(async () =>
    {
        await FetchMenus(dataDispatch, dataState.weekDates.startDate, dataState.weekDates.endDate);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // <Container>
        <DragDropContext onDragEnd={onDragEnd} >
            <Container style={spring}>
                {
                    daysNumber.map((dayNb, index) =>
                    {
                        let dayDate = dayjs(startDate).add(dayNb - 1, 'day').format(); //retour à un format date natif
                        return <Day
                            key={index}
                            date={dayDate}
                            dayMenus={dataState.menus.filter(menu => dayjs(menu.date).isSame(dayDate, 'day'))}
                            dataLoading={dataLoading}
                        />
                    })
                }
            </Container>
        </DragDropContext >
    )
}

export default DaysContainer
