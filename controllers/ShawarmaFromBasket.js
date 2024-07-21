import ShawarmaFromBasketModel from '../models/ShawarmaFromBasket.js';
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
      const shawarma = await ShawarmaFromBasketModel.create(req.body);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new ShawarmaFromBasket();
