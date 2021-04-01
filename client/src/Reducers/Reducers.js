

export const dataReducer = (dataState, action) => {
    switch (action.type) {
        case 'FETCH_MEALS':
            return { ...dataState, meals: action.payload };
        case 'CREATE_MEAL':
            return { ...dataState, meals: [...dataState.meals, action.payload] };
        case 'DELETE_MEAL': {
            let mealIndex = dataState.meals.findIndex(meal => meal.id === action.payload);
            return { ...dataState, meals: dataState.meals.splice(mealIndex, 1) };
        }
        case 'UPDATE_MEAL': {
            let mealIndex = dataState.meals.findIndex(meal => meal.id === action.payload.id);
            return { ...dataState, meals: dataState.meals.splice(mealIndex, 1, action.payload) };
        }
        ////////////////////////Menus
        case 'FETCH_MENUS':
            if (action.payload === undefined)
                console.error("Payload undefined !");
            return { ...dataState, menus: action.payload };
        case 'CREATE_MENU':
            if (action.payload === undefined)
                console.error("Payload undefined !");
            return { ...dataState, menus: [...dataState.menus, action.payload] };
        case 'DELETE_MENU': {
            if (action.payload === undefined)
                console.error("Payload undefined !");
            let menuIndex = dataState.menus.findIndex(menu => menu._id === action.payload);
            dataState.menus.splice(menuIndex, 1);
            return { ...dataState };
        }
        case 'UPDATE_MENU': {
            if (action.payload === undefined) {
                console.error("Payload undefined !");
                return { ...dataState };
            }
            let menuIndex = dataState.menus.findIndex(menu => menu._id === action.payload._id);
            dataState.menus.splice(menuIndex, 1, action.payload);
            return { ...dataState };
        }
        case 'ADD_OR_UPDATE_MENUS': { //Add or update multiple menus at the same time, from an array of menus
            if (action.payload === undefined || action.payload.length === 0)
                console.error("Payload undefined or array length is 0 !");
            const menus = action.payload;
            menus.array.forEach(menu => {
                let menuIndex = dataState.menus.findIndex(menuElem => menu._id === menuElem._id);
                if (menuIndex !== -1) { //-1 means the menu is not found
                    dataState.menus.splice(menuIndex, 1, menu);
                } else {
                    dataState.menus.push(menu)
                }
            });
            return { ...dataState };
        }

        default:
            return dataState;
    }
}



