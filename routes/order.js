import express from 'express';
import OrderController from '../controllers/Order.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

/*
 * only for admin
 */

router.get('/admin/getall', authMiddleware, adminMiddleware, OrderController.adminGetAll);
router.get(
  '/admin/getall/user/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  OrderController.adminGetUser,
);
router.get(
  '/admin/getone/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  OrderController.adminGetOne,
);
router.post('/admin/create', authMiddleware, adminMiddleware, OrderController.adminCreate);
router.put(
  '/admin/update/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  OrderController.adminUpdate,
);
router.delete(
  '/admin/delete/:id([0-9]+)',
  authMiddleware,
  adminMiddleware,
  OrderController.adminDelete,
);

/*
 * for authorized user
 */

router.get('/user/getall', authMiddleware, OrderController.userGetAll);
router.get('/user/getone/:id([0-9]+)', authMiddleware, OrderController.userGetOne);
router.post('/user/create', authMiddleware, OrderController.userCreate);

export default router;
