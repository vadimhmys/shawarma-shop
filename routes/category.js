import express from 'express';

const router = new express.Router();

router.get('/getall', (req, res) => res.status(200).send('Список всех категорий'));
router.get('/getone/:id([0-9]+)', (req, res) => res.status(200).send('Получение одной категории'));
router.post('/create', (req, res) => res.status(200).send('Создание новой категории'));
router.put('/update/:id([0-9]+)', (req, res) => res.status(200).send('Обновление категории'));
router.delete('/delete/:id([0-9]+)', (req, res) => res.status(200).send('Удаление категории'));

export default router;
