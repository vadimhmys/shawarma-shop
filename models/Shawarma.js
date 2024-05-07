import { Shawarma as ShawarmaMapping } from './mapping.js';
import FileService from '../services/File.js';

class Shawarma {
  async getAll() {
    const shawarmas = await ShawarmaMapping.findAll();
    return shawarmas;
  }

  async getOne(id) {
    const shawarma = await ShawarmaMapping.findByPk(id);
    if (!shawarma) {
      throw new Error('Shawarma not found in DB');
    }
    return shawarma;
  }

  async create(data, img) {
    const image = FileService.save(img) ?? '';
    const { name, title, novelty = false, presence = true } = data;
    if (!name) {
      throw new Error('Shawarma name missing');
    }
    if (!title) {
      throw new Error('Shawarma name missing');
    }
    const shawarma = await ShawarmaMapping.create({ name, title, novelty, presence, image });
    return shawarma;
  }

  async update(id, data, img) {
    const shawarma = await ShawarmaMapping.findByPk(id);
    if (!shawarma) {
      throw new Error('Shawarma not found in DB');
    }

    const file = FileService.save(img);

    if (file && shawarma.image) {
      FileService.delete(shawarma.image);
    }

    const {
      name = shawarma.name,
      title = shawarma.title,
      novelty = shawarma.novelty,
      presence = shawarma.presence,
      image = file ? file : shawarma.image,
    } = data;
    await shawarma.update({ name, title, image, novelty, presence });
    return shawarma;
  }

  async delete(id) {
    const shawarma = await ShawarmaMapping.findByPk(id);
    if (!shawarma) {
      throw new Error('Shawarma not found in DB');
    }
    await shawarma.destroy();
    return shawarma;
  }
}

export default new Shawarma();
