import { ShawarmaProp as ShawarmaPropMapping } from './mapping.js';

class ShawarmaProperty {
  async create(data) {
    const { shawarmaId, weight, price } = data;
    if (!shawarmaId) {
      throw new Error('Shawarma id missing');
    }
    if (!weight && weight !== 0) {
      throw new Error('Weight missing');
    }
    if (!price && price !== 0) {
      throw new Error('Price missing');
    }

    const property = await ShawarmaPropMapping.create({
      shawarmaId,
      weight,
      price,
    });

    return property;
  }
}

export default new ShawarmaProperty();
