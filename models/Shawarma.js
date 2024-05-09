import { Shawarma as ShawarmaMapping } from './mapping.js';
import { ShawarmaProp as ShawarmaPropMapping } from './mapping.js';
import { ShawarmaComponent as ShawarmaComponentMapping } from './mapping.js';
import FileService from '../services/File.js';

class Shawarma {
  async getAll() {
    const shawarmas = await ShawarmaMapping.findAll({
      include: [
        { model: ShawarmaPropMapping, as: 'props' },
        { model: ShawarmaComponentMapping, as: 'components' },
      ],
    });
    return shawarmas;
  }

  async getOne(id) {
    const shawarma = await ShawarmaMapping.findOne({
      where: { id: id },
      include: [
        { model: ShawarmaPropMapping, as: 'props' },
        { model: ShawarmaComponentMapping, as: 'components' },
      ],
    });
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
    if (data.props) {
      const props = JSON.parse(data.props);
      for (let prop of props) {
        await ShawarmaPropMapping.create({
          weight: prop.weight,
          price: prop.price,
          shawarmaId: shawarma.id,
        });
      }
    }
    if (data.components) {
      const components = JSON.parse(data.components);
      for (let component of components) {
        await ShawarmaComponentMapping.create({
          name: component.name,
          necessity: component.necessity,
          shawarmaId: shawarma.id,
        });
      }
    }
    return shawarma;
  }

  async update(id, data, img) {
    const shawarma = await ShawarmaMapping.findByPk(id, {
      include: [
        { model: ShawarmaPropMapping, as: 'props' },
        { model: ShawarmaComponentMapping, as: 'components' },
      ],
    });
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
    if (data.props) {
      await ShawarmaPropMapping.destroy({ where: { shawarmaId: id } });
      const props = JSON.parse(data.props);
      for (let prop of props) {
        await ShawarmaPropMapping.create({
          weight: prop.weight,
          price: prop.price,
          shawarmaId: shawarma.id,
        });
      }
    }
    if (data.components) {
      await ShawarmaComponentMapping.destroy({ where: { shawarmaId: id } });
      const components = JSON.parse(data.components);
      for (let component of components) {
        await ShawarmaComponentMapping.create({
          name: component.name,
          necessity: component.necessity,
          shawarmaId: shawarma.id,
        });
      }
    }
    await shawarma.reload();
    return shawarma;
  }

  async delete(id) {
    const shawarma = await ShawarmaMapping.findByPk(id);
    if (!shawarma) {
      throw new Error('Shawarma not found in DB');
    }
    if (shawarma.image) {
      FileService.delete(shawarma.image);
    }
    await shawarma.destroy();
    return shawarma;
  }
}

export default new Shawarma();
