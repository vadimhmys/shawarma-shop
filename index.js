import express from 'express';
import config from 'dotenv/config';
import sequelize from './sequelize.js';
import * as mapping from './models/mapping.js';

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start()
