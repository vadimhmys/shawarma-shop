import AppError from '../errors/AppError.js';
import ShawarmaComponentModel from '../models/ShawarmaComponent.js';

class ShawarmaComponent {
  async create(req, res, next) {
    try {
      const component = await ShawarmaComponentModel.create(req.body);
      res.json(component);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new ShawarmaComponent();
