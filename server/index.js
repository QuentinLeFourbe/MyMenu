import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js';
import mealRoutes from './routes/meals.js';
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/meals', mealRoutes);

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

