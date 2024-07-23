import { User as UserMapping } from './mapping.js';

class User {
  async getAll() {
    const users = await UserMapping.findAll();
    return users;
  }

  async getOne(id) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error('User not found in DB');
    }
    return user;
  }

  async getByEmail(email) {
    const user = await UserMapping.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found in DB');
    }
    return user;
  }

  async create(data) {
    const { email, password, role } = data;
    const check = await UserMapping.findOne({ where: { email } });
    if (check) {
      throw new Error('User already exists');
    }
    const user = await UserMapping.create({ email, password, role });
    return user;
  }

  async update(id, data) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error('User not found in DB');
    }
    const {
      name = user.name,
      email = user.email,
      password = user.password,
      role = user.role,
    } = data;
    await user.update({ name, email, password, role });
    return user;
  }

  async delete(id) {
    const user = await UserMapping.findByPk(id);
    if (!user) {
      throw new Error('User not found in DB');
    }
    await user.destroy();
    return user;
  }
}

export default new User();
