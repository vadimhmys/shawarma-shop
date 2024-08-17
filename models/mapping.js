import sequelize from '../sequelize.js';
import database from 'sequelize';

const { DataTypes } = database;

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
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
  icon: { type: DataTypes.STRING },
  novelty: { type: DataTypes.BOOLEAN, defaultValue: false },
  presence: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Ingredient = sequelize.define('ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

const Sauce = sequelize.define('sauce', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

const ShawarmaFromBasket = sequelize.define('shawarma_from_basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uniqueShawaKey: { type: DataTypes.TEXT, allowNull: false },
  shawarmaId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  cake: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, defaultValue: 1 },
  addedComponentsList: { type: DataTypes.TEXT, allowNull: false },
  removedComponentsList: { type: DataTypes.TEXT, allowNull: false },
});

const ShawarmaProp = sequelize.define('shawarma_prop', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

const ShawarmaComponent = sequelize.define('shawarma_component', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  necessity: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  waitingTime: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 15 },
  comment: { type: DataTypes.TEXT },
  payment: { type: DataTypes.STRING, allowNull: false, defaultValue: 'CASH' },
  amount: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  prettyCreatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      const value = this.getDataValue('createdAt');
      let day = value.getDate() + '';
      if (day.length === 1) day = '0' + day;
      let month = value.getMonth() + 1 + '';
      if (month.length === 1) month = '0' + month;
      const year = value.getFullYear();
      let hours = value.getHours() + '';
      if (hours.length === 1) hours = '0' + hours;
      let minutes = value.getMinutes() + '';
      if (minutes.length === 1) minutes = '0' + minutes;
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
  title: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
  cake: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USUAL' },
  addedComponentsList: { type: DataTypes.TEXT, allowNull: false },
  removedComponentsList: { type: DataTypes.TEXT, allowNull: false },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

Basket.hasMany(ShawarmaFromBasket, { onDelete: 'CASCADE' });
ShawarmaFromBasket.belongsTo(Basket);

Category.hasMany(Shawarma, { onDelete: 'CASCADE' });
Shawarma.belongsTo(Category);

Shawarma.hasMany(ShawarmaProp, { as: 'props', onDelete: 'CASCADE' });
ShawarmaProp.belongsTo(Shawarma);

Shawarma.hasMany(ShawarmaComponent, { as: 'components', onDelete: 'CASCADE' });
ShawarmaComponent.belongsTo(Shawarma);

Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

User.hasMany(Order, { as: 'orders', onDelete: 'SET NULL' });
Order.belongsTo(User);

User.hasOne(Basket, { onDelete: 'CASCADE' });
Basket.belongsTo(User);

export {
  User,
  Basket,
  Shawarma,
  Ingredient,
  Sauce,
  ShawarmaFromBasket,
  ShawarmaProp,
  ShawarmaComponent,
  Category,
  Order,
  OrderItem,
};
