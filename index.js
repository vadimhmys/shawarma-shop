import express from 'express';
import config from 'dotenv/config';
import sequelize from './sequelize.js';
import * as mapping from './models/mapping.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: ['https://66dc66a1fdf3780008e0ac7a--shawarmasshop.netlify.app', 'http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload());
app.use('/api', router);
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
