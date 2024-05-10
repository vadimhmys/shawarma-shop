import express from 'express';
import IngredientController from '../controllers/Ingredient.js';

const router = new express.Router();

router.get('/getall', IngredientController.getAll);
router.get('/getone/:id([0-9]+)', IngredientController.getOne);
router.post('/create', IngredientController.create);
router.put('/update/:id([0-9]+)', IngredientController.update);
router.delete('/delete/:id([0-9]+)', IngredientController.delete);

export default router;
