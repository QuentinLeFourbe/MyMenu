import { AccordionSummary } from '@material-ui/core';
import axios from 'axios';


export const fetchMeals = async () => axios.get("/api/meals/lookup");

export const getMeal = async (mealId) => {
   return axios.get(`api/meals/${mealId}`)
}

export const createMeal = async (meal, user) => {
   return axios.post("/api/meals", meal);
}

export const updateMeal = async (mealId, data, config) => {
   return axios.put(`/api/meals/${mealId}`, data, config);
}

export const deleteMeal = async (mealId, config) => {
   return axios.delete(`/api/meals/${mealId}`, config);
}

//////////////// Menus \\\\\\\\\\\\\\\\\\\\

export const getMenusBetweenDates = async (startDate, endDate) => {
   return axios.get(`/api/menus/filter?startDate=${startDate}&endDate=${endDate}`);
}

export const createMenu = async (menu) => {
   return axios.post("/api/menus", menu);
}

export const updateMenu = async (menuId, data, config) => {
   return axios.put(`/api/menus/${menuId}`, data, config);
}

export const deleteMenu = async (menuId, config) => {
   return axios.delete(`/api/menus/${menuId}`, config);
}

///////Session\\\\\\\\
export const getSession = async () => {
   return axios.get("/api/session", { withCredentials: true })
}

export const logOut = async() => {
   return axios.get("/api/users/logout");
}

//////Test timer\\\\\\\\
export const threeSecApiCall = async () => {
   await new Promise(r => setTimeout(r, 3000));
}