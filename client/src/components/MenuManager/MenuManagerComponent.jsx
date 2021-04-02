import React, { useState, useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import WeeksNavBar from './WeeksNavBar/WeeksNavBar'
import FloatingMealManager from './FloatingMealManager/FloatingMealManager'
import { createMenu, deleteMenu, getMenusBetweenDates, updateMenu } from '../../api';
import DaysContainer from './MenuComponents/DaysContainer';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { } from 'dayjs/locale/fr';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FLOAT_DROPPABLE_ID } from '../../Constant';
import { AppContext } from '../../AppContext';

const Container = styled.div`
  display:grid;
  grid-template-columns: repeat(5,1fr);
  grid-template-rows: auto;
  grid-template-areas:
  "leftPanel highBar highBar highBar highBar"
  "leftPanel main main main main"
  "leftPanel lowBar lowBar lowBar lowBar";
  flex-grow:1;
`;

const GridArea = styled.div`
    display:flex;
  grid-area: ${props => props.name};
`;

function MenuManagerComponent()
{
    dayjs.extend(customParseFormat)
    dayjs.extend(isoWeek);
    dayjs.locale('fr');
    dayjs.extend(updateLocale)
    dayjs.updateLocale('fr', {
        weekdays: [
            "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
        ]
    })

    //UseContext
    const { dataState, dataDispatch } = useContext(AppContext);

    //UseState
    const [weekDates, setWeekDates] = useState({
        startDate: dayjs().isoWeekday(1),
        endDate: dayjs().isoWeekday(7),
    });

    //region

    const RemoveMealFromMenu = (mealId, menuId) =>
    {
        const menu = dataState.menus.find(menu => menu._id === menuId);

        if (menu === undefined)
        {
            console.log("Cannot find menu " + menuId + " !! menus:");
            console.log(weekDates.menus);
            return;
        }
        const indexOfMealToRemove = menu.meals.findIndex(menuMealId => menuMealId === mealId);
        menu.meals.splice(indexOfMealToRemove, 1);
        return menu;
    }

    const AddMealToNewMenu = (mealId, date, type) =>
    {
        const newMenu = {
            date: date,
            meals: [mealId],
            type: type
        }

        return newMenu;
    }

    //Add meal to existing menu. It will update the menu in the local state and the db
    const AddMealToExistingMenu = (mealId, menuId, index) =>
    {
        const menu = dataState.menus.find(menu => menu._id === menuId);
        if (menu === undefined)
        {
            console.error("Cannot find menu " + menuId + " !! menus:");
            console.error(weekDates.menus);
            return;
        }
        menu.meals.splice(index, 0, mealId);
        return menu;
    }

    const SyncDataState = (stateMenus, updatedMenus) =>
    {
        updatedMenus.forEach(menu =>
        {
            let menuIndex = stateMenus.findIndex(menuElem => menu._id === menuElem._id);
            if (menuIndex !== -1)
            { //-1 means the menu is not found
                if (menu.meals.length !== 0)
                    stateMenus.splice(menuIndex, 1, menu); //Remplace l'ancien menu pour sa version à jour
                else
                    stateMenus.splice(menuIndex, 1); //On supprime le menu car il n'a aucun plat
            } else
            {
                stateMenus.push(menu) //Ajoute un nouveau menu
            }
        });
        dataDispatch({ type: "FETCH_MENUS", payload: stateMenus });

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
        }));

        await getMenusBetweenDates(weekDates.startDate.format('MM-DD-YYYY'), weekDates.endDate.format('MM-DD-YYYY'))
            .then(response =>
            {
                dataDispatch({ type: 'FETCH_MENUS', payload: response.data })
            })
            .catch(error =>
            {
                console.error("Error: " + error.message)
            })
    }

    const onDragEnd = (result) =>
    {
        const { destination, source, draggableId } = result;
        if (!destination)
            return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const mealId = draggableId.slice(draggableId.lastIndexOf('_') + 1);
        const dropSource = source.droppableId //Soit FLOAT_DROPPABLE_ID soit un menuId
        const dropDestination = destination.droppableId;//Soit un menuId, soit une combinaison date et type de menu: MM-DD-YYYY_menuType

        let menusToUpdate = [];
        if (dropSource === FLOAT_DROPPABLE_ID)
        { //Le plat provient du menu flottant, donc pas de menu source
            //Nothing
        } else
        { //On a un menu source
            //Modifier le menu source que ce soit si on change l'ordre des plats dans le menu, ou si on bouge le plat vers un autre menu
            const newMenu = RemoveMealFromMenu(mealId, dropSource);
            menusToUpdate = [...menusToUpdate, newMenu];
        }

        if (dropDestination.includes('_')) //On est sur un menu vide, donc qui n'est pas créé en BDD
        {
            const menuTypeDestination = destination.droppableId.slice(destination.droppableId.indexOf('_') + 1);
            const menuDateDestination = destination.droppableId.slice(0, destination.droppableId.indexOf('_'));
            const newMenu = AddMealToNewMenu(mealId, dayjs(menuDateDestination, "MM-DD-YYYY").format(), menuTypeDestination);
            menusToUpdate = [...menusToUpdate, newMenu];
        }
        else
        { //On est sur un menu existant qu'il va falloir update en BDD après lui avoir ajouté le plat
            const newMenu = AddMealToExistingMenu(mealId, dropDestination, destination.index);
            menusToUpdate = [...menusToUpdate, newMenu];
        }

        SyncDataState(dataState.menus, menusToUpdate);
        SyncDbMenus(menusToUpdate);
    }

    //Called when the week has been changed, at the start or in the weeknavbar
    const weekChanged = async (startDate, endDate) =>
    {
        await getMenusBetweenDates(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'))
            .then(response =>
            {
                setWeekDates({
                    startDate: startDate,
                    endDate: endDate,
                })
                dataDispatch({ type: 'FETCH_MENUS', payload: response.data })
            })
            .catch(error =>
            {
                console.error("Error: " + error.message)
            })
    }



    //useEffect to get the menus of the week when the page is loaded 
    useEffect(() =>
    {
        async function fetchData()
        {
            await getMenusBetweenDates(weekDates.startDate.format('MM-DD-YYYY'), weekDates.endDate.format('MM-DD-YYYY'))
                .then(response =>
                {
                    dataDispatch({ type: 'FETCH_MENUS', payload: response.data })
                })
                .catch(error =>
                {
                    console.error("Error: " + error.message)
                })
        }
        fetchData();
        console.log("Badoum");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        < DragDropContext onDragEnd={onDragEnd} >
            <Container>
                <GridArea name="leftPanel">
                    <FloatingMealManager />
                </GridArea>

                <GridArea name="highBar">
                    <WeeksNavBar
                        weekChanged={weekChanged}
                        startDate={weekDates.startDate}
                        endDate={weekDates.endDate}
                    />
                </GridArea>
                <GridArea name="main">
                    <DaysContainer
                        menus={dataState.menus}
                        startDate={weekDates.startDate}
                        endDate={weekDates.endDate}
                    />
                </GridArea>
            </Container>
        </DragDropContext >

    )
}

export default MenuManagerComponent
