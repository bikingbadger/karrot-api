import 'dotenv/config.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/router/index.js';
import { dbConnection } from './src/utils/db.js';

const app = express();
const PORT = process.env.port || 3030;

// CORS setup
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Add routing
app.use('/api', router);

// Start app
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export { app };
