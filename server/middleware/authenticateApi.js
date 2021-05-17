export const authenticateAPI = async (req, res, next) => {
    if (req.user == undefined) {
        res.status(401).send('User not authenticated');
        next('router');
    }
    else {
        next();
    }
}