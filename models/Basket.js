import { Basket as BasketMapping } from './mapping.js';
import { ShawarmaFromBasket as ShawarmaFromBasketMapping } from './mapping.js';

class Basket {
  async getOne(userId) {
    let basket = await BasketMapping.findOne({
      where: { userId },
      attributes: ['id'],
    });
    if (!basket) {
      throw new Error('Basket not found in database');
    }
    return basket;
  }

  async create(userId) {
    const basket = await BasketMapping.create({ userId });
    return basket;
  }
}

export default new Basket();
