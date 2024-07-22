import ShawarmaFromBasketModel from '../models/ShawarmaFromBasket.js';
import { ShawarmaFromBasket as ShawarmaFromBasketMapping } from '../models/mapping.js';
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
      if (!uniqueShawaKey) {
        throw new Error('Unique shawarma key is missing');
      }
      const basketItem = await ShawarmaFromBasketMapping.findOne({where: {uniqueShawaKey}});
      if (!basketItem) {
        shawarma = await ShawarmaFromBasketModel.create(req.body);
      } else {
        const newCount = basketItem.count + 1;
        await basketItem.update({count: newCount});
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
}

export default new ShawarmaFromBasket();
