import IngredientModel from '../models/Ingredient.js';
import AppError from '../errors/AppError.js';

class Ingredient {
  async getAll(req, res, next) {
    try {
      const ingredients = await IngredientModel.getAll();
      res.json(ingredients);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const ingredient = await IngredientModel.create(req.body, req.files?.image);
      res.json(ingredient);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Ingredient ID not specified');
      }
      const ingredient = await IngredientModel.update(req.params.id, req.body, req.files?.image);
      res.json(ingredient);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Ingredient ID not specified');
      }
      const ingredient = await IngredientModel.delete(req.params.id);
      res.json(ingredient);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Ingredient();
