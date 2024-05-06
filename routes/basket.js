import express from 'express';

const router = new express.Router();

router.get('/getone', (req, res) => res.status(200).send('Получить корзину'));
router.put('/product/:productId([0-9]+)/append/:quantity([0-9]+)', (req, res) =>
  res.status(200).send('Добавить товар в корзину'),
);
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)', (req, res) =>
  res.status(200).send('Увеличить счетчик корзины'),
);
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)', (req, res) =>
  res.status(200).send('Уменьшить счетчик корзины'),
);
router.put('/product/:productId([0-9]+)/remove', (req, res) =>
  res.status(200).send('Удалить товар из корзины'),
);
router.put('/clear', (req, res) => res.status(200).send('Очистить корзину'));

export default router;
