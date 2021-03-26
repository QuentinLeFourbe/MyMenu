import express from 'express';
import { getMenu, createMenu, getAllMenus, updateMenu, getMenusBetweenDates as getMenusBetweenDates, deleteMenu, deleteAllMenus } from '../controllers/menus.js';


const router = express.Router();

router.get('/filter', getMenusBetweenDates)
router.get('/:id', getMenu);
router.get('/', getAllMenus);

router.post('/', createMenu);

router.put('/:id', updateMenu);

router.delete('/:id', deleteMenu);
router.delete('/', deleteAllMenus);

export default router;