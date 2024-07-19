import express from 'express';
import shawarma from './shawarma.js';
import category from './category.js';
import user from './user.js';
import ingredient from './ingredient.js';
import sauce from './sauce.js';
import shawarmaFromBasket from './shawarmFromBasket.js';

const router = new express.Router();

router.use('/shawarmas', shawarma);
router.use('/categories', category);
router.use('/user', user);
router.use('/ingredients', ingredient);
router.use('/sauces', sauce);
router.use('/basketshawarmas', shawarmaFromBasket);

export default router;
