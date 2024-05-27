import express from 'express';
import shawarma from './shawarma.js';
import category from './category.js';
import user from './user.js';
import basket from './basket.js';
import ingredient from './ingredient.js';
import sauce from './sauce.js';

const router = new express.Router();

router.use('/shawarmas', shawarma);
router.use('/categories', category);
router.use('/users', user);
router.use('/baskets', basket);
router.use('/ingredients', ingredient);
router.use('/sauces', sauce);

export default router;
