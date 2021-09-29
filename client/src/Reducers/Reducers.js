

export const dataReducer = (dataState, action) =>
{
    switch (action.type)
    {
        case 'meals/fetch':
            return { ...dataState, meals: action.payload };
        case 'meals/create':
            return { ...dataState, meals: [...dataState.meals, action.payload] };
        case 'meals/delete': {
            let mealIndex = dataState.meals.findIndex(meal => meal.id === action.payload);
            return { ...dataState, meals: dataState.meals.splice(mealIndex, 1) };
        }
        case 'meals/update': {
            let mealIndex = dataState.meals.findIndex(meal => meal.id === action.payload.id);
            return { ...dataState, meals: dataState.meals.splice(mealIndex, 1, action.payload) };
        }
        ////////////////////////Menus
        case 'menus/fetch':
            if (action.payload === undefined)
                console.error("Payload undefined !");
            return { ...dataState, menus: action.payload };
        case 'menus/create':
            if (action.payload === undefined)
                console.error("Payload undefined !");
            return { ...dataState, menus: [...dataState.menus, action.payload] };
        case 'menus/delete': {
            if (action.payload === undefined)
                console.error("Payload undefined !");
            const menuToRemoveId = action.payload;
            const menusWithTheMenuRemoved = dataState.menus.filter(menu => menu._id !== menuToRemoveId);
            return { ...dataState, menus: menusWithTheMenuRemoved };
        }
        case 'menus/update': {
            if (action.payload === undefined)
            {
                console.error("Payload undefined !");
                return { ...dataState };
            }
            const updatedMenu = action.payload;
            const menuWithUpdatedItem = dataState.menus.map(menu => menu._id === updatedMenu._id ? updatedMenu : menu);
            return { ...dataState, menus: menuWithUpdatedItem };
        }
        case 'menus/updateMultiple': { //Add or update multiple menus at the same time, from an array of menus
            if (action.payload === undefined || action.payload.length === 0)
                console.error("Payload undefined or array length is 0 !");
            const menus = [...action.payload];
            console.log("Reducer: update multiple ; menus to update: ");
            console.log(menus);
            const updatedMenus = dataState.menus.map(menu =>
            {
                const matchedMenu = menus.find(updatedMenu => updatedMenu._id === menu._id);
                return matchedMenu === undefined ? menu : matchedMenu;
            })

            menus.forEach(menu => menu._id === undefined ? updatedMenus.push(menu) : "");
            console.log("Reducer: update multiple ; updatedMenus: ");
            console.log(updatedMenus);
            return { ...dataState, menus: updatedMenus };
        }

        //User logged in after google oauth
        case 'USER_LOGIN': {
            if (action.payload === undefined)
            {
                console.error("Payload undefined !");
                return { ...dataState };
            }
            return { ...dataState, user: action.payload.user };
        }
        case 'NOT_LOGGED': {
            return { ...dataState, user: null };
        }

        case 'weekDates/update': {
            return { ...dataState, weekDates: action.payload };
        }

        default:
            return dataState;
    }
}


