import Meal from '../models/meal.model.js';

export const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find();

        res.status(200).json(meals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMeal = async (req, res) => {
    const meal = req.body;
    const newMeal = new Meal(meal);
    try {
        await newMeal.save();

        res.status(201).json(newMeal);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}