import ShawarmaFromBasketModel from '../models/ShawarmaFromBasket.js';
import AppError from '../errors/AppError.js';

class ShawarmaFromBasket {
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
