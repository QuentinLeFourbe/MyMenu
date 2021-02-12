import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js';
import mealRoutes from './routes/meals.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/meals', mealRoutes);

const URL = 'mongodb+srv://admin:Cacadu40@cluster0.jmrhk.mongodb.net/MyMenu?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.log(`Error: ${error.message}`));

mongoose.set('useFindAndModify', false);

