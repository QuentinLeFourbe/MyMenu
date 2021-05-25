import express from 'express';
import passport from 'passport';
import { findOrCreateUser, getUsers } from '../controllers/users.js';

const router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/callback",
    passport.authenticate("google")
);


export default router;