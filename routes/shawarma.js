import express from 'express';
import ShawarmaController from '../controllers/Shawarma.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getall', ShawarmaController.getAll);
router.get('/getone/:id([0-9]+)', ShawarmaController.getOne);
router.post('/create', authMiddleware, adminMiddleware, ShawarmaController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ShawarmaController.update);
router.delete(
  '/delete/:id([0-9]+)',
  authMiddleware, adminMiddleware, ShawarmaController.delete,
);

export default router;
