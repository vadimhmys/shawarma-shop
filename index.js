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
app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload());
app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

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