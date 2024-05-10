import { Ingredient as IngredientMapping } from './mapping.js';
import FileService from '../services/File.js';

class Ingredient {
  async getAll() {
    const ingredients = await IngredientMapping.findAll();
    return ingredients;
  }

  async getOne(id) {
    const ingredient = await IngredientMapping.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingredient not found in DB');
    }
    return ingredient;
  }

  async create(data, img) {
    const image = FileService.save(img) ?? '';
    const { name, price } = data;
    if (!name) {
      throw new Error('Ingredient name missing');
    }
    if (!price) {
      throw new Error('Ingredient price missing');
    }
    const ingredient = await IngredientMapping.create({
      name,
      price,
      image
    });
    
    return ingredient;
  }

  async update(id, data, img) {
    const ingredient = await IngredientMapping.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingredient not found in DB');
    }

    const file = FileService.save(img);

    if (file && ingredient.image) {
      FileService.delete(ingredient.image);
    }

    const {
      name = ingredient.name,
      price = ingredient.price,
      image = file ? file : ingredient.image,
    } = data;
    await ingredient.update({ name, price, image});
    await ingredient.reload();
    return ingredient;
  }

  async delete(id) {
    const ingredient = await IngredientMapping.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingredient not found in DB');
    }
    if (ingredient.image) {
      FileService.delete(ingredient.image);
    }
    await ingredient.destroy();
    return ingredient;
  }
}

export default new Ingredient();
