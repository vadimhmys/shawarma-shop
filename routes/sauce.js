import express from 'express';
import SauceController from '../controllers/Sauce.js';

const router = new express.Router();

router.get('/getall', SauceController.getAll);
router.get('/getone/:id([0-9]+)', SauceController.getOne);
router.post('/create', SauceController.create);
router.put('/update/:id([0-9]+)', SauceController.update);
router.delete('/delete/:id([0-9]+)', SauceController.delete);

export default router;