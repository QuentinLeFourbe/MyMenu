import User from '../models/user.model.js';

export const getUsers = async (req, res) =>
{
    try
    {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        console.log("id: " + id);
        const user = await User.deleteOne({ _id: id });
        res.status(200).json(user);
    }
    catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export const findOrCreateUser = async (req, res) =>
{

    try
    {
        const { id, displayName } = req.user;
        let user;
        user = await User.find({ googleId: id });
        if (user == undefined)
        {
            user = new User({ googleId: id, displayName });
            user.save();
        }
        res.redirect(process.env.HOST);
    } catch (error)
    {
        res.status(404).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) =>
{
    try
    {
        console.log("User logout")
        req.session.destroy(function (err)
        {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    } catch (error)
    {
        res.status(404).json({ message: error.message });
    }

}