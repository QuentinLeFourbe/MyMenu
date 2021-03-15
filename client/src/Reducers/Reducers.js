

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
        default:
            return dataState;
    }
}



