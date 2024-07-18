import express from 'express';
import IngredientController from '../controllers/Ingredient.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getall', IngredientController.getAll);
router.get('/getone/:id([0-9]+)', IngredientController.getOne);
router.post('/create',/*authMiddleware, adminMiddleware,*/ IngredientController.create);
router.put('/update/:id([0-9]+)',/*authMiddleware, adminMiddleware,*/ IngredientController.update);
router.delete('/delete/:id([0-9]+)',/*authMiddleware, adminMiddleware,*/ IngredientController.delete);

export default router;
