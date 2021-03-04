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
    console.log(req.file);
    const { name, ingredients, recipe, creator } = req.body;
    const mealImage = req.file.path;
    const newMeal = new Meal({ name, ingredients, recipe, creator, mealImage });

    // const meal = req.body;
    // const newMeal = new Meal(meal);

    try {
        await newMeal.save();

        res.status(201).json(newMeal);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const meal = await Meal.find({ _id: id });
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const meal = await Meal.updateOne({ _id: { $eq: id } }, req.body);
        res.status(201).json(meal);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMealsLookup = async (req, res) => {
    try {
        const id = req.params.id;
        const meals = await Meal.find();
        res.status(200).json(meals.map((meal) => (
            {
                id: meal._id,
                name: meal.name,
                selectedFile: meal.selectedFile,
            }
        )));
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}