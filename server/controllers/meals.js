import Meal from '../models/meal.model.js';


export const getMeals = async (req, res) => {
    try {
        // const meals = await Meal.find();
        const meals = await Meal.find({ user: req.user.id });

        res.status(200).json(meals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMeal = async (req, res, next) => {
    const { name, ingredients, recipe, creator } = req.body;
    let mealImage;
    if (req.file != undefined) {
        const fileUrl = req.file.path.replace(/\\/g, "/")
        console.log(fileUrl);
        mealImage = fileUrl;
    } else {
        mealImage = "";
    }
    try {
        const newMeal = new Meal({ name, ingredients, recipe, creator, mealImage, user: req.user.id });
        await newMeal.save();

        res.status(201).json(newMeal);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const meal = await Meal.find({ _id: id, user: req.user.id });
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateMeal = async (req, res) => {
    try {
        const id = req.params.id;
        let updatedMeal;
        console.log(req.file);
        if (req.file != undefined) {
            console.log(req.file);
            const fileUrl = req.file.path.replace(/\\/g, "/")
            console.log(fileUrl);
            updatedMeal = { ...req.body, mealImage: fileUrl }
        } else {
            updatedMeal = { ...req.body }
        }
        const meal = await Meal.updateOne({ _id: { $eq: id }, user: req.user.id }, updatedMeal);
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getMealsLookup = async (req, res) => {
    try {
        const id = req.params.id;
        const meals = await Meal.find({ user: req.user.id });
        res.status(200).json(meals.map((meal) => (
            {
                id: meal._id,
                name: meal.name,
                mealImage: meal.mealImage,
            }
        )));
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const meal = await Meal.deleteOne({ _id: id, user: req.user.id });
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}