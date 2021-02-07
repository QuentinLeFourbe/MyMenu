export const initialData = {
    days:
        [
            { id: 'day-1', name: 'Lundi', lunchMealsIds: ['meal-1','meal-2'], dinerMealsIds: [] },
            { id: 'day-2', name: 'Mardi', lunchMealsIds: [], dinerMealsIds: [] },
            { id: 'day-3', name: 'Mercredi', lunchMealsIds: [], dinerMealsIds: [] },
            { id: 'day-4', name: 'Jeudi', lunchMealsIds: [], dinerMealsIds: [] },
            { id: 'day-5', name: 'Vendredi', lunchMealsIds: [], dinerMealsIds: [] },
            { id: 'day-6', name: 'Samedi', lunchMealsIds: [], dinerMealsIds: [] },
            { id: 'day-7', name: 'Dimanche', lunchMealsIds: [], dinerMealsIds: [] }
        ],

    meals: [{ id: 'meal-1', name: 'Pâtes' }, { id: 'meal-2', name: 'Epinards' }, { id: 'meal-3', name: 'Saumon' }, { id: 'meal-4', name: 'Poulet' }, { id: 'meal-5', name: 'Riz' }],

    mealList: ['meal-1', 'meal-2', 'meal-3', 'meal-4', 'meal-5']
}

export default initialData