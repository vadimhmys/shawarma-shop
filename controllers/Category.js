import CategoryModel from '../models/Category.js';
import AppError from '../errors/AppError.js';

class Category {
  async getAll(_, res, next) {
    try {
      const categories = await CategoryModel.getAll();
      res.json(categories);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      if (!req.body.name) {
        throw new Error('No category name');
      }
      const category = await CategoryModel.create(req.body);
      res.json(category);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Category id not specified');
      }
      if (!req.body.name) {
        throw new Error('No category name');
      }

      const category = await CategoryModel.update(req.params.id, req.body);
      res.json(category);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Category id not specified');
      }
      const category = await CategoryModel.delete(req.params.id);
      res.json(category);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Category();
