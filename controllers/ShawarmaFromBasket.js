import ShawarmaFromBasketModel from '../models/ShawarmaFromBasket.js';
import { ShawarmaFromBasket as ShawarmaFromBasketMapping } from '../models/mapping.js';
import Basket from '../models/Basket.js';
import AppError from '../errors/AppError.js';

class ShawarmaFromBasket {
  async getByUserId(req, res, next) {
    try {
      if (!req.query.id) {
        throw new Error('User ID not specified');
      }
      const shawarmas = await ShawarmaFromBasketModel.getByUserId(req.query.id);
      res.json(shawarmas);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      let shawarma;
      const uniqueShawaKey = req.body?.uniqueShawaKey;
      const userId = req.body?.userId;
      if (!uniqueShawaKey || !userId) {
        throw new Error('Unique shawarma key or user id are missing');
      }

      const basket = await Basket.getOne(userId);
      const basketItem = await ShawarmaFromBasketMapping.findOne({
        where: { uniqueShawaKey, basketId: basket.id },
      });
      if (!basketItem) {
        shawarma = await ShawarmaFromBasketModel.create(req.body);
      } else {
        const newCount = basketItem.count + 1;
        await basketItem.update({ count: newCount });
        await basketItem.reload();
        shawarma = basketItem;
      }

      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async increment(req, res, next) {
    try {
      const id = req.body?.id;
      if (!id) {
        throw new Error('Shawarma id is missing');
      }
      const shawarma = await ShawarmaFromBasketModel.increment(id);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async decrement(req, res, next) {
    try {
      const id = req.body?.id;
      if (!id) {
        throw new Error('Shawarma id is missing');
      }
      const shawarma = await ShawarmaFromBasketModel.decrement(id);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.query?.id;
      if (!id) {
        throw new Error('Shawarma id is missing');
      }
      const shawarma = await ShawarmaFromBasketModel.delete(id);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async clear(req, res, next) {
    try {
      const userId = req.body.id;
      if (!userId) {
        throw new Error('User id is missing');
      }
      const result = ShawarmaFromBasketModel.clear(userId);
      res.json(result);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async recordAll(req, res, next) {
    try {
      const items = req.body.items;
      const userId = req.body.userId;
      if (!userId) {
        throw new Error('User id is missing');
      }
      if (!items) {
        throw new Error('No data to record');
      }

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('The recording data is incorrect');
      }

      const shawarmas = await ShawarmaFromBasketModel.recordAll(items, userId);
      res.json(shawarmas);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new ShawarmaFromBasket();
