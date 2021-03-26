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

//////////////// Menus \\\\\\\\\\\\\\\\\\\\

export const getMenusBetweenDates = async (startDate, endDate) => {
   return axios.get(`http://localhost:5000/menus/filter?startDate=${startDate}&endDate=${endDate}`);
}

export const createMenu = async (menu) => {
   return axios.post("http://localhost:5000/menus", menu);
}

export const updateMenu = async (menuId, data, config) => {
   return axios.put(`http://localhost:5000/menus/${menuId}`, data, config);
}

export const deleteMenu = async (menuId, config) => {
   return axios.delete(`http://localhost:5000/menus/${menuId}`, config);
}