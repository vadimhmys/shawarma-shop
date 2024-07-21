import { ShawarmaFromBasket as ShawarmaFromBasketMapping } from './mapping.js';
import Basket from '../models/Basket.js';

class ShawarmaFromBasket {
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

    const basket = await Basket.getOne(userId);
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
}

export default new ShawarmaFromBasket();
