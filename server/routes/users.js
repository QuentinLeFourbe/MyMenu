import express from 'express';
import passport from 'passport';
import { logoutUser, getUsers, deleteUser } from '../controllers/users.js';
import User from '../models/user.model.js';
import { authenticateAPI } from '../middleware/authenticateApi.js';

const router = express.Router();
router.use(authenticateAPI);

router.get("/fetch", getUsers);
router.delete("/:id", deleteUser);
router.get("/logout", logoutUser);

router.get('/', getUsers);


export default router;