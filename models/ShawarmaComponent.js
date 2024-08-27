import { ShawarmaComponent as ShawarmaComponentMapping } from './mapping.js';

class ShawarmaComponent {
  async create(data) {
    const { shawarmaId, name, necessity } = data;
    if (!shawarmaId) {
      throw new Error('Shawarma id missing');
    }
    if (!name && name !== '') {
      throw new Error('Component name missing');
    }

    const component = await ShawarmaComponentMapping.create({
      shawarmaId,
      name,
      necessity: Boolean(necessity),
    });

    return component;
  }
}

export default new ShawarmaComponent();
