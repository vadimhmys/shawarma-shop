import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import BasketModel from '../models/Basket.js';
import AppError from '../errors/AppError.js';

const makeJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class User {
  async signup(req, res, next) {
    const { email, password, role = 'USER' } = req.body;
    try {
      if (!email || !password) {
        throw new Error('Blank email or password');
      }
      if (role !== 'USER') {
        throw new Error('Only USER role is possible');
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({ email, password: hash, role });
      if (!user?.id) {
        throw new Error('User was not created');
      }
      const basket = await BasketModel.create(user.id);
      if (!basket) {
        throw new Error('Basket was not created');
      }
      const token = makeJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error('Email not specified');
      }
      const user = await UserModel.getByEmail(email);
      if (!user) {
        throw new Error('User not found in DB');
      }
      let compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        throw new Error('Incorrect password specified');
      }
      const basket = await BasketModel.getOne(user.id);
      if (!basket) {
        throw new Error('Basket was not created');
      }
      const token = makeJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    const token = makeJwt(req.auth.id, req.auth.email, req.auth.role);
    return res.json({ token });
  }

  async getAll(req, res, next) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('User id not specified');
      }
      const user = await UserModel.getOne(req.params.id);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    const { email, password, role = 'USER' } = req.body;
    try {
      if (!email || !password) {
        throw new Error('Blank email or password');
      }
      if (!['USER', 'ADMIN'].includes(role)) {
        throw new Error('Invalid role value');
      }
      const hash = await bcrypt.hash(password, 5);
      const user = await UserModel.create({ email, password: hash, role });
      if (!user?.id) {
        throw new Error('User was not created');
      }
      const basket = await BasketModel.create(user.id);
      if (!basket) {
        throw new Error('Basket was not created');
      }
      return res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('User ID not specified');
      }
      if (Object.keys(req.body).length === 0) {
        throw new Error('No data to update');
      }
      let { email, password, role } = req.body;
      if (role && !['USER', 'ADMIN'].includes(role)) {
        throw new Error('Invalid role value');
      }
      if (password) {
        password = await bcrypt.hash(password, 5);
      }
      const user = await UserModel.update(req.params.id, { email, password, role });
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('User id not specified');
      }
      const user = await UserModel.delete(req.params.id);
      res.json(user);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
