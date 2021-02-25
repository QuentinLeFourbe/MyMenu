import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    name: String,
    recipe: String,
    creator: String,
    ingredients: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastUse: {
        type: Date,
        default: new Date()
    }
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;