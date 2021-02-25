

export const dataReducer = (dataState, action) => {
    switch (action.type) {
        case 'FETCH_MEALS':
            return { ...dataState, meals: action.payload };
        case 'CREATE_MEAL':
            return { ...dataState, meals: [...dataState.meals, action.payload] };
        case 'UPDATE_MEAL':
            return dataState;
        case 'DELETE_MEAL':
            return dataState;
        default:
            return dataState;
    }
}



