import { Order as OrderMapping } from './mapping.js';
import { OrderItem as OrderItemMapping } from './mapping.js';

const formatter = new Intl.NumberFormat('ru', {
  minimumFractionDigits: 2,
});

class Order {
  async getAll(userId = null) {
    let orders;
    if (userId) {
      orders = await OrderMapping.findAll({ where: { userId } });
    } else {
      orders = await OrderMapping.findAll();
    }
    return orders;
  }

  async getOne(id, userId = null) {
    let order;
    if (userId) {
      order = await OrderMapping.findOne({
        where: { id, userId },
        include: [
          {
            model: OrderItemMapping,
            as: 'items',
            attributes: [
              'title',
              'weight',
              'price',
              'count',
              'cake',
              'addedComponentsList',
              'removedComponentsList',
            ],
          },
        ],
      });
    } else {
      order = await OrderMapping.findByPk(id, {
        include: [
          {
            model: OrderItemMapping,
            as: 'items',
            attributes: [
              'title',
              'weight',
              'price',
              'count',
              'cake',
              'addedComponentsList',
              'removedComponentsList',
            ],
          },
        ],
      });
    }
    if (!order) {
      throw new Error('Order not found in database');
    }
    return order;
  }

  async create(data) {
    const items = data.items;
    const amount = formatter.format(
      items.reduce((sum, item) => sum + item.count * parseFloat(item.price.replace(',', '.')), 0),
    );
    const { userName, phone, waitingTime, comment = null, payment, userId = null } = data;
    const order = await OrderMapping.create({
      userName,
      phone,
      waitingTime,
      comment,
      payment,
      amount,
      userId,
    });

    for (let item of items) {
      await OrderItemMapping.create({
        title: item.title,
        weight: item.weight,
        price: item.price,
        count: item.count,
        cake: item.cake,
        addedComponentsList: item.addedComponentsList,
        removedComponentsList: item.removedComponentsList,
        orderId: order.id,
      });
    }

    const created = await OrderMapping.findByPk(order.id, {
      include: [
        {
          model: OrderItemMapping,
          as: 'items',
          attributes: [
            'title',
            'weight',
            'price',
            'count',
            'cake',
            'addedComponentsList',
            'removedComponentsList',
          ],
        },
      ],
    });
    return created;
  }

  async delete(id) {
    let order = await OrderMapping.findByPk(id, {
      include: [
        {
          model: OrderItemMapping,
          as: 'items',
          attributes: [
            'title',
            'weight',
            'price',
            'count',
            'cake',
            'addedComponentsList',
            'removedComponentsList',
          ],
        },
      ],
    });
    if (!order) {
      throw new Error('Order not found in database');
    }
    await order.destroy();
    return order;
  }
}

export default new Order();
