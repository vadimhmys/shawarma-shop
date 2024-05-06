import express from 'express';

const router = new express.Router();

router.get('/getall', (req, res) => res.status(200).send('Список всех шавух'));
router.get('/getone/:id([0-9]+)', (req, res) => res.status(200).send('Получение одной шавухи'));
router.post('/create', (req, res) => res.status(200).send('Создание новой шавухи'));
router.put('/update/:id([0-9]+)', (req, res) => res.status(200).send('Обновление шавухи'));
router.delete('/delete/:id([0-9]+)', (req, res) => res.status(200).send('Удаление шавухи'));

export default router;
