import { createMenu, deleteMenu, fetchMeals, getMenusBetweenDates, updateMenu } from "../api";

export const FetchMenus = async (dataDispatch, startDate, endDate) =>
{
    await getMenusBetweenDates(startDate, endDate)
        .then(response =>
        {
            console.log(`Fetch menus result for startDate: ${startDate} and endDate: ${endDate} : `);
            console.log(response.data);
            dataDispatch({ type: 'menus/fetch', payload: response.data })
        })
        .catch(error =>
        {
            console.error("Error: " + error.message)
        })
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
            dataDispatch({ type: "menus/update", payload: menu })
        }).catch(err =>
        {
            console.error(err);
        });
}

export const GetNewMenu = (date, type, mealsIds) =>
{
    const newMenu = {
        date: date,
        meals: mealsIds,
        type: type
    }

    return newMenu;
}

export const AddMealToMenu = (mealId, menu, index) =>
{
    if (menu === undefined)
    {
        console.error("Menu undefined");
        return;
    }

    let resMenu = { ...menu };
    if (index !== undefined)
    {
        const firstPart = menu.meals.slice(0, index);
        const secondPart = menu.meals.slice(index + 1);
        resMenu = { ...menu, meals: firstPart.concat([mealId], secondPart) };
    } else
    {
        resMenu = { ...menu, meals: [...menu.meals, mealId] };
    }

    return resMenu;
}

//Add meals to a new menu, send it to the DB and update the global state
export const CreateMenu = async (dataDispatch, menu) => 
{
    await createMenu(menu)
        .then(() =>
        {
            dataDispatch({ type: "menus/create", payload: menu })
        });
}

export const FetchMeals = async (dataDispatch) =>
{
    await fetchMeals()
        .then(response =>
        {
            dataDispatch({ type: 'meals/fetch', payload: response.data })
        })
        .catch(error =>
        {
            console.error("Error: " + error.message)
        });
}


export const RemoveMealFromMenu = (mealId, menu) =>
{

    if (menu === undefined)
    {
        console.error("Menu is undefined");
        return;
    }

    const resMenu = { ...menu, meals: menu.meals.filter(id => id !== mealId) }
    return resMenu;
}

export const DeleteMultipleMenus = async (dataDispatch, menus) =>
{
    if (menus === undefined)
    {
        console.error("Menu  undefined");
        return;
    }
    await menus.forEach(menu =>
    {
        deleteMenu(menu._id)
            .then(() =>
            {
                dataDispatch({ type: "menus/delete", payload: menu._id })
            }).catch(err =>
            {
                console.error(err);
            })
    });
}