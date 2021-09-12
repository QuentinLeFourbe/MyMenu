import { createMenu, fetchMeals, getMenusBetweenDates, updateMenu } from "../api";

export const GetNewMenu = (date, type, mealsIds) =>
{
    const newMenu = {
        date: date,
        meals: mealsIds,
        type: type
    }

    return newMenu;
}

export const AddMealToMenu = (mealId, menu, mealIndex) =>
{
    mealIndex === undefined ? menu.meals.push(mealId) : menu.meals.splice(mealIndex, 0, mealId);
}

export const UpdateMenu = async (dataDispatch, menu) =>
{
    if (menu == null || undefined)
    {
        console.error("Menu null or undefined");
        return;
    }

    await updateMenu(menu._id, menu)
        .then(() =>
        {
            dataDispatch({ type: "UPDATE_MENU", payload: menu })
        }).catch(err =>
        {
            console.error(err);
        });
}

//Add meals to a new menu, send it to the DB and update the global state
export const CreateMenu = async (dataDispatch, menu) => 
{
    await createMenu(menu)
        .then(() =>
        {
            dataDispatch({ type: "CREATE_MENU", payload: menu })
        });
}

export const FetchMeals = async (dataDispatch) =>
{
    await fetchMeals()
        .then(response =>
        {
            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
        })
        .catch(error =>
        {
            console.error("Error: " + error.message)
        });
}

export const FetchMenus = async (dataDispatch, startDate, endDate) =>
{
    await getMenusBetweenDates(startDate.format('MM-DD-YYYY'), endDate.format('MM-DD-YYYY'))
        .then(response =>
        {
            dataDispatch({ type: 'FETCH_MENUS', payload: response.data })
        })
        .catch(error =>
        {
            console.error("Error: " + error.message)
        })
}

export const RemoveMealFromMenu = (mealId, menu) =>
{
    if (menu === undefined)
    {
        console.log("Menu undefined");
        return;
    }

    const indexOfMealToRemove = menu.meals.findIndex(menuMealId => menuMealId === mealId);
    menu.meals.splice(indexOfMealToRemove, 1);
}

