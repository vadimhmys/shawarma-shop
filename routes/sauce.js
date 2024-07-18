import express from 'express';
import SauceController from '../controllers/Sauce.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getall', SauceController.getAll);
router.get('/getone/:id([0-9]+)', SauceController.getOne);
router.post('/create',/*authMiddleware, adminMiddleware,*/ SauceController.create);
router.put('/update/:id([0-9]+)',/*authMiddleware, adminMiddleware,*/ SauceController.update);
router.delete('/delete/:id([0-9]+)',/*authMiddleware, adminMiddleware,*/ SauceController.delete);

export default router;