import express from 'express';
import ShawarmaController from '../controllers/Shawarma.js';
import ShawarmaPropertyController from '../controllers/ShawarmaProperty.js';
import ShawarmaComponentController from '../controllers/ShawarmaComponent.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.get('/getall', ShawarmaController.getAll);
router.get('/getallForAdmin', authMiddleware, adminMiddleware, ShawarmaController.getAllForAdmin);
router.post('/create', authMiddleware, adminMiddleware, ShawarmaController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ShawarmaController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ShawarmaController.delete);
router.post('/property/create', authMiddleware, adminMiddleware, ShawarmaPropertyController.create);
router.post(
  '/component/create',
  authMiddleware,
  adminMiddleware,
  ShawarmaComponentController.create,
);

export default router;
