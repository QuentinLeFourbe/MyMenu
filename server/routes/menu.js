import express from 'express';
import { getMenu, createMenu, getAllMenus, updateMenu, getMenusBetweenDates as getMenusBetweenDates, deleteMenu, deleteAllMenus, cleanMenus } from '../controllers/menus.js';
import { authenticateAPI } from '../middleware/authenticateApi.js';


const router = express.Router();
router.use(authenticateAPI);

router.get('/filter', getMenusBetweenDates)
router.get('/:id', getMenu);
router.get('/', getAllMenus);

router.post('/', createMenu);

router.put('/:id', updateMenu);
router.put('/cleanMenus', cleanMenus);

router.delete('/:id', deleteMenu);
router.delete('/', deleteAllMenus);

export default router;