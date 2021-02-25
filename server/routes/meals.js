import express from 'express';
import { getMeals, createMeal, getMeal, updateMeal, getMealsLookup } from '../controllers/meals.js';

const router = express.Router();

router.get('/lookup',getMealsLookup);
router.get('/:id', getMeal);
router.get('/', getMeals);

router.post('/', createMeal);


router.put('/:id', updateMeal);



export default router;