import { Sauce as SauceMapping } from './mapping.js';
import FileService from '../services/File.js';

class Sauce {
  async getAll() {
    const sauces = await SauceMapping.findAll();
    return sauces;
  }

  async getOne(id) {
    const sauce = await SauceMapping.findByPk(id);
    if (!sauce) {
      throw new Error('Sauce not found in DB');
    }
    return sauce;
  }

  async create(data, img) {
    const image = FileService.save(img) ?? '';
    const { name, price } = data;
    if (!name) {
      throw new Error('Sauce name missing');
    }
    if (!price) {
      throw new Error('Sauce price missing');
    }
    const sauce = await SauceMapping.create({
      name,
      price,
      image,
    });

    return sauce;
  }

  async update(id, data, img) {
    const sauce = await SauceMapping.findByPk(id);
    if (!sauce) {
      throw new Error('Sauce not found in DB');
    }

    const file = FileService.save(img);

    if (file && sauce.image) {
      FileService.delete(sauce.image);
    }

    const {
      name = sauce.name,
      price = sauce.price,
      image = file ? file : sauce.image,
    } = data;
    await sauce.update({ name, price, image });
    await sauce.reload();
    return sauce;
  }

  async delete(id) {
    const sauce = await SauceMapping.findByPk(id);
    if (!sauce) {
      throw new Error('Sauce not found in DB');
    }
    if (sauce.image) {
      FileService.delete(sauce.image);
    }
    await sauce.destroy();
    return sauce;
  }
}

export default new Sauce();
