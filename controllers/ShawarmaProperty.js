import AppError from '../errors/AppError.js';
import ShawarmaPropertyModel from '../models/ShawarmaProperty.js';

class ShawarmaProperty {
  async create(req, res, next) {
    try {
      const property = await ShawarmaPropertyModel.create(req.body);
      res.json(property);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new ShawarmaProperty();
