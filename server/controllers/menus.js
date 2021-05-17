import Menu from '../models/menu.model.js';


export const getMenu = async (req, res) => {
    console.log(req.route.name);
    try {
        const id = req.params.id;
        const menu = await Menu.find({ _id: id, user: req.user.id });
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find({ user: req.user.id });
        res.status(200).json(menus);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getMenusBetweenDates = async (req, res) => {
    console.log("Get menus between dates");
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
        const menu = await Menu.find({ date: { $gte: startDate, $lte: endDate, $exists: true }, user: req.user.id });
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createMenu = async (req, res) => {
    console.log("Create menu");
    try {
        const { type, creator, date, meals } = req.body;

        const newMenu = new Menu({ type, creator, date, meals, user: req.user.id });

        await newMenu.save();

        res.status(201).json(newMenu);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateMenu = async (req, res) => {
    console.log("Update menu");
    try {
        const id = req.params.id;
        const { meals } = req.body;
        const menu = await Menu.updateOne({ _id: { $eq: id }, user: req.user.id }, { meals })
        res.status(201).json(menu);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deleteMenu = async (req, res) => {
    console.log("Delete menu");
    try {
        const id = req.params.id;
        const menu = await Menu.deleteOne({ _id: id, user: req.user.id });
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteAllMenus = async (req, res) => {
    try {
        const menu = await Menu.deleteMany({ user: req.user.id });
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}














