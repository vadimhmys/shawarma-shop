import express from 'express';
import shawarma from './shawarma.js';
import category from './category.js';
import user from './user.js';
import basket from './basket.js';
import ingredient from './ingredient.js';

const router = new express.Router();

router.use('/shawarma', shawarma);
router.use('/category', category);
router.use('/user', user);
router.use('/basket', basket);
router.use('/ingredient', ingredient);

export default router;
