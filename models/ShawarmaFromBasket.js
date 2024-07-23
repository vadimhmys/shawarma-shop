import { ShawarmaFromBasket as ShawarmaFromBasketMapping } from './mapping.js';
import { Basket as BasketMapping } from './mapping.js';

class ShawarmaFromBasket {
  async getByUserId(id) {
    if (!id) {
      throw new Error('User id missing');
    }

    const basket = await BasketMapping.findOne({where: {userId: id}});

    if (!basket) {
      throw new Error('Basket id missing');
    }

    const basketId = basket.id;
    const where = {};
    where.basketId = basketId;
    const shawarmas = await ShawarmaFromBasketMapping.findAll({where, order: ['createdAt']});
    return shawarmas;
  }

  async create(data) {
    const {
      uniqueShawaKey,
      shawarmaId,
      title,
      image,
      weight,
      price,
      cake,
      count,
      addedComponentsList,
      removedComponentsList,
      userId,
    } = data;

    if (!uniqueShawaKey) {
      throw new Error('uniqueShawaKey missing');
    }
    if (!shawarmaId) {
      throw new Error('shawarmaId missing');
    }
    if (!title) {
      throw new Error('title missing');
    }
    if (!image) {
      throw new Error('image missing');
    }
    if (!weight) {
      throw new Error('weight missing');
    }
    if (!price) {
      throw new Error('price missing');
    }
    if (!cake) {
      throw new Error('cake missing');
    }
    if (!count) {
      throw new Error('count missing');
    }
    if (!addedComponentsList) {
      throw new Error('addedComponentsList missing');
    }
    if (!removedComponentsList) {
      throw new Error('removedComponentsList missing');
    }
    if (!userId) {
      throw new Error('User id missing');
    }

    const basket = await BasketMapping.findOne({where: {userId}});
    const basketId = basket.id;

    const shawarma = await ShawarmaFromBasketMapping.create({
      uniqueShawaKey,
      shawarmaId,
      title,
      image,
      weight,
      price,
      cake,
      count,
      addedComponentsList,
      removedComponentsList,
      basketId,
    });
    return shawarma;
  }

  async increment(id) {
    const shawarma = await ShawarmaFromBasketMapping.findByPk(id);

    if (!shawarma) {
      throw new Error('Shawarma with unique key is missing');
    }

    const newCount = shawarma.count + 1;
    await shawarma.update({count: newCount});
    await shawarma.reload();
    return shawarma;
  }

  async decrement(id) {
    const shawarma = await ShawarmaFromBasketMapping.findByPk(id);

    if (!shawarma) {
      throw new Error('Shawarma with unique key is missing');
    }

    const newCount = shawarma.count - 1;
    await shawarma.update({count: newCount});
    await shawarma.reload();
    return shawarma;
  }

  async delete(id) {
    const shawarma = await ShawarmaFromBasketMapping.findByPk(id);

    if (!shawarma) {
      throw new Error('Shawarma with unique key is missing');
    }

    await shawarma.destroy();
    return shawarma;
  }

  async clear(userId) {
    let basket = await BasketMapping.findOne({
      where: { userId },
      attributes: ['id'],
    });
    if (!basket) {
      throw new Error('Basket not found in database');
    }

    await ShawarmaFromBasketMapping.destroy({where: {basketId: basket.id}});
    return [];
  }
}

export default new ShawarmaFromBasket();
