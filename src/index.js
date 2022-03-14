import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './db/mongodb.js';

import userRouter from './routers/userRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(port, () => console.log('Server is connected, Port:', port));
