import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    name: {type: String, required: true},
    recipe: String,
    creator: String,
    ingredients: [String],
    mealImage: { type: String, required: false },
    createdAt: {
        type: Date,
        default: new Date()
    }, 
    lastUse: {
        type: Date,
        default: new Date()
    },
    user: String
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;