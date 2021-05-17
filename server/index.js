import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import mealRoutes from './routes/meals.js';
import menuRoutes from './routes/menu.js';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import chalk from 'chalk';
import session from 'express-session';
import { authenticateAPI } from './middleware/authenticateApi.js';

dotenv.config();

const app = express();

app.use(express.static('../client/build', {}));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(session({
  secret: "5d82895a-7f31-47e5-813b-6408673d5447",
  resave: false,
  saveUninitialized: true,

  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/session', (req, res) => {
  res.setHeader('Cache-control', 'no-store');
  res.status(200).json({ user: req.user })
})

app.use('/api/auth', authRoutes);
app.use(authenticateAPI);

//routes
app.use('/api/users', usersRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/uploads', express.static('uploads'));





const URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(error => console.log(`Error: ${error.message}`));

mongoose.set('useFindAndModify', false);

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
  done(null, JSON.parse(user));
});

const GoogleStrategy = passportGoogle.OAuth2Strategy;
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(chalk.blue(JSON.stringify(profile)));
    return done(null, profile);
  }
));