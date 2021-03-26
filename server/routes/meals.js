import express from 'express';
import { getMeals, createMeal, getMeal, updateMeal, getMealsLookup, deleteMeal } from '../controllers/meals.js';
import multer from 'multer'

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100 //10 Mo
    },
    fileFilter: fileFilter
});

const router = express.Router();

router.get('/lookup', getMealsLookup);
router.get('/:id', getMeal);
router.get('/', getMeals);

router.post('/', upload.single('mealImage'), createMeal);

router.put('/:id', upload.single('mealImage'),updateMeal);

router.delete('/:id', deleteMeal);

export default router;