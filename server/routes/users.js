import express from 'express';
import passport from 'passport';
import { logoutUser, getUsers, deleteUser } from '../controllers/users.js';
import User from '../models/user.model.js';

const router = express.Router();

router.get("/fetch", getUsers);
router.delete("/:id", deleteUser);
router.get("/logout", logoutUser);

router.get('/', getUsers);


export default router;