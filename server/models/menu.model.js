import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
    type: {type: String, required: true},
    creator: String,
    date: {
        type: Date,
    },
    meals: [String]
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;