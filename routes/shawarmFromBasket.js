import express from 'express';
import ShawarmaFromBasketController from '../controllers/ShawarmaFromBasket.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getByUserId',authMiddleware, ShawarmaFromBasketController.getByUserId);
router.post('/create',authMiddleware, /* adminMiddleware, */ ShawarmaFromBasketController.create);

export default router;
