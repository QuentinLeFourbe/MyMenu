const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamp: true,
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

mongoose.exports = Ingredient;