import express from 'express';
import ShawarmaController from '../controllers/Shawarma.js';

const router = new express.Router();

router.get('/getall', ShawarmaController.getAll);
router.get('/getone/:id([0-9]+)', ShawarmaController.getOne);
router.post('/create', ShawarmaController.create);
router.put('/update/:id([0-9]+)', ShawarmaController.update);
router.delete('/delete/:id([0-9]+)', ShawarmaController.delete);

export default router;
