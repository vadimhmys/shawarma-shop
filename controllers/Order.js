import OrderModel from '../models/Order.js';
import BasketModel from '../models/Basket.js';
import UserModel from '../models/User.js';
import ShawarmaFromBasketModel from '../models/ShawarmaFromBasket.js';
import AppError from '../errors/AppError.js';

class Order {
  adminCreate = async (req, res, next) => {
    await this.create(req, res, next, 'admin');
  };

  userCreate = async (req, res, next) => {
    await this.create(req, res, next, 'user');
  };

  async create(req, res, next, type) {
    try {
      const { userName, phone, waitingTime, comment = null, payment = 'CASH' } = req.body;
      if (!userName) throw new Error('User name not provided');
      if (!phone) throw new Error('User phone not provided');
      if (!waitingTime) throw new Error('Waiting time not provided');

      let items,
        userId = null;

      if (type === 'admin') {
        items = req.body.items;
        if (!items) {
          throw new Error('The contents of the order are not specified');
        }

        if (items.length === 0) {
          throw new Error('The contents of the order are not specified');
        }

        items = items.map((item) => ({
          ...item,
          addedComponentsList: JSON.stringify(item.addedComponentsList),
          removedComponentsList: JSON.stringify(item.removedComponentsList),
        }));

        userId = req.body.userId ?? null;

        if (userId) {
          await UserModel.getOne(userId);
        }
      } else {
        if (!req.body.id) {
          throw new Error('User id is not specified');
        }

        userId = req.body.id;
        const basket = await BasketModel.getOne(userId);

        if (!basket) {
          throw new Error('Basket not found');
        }

        items = await ShawarmaFromBasketModel.getByUserId(userId);
      }

      const order = await OrderModel.create({
        userName,
        phone,
        waitingTime,
        comment,
        payment,
        items,
        userId,
      });

      if (userId) {
        await ShawarmaFromBasketModel.clear(userId);
      }

      res.json(order);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async adminGetAll(req, res, next) {
    try {
      const orders = await OrderModel.getAll();
      res.json(orders);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async adminGetUser(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('User id not specified');
      }
      const order = await OrderModel.getAll(req.params.id);
      res.json(order);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async adminGetOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Order id not specified');
      }
      const order = await OrderModel.getOne(req.params.id);
      res.json(order);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async adminDelete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Order id not specified');
      }
      const order = await OrderModel.delete(req.params.id);
      res.json(order);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async userGetAll(req, res, next) {
    try {
      const orders = await OrderModel.getAll(req.auth.id);
      res.json(orders);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async userGetOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id заказа');
      }
      const order = await OrderModel.getOne(req.params.id, req.auth.id);
      res.json(order);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Order();
