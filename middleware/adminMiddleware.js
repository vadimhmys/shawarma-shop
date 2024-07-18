import AppError from '../errors/AppError.js';

const admin = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    if (req.auth.role !== 'ADMIN') {
      throw new Error('Administrator only');
    }
    next();
  } catch (e) {
    next(AppError.forbidden(e.message));
  }
};

export default admin;
