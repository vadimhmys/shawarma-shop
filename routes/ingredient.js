import express from 'express';

const router = new express.Router();

router.get('/getall', (req, res) => res.status(200).send('Список всех ингредиентов'));
router.get('/getone/:id([0-9]+)', (req, res) =>
  res.status(200).send('Получение одного ингредиента'),
);
router.post('/create', (req, res) => res.status(200).send('Создание нового ингредиента'));
router.put('/update/:id([0-9]+)', (req, res) => res.status(200).send('Обновление ингредиента'));
router.delete('/delete/:id([0-9]+)', (req, res) => res.status(200).send('Удаление ингредиента'));

export default router;
