import express from 'express';
import ShawarmaFromBasketController from '../controllers/ShawarmaFromBasket.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getByUserId',authMiddleware, ShawarmaFromBasketController.getByUserId);
router.post('/create',authMiddleware, ShawarmaFromBasketController.create);
router.put('/increment',authMiddleware, ShawarmaFromBasketController.increment);

export default router;
