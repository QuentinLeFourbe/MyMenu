import axios from 'axios';


export const fetchMeals = async () =>  axios.get("http://localhost:5000/meals/lookup");

export const createMeal = async (meal, config) => {
   return axios.post("http://localhost:5000/meals", meal, config);
}

