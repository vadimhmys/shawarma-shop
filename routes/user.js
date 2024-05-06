import express from 'express';

const router = new express.Router();

router.post('/signup', (req, res) => res.status(200).send('Регистрация пользователя'));
router.post('/login', (req, res) => res.status(200).send('Вход в личный кабинет'));
router.get('/check', (req, res) => res.status(200).send('Проверка авторизации'));

router.get('/getall', (req, res) => res.status(200).send('Список всех пользователй'));
router.get('/getone/:id([0-9]+)', (req, res) =>
  res.status(200).send('Получение одного пользователя'),
);
router.post('/create', (req, res) => res.status(200).send('Создание нового пользователя'));
router.put('/update/:id([0-9]+)', (req, res) => res.status(200).send('Обновление пользователя'));
router.delete('/delete/:id([0-9]+)', (req, res) => res.status(200).send('Удаление пользователя'));

export default router;
