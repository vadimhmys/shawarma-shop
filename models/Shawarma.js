import { Shawarma as ShawarmaMapping } from './mapping.js';
import { ShawarmaProp as ShawarmaPropMapping } from './mapping.js';
import { ShawarmaComponent as ShawarmaComponentMapping } from './mapping.js';
import FileService from '../services/File.js';

class Shawarma {
  async getAll(query) {
    const { categoryId } = query;
    const where = {};
    if (categoryId && categoryId > 0) where.categoryId = +categoryId;
    if (categoryId === '1') {
      delete where.categoryId;
      where.novelty = true; 
    }
    const shawarmas = await ShawarmaMapping.findAll({
      where,
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

  async create(data, img, logo) {
    const image = FileService.save(img) ?? '';
    const icon = FileService.save(logo);
    const { name, title, novelty = false, presence = true, categoryId = null } = data;
    if (!name) {
      throw new Error('Shawarma name missing');
    }
    if (!title) {
      throw new Error('Shawarma name missing');
    }
    const shawarma = await ShawarmaMapping.create({
      name,
      title,
      novelty,
      presence,
      image,
      icon,
      categoryId,
    });
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

  async update(id, data, img, logo) {
    const shawarma = await ShawarmaMapping.findByPk(id, {
      include: [
        { model: ShawarmaPropMapping, as: 'props' },
        { model: ShawarmaComponentMapping, as: 'components' },
      ],
    });
    if (!shawarma) {
      throw new Error('Shawarma not found in DB');
    }

    const fileImg = FileService.save(img);
    const fileIcon = FileService.save(logo);

    if (fileImg && shawarma.image) {
      FileService.delete(shawarma.image);
    }

    if (fileIcon && shawarma.icon) {
      FileService.delete(shawarma.icon);
    }

    const {
      name = shawarma.name,
      title = shawarma.title,
      novelty = shawarma.novelty,
      presence = shawarma.presence,
      image = fileImg ? fileImg : shawarma.image,
      icon = fileIcon ? fileIcon : shawarma.icon,
      categoryId = shawarma.categoryId,
    } = data;
    await shawarma.update({ name, title, image, icon, novelty, presence, categoryId });
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
    if (shawarma.icon) {
      FileService.delete(shawarma.icon);
    }
    await shawarma.destroy();
    return shawarma;
  }
}

export default new Shawarma();
