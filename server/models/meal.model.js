import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    ingredients: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;