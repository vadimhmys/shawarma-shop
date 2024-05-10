import SauceModel from '../models/Sauce.js';
import AppError from '../errors/AppError.js';

class Sauce {
  async getAll(req, res, next) {
    try {
      const sauces = await SauceModel.getAll();
      res.json(sauces);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Sauce ID not specified');
      }
      const sauce = await SauceModel.getOne(req.params.id);
      res.json(sauce);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const sauce = await SauceModel.create(req.body, req.files?.image);
      res.json(sauce);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Sauce ID not specified');
      }
      const sauce = await SauceModel.update(req.params.id, req.body, req.files?.image);
      res.json(sauce);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Sauce ID not specified');
      }
      const sauce = await SauceModel.delete(req.params.id);
      res.json(sauce);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Sauce();
