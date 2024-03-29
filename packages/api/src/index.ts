import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import './env';
import routes from './route';

// Connects to the Database -> then starts Express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call middleware
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // Set all routes from routes folder
    app.use('/', routes);

    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
