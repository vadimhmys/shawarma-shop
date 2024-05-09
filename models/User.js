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

  async create(data) {
    const { name, email, password, role } = data;
    const user = await UserMapping.create({ name, email, password, role });
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
