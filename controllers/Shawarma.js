import ShawarmaModel from '../models/Shawarma.js';
import AppError from '../errors/AppError.js';

class Shawarma {
  async getAll(req, res, next) {
    try {
      const shawarmas = await ShawarmaModel.getAll(req.query);
      res.json(shawarmas);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getAllForAdmin(req, res, next) {
    try {
      const shawarmas = await ShawarmaModel.getAllForAdmin();
      res.json(shawarmas);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const shawarma = await ShawarmaModel.create(req.body, req.files?.image, req.files?.icon);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Shawarma ID not specified');
      }

      const shawarma = await ShawarmaModel.update(
        req.params.id,
        req.body,
        req.files?.image,
        req.files?.icon,
      );
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Shawarma ID not specified');
      }
      const shawarma = await ShawarmaModel.delete(req.params.id);
      res.json(shawarma);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Shawarma();
