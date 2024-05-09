import sequelize from '../sequelize.js';
import database from 'sequelize';

const { DataTypes } = database;

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Shawarma = sequelize.define('shawarma', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  novelty: { type: DataTypes.BOOLEAN, defaultValue: false },
  presence: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Ingredient = sequelize.define('ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const BasketShawarma = sequelize.define('basket_shawarma', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const ShawarmaProp = sequelize.define('shawarma_prop', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 15 },
  status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  comment: { type: DataTypes.STRING },
  payment: { type: DataTypes.STRING, allowNull: false, defaultValue: 'CASH' },
  prettyCreatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      const value = this.getDataValue('createdAt');
      const day = value.getDate();
      const month = value.getMonth() + 1;
      const year = value.getFullYear();
      const hours = value.getHours();
      const minutes = value.getMinutes();
      return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    },
  },
  prettyUpdatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      const value = this.getDataValue('updatedAt');
      const day = value.getDate();
      const month = value.getMonth() + 1;
      const year = value.getFullYear();
      const hours = value.getHours();
      const minutes = value.getMinutes();
      return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    },
  },
});

const OrderItem = sequelize.define('order_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  cake: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USUAL' },
  added: { type: DataTypes.STRING, defaultValue: '' },
  deleted: { type: DataTypes.STRING, defaultValue: '' },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const CategoryShawarma = sequelize.define('category_shawarma', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Basket.belongsToMany(Shawarma, { through: BasketShawarma, onDelete: 'CASCADE' });
Shawarma.belongsToMany(Basket, { through: BasketShawarma, onDelete: 'CASCADE' });
Basket.hasMany(BasketShawarma);
BasketShawarma.belongsTo(Basket);
Shawarma.hasMany(BasketShawarma);
BasketShawarma.belongsTo(Shawarma);

Category.belongsToMany(Shawarma, { through: CategoryShawarma, onDelete: 'CASCADE' });
Shawarma.belongsToMany(Category, { through: CategoryShawarma, onDelete: 'CASCADE' });
Category.hasMany(CategoryShawarma);
CategoryShawarma.belongsTo(Category);
Shawarma.hasMany(CategoryShawarma);
CategoryShawarma.belongsTo(Shawarma);

Shawarma.hasMany(ShawarmaProp, { as: 'props', onDelete: 'CASCADE' });
ShawarmaProp.belongsTo(Shawarma);

Shawarma.hasMany(Ingredient, { as: 'ingrs', onDelete: 'CASCADE' });
Ingredient.belongsTo(Shawarma);

Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

User.hasMany(Order, { as: 'orders', onDelete: 'SET NULL' });
Order.belongsTo(User);

export {
  User,
  Basket,
  Shawarma,
  Ingredient,
  BasketShawarma,
  ShawarmaProp,
  Category,
  CategoryShawarma,
  Order,
  OrderItem,
};
