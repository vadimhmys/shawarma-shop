import { Category as CategoryMapping } from './mapping.js';

class Category {
  async getAll() {
    const categories = await CategoryMapping.findAll();
    return categories;
  }

  async getOne(id) {
    const category = await CategoryMapping.findByPk(id);
    if (!category) {
      throw new Error('Category not found in DB');
    }
    return category;
  }

  async create(data) {
    const { name } = data;
    const exist = await CategoryMapping.findOne({ where: { name } });
    if (exist) {
      throw new Error('This category already exists');
    }
    const category = await CategoryMapping.create({ name });
    return category;
  }

  async update(id, data) {
    const category = await CategoryMapping.findByPk(id);
    if (!category) {
      throw new Error('Category not found in DB');
    }
    const { name = category.name } = data;
    await category.update({ name });
    return category;
  }

  async delete(id) {
    const category = await CategoryMapping.findByPk(id);
    if (!category) {
      throw new Error('Category not found in DB');
    }
    await category.destroy();
    return category;
  }
}

export default new Category();
