import axios from 'axios';


export const fetchMeals = async () => axios.get("http://localhost:5000/meals/lookup");

export const getMeal = async (mealId) => {
   axios.get(`http://localhost:5000/meals/${mealId}`)
}

export const createMeal = async (meal, config) => {
   return axios.post("http://localhost:5000/meals", meal, config);
}

export const updateMeal = async (mealId, data, config) => {
   return axios.put(`http://localhost:5000/meals/${mealId}`, data, config);
}

export const deleteMeal = async (mealId, config) => {
   return axios.delete(`http://localhost:5000/meals/${mealId}`, config);
}
