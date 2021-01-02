require('dotenv').config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { UserController } from '@/user/user.controller';
import { Injector } from './decorator';
import { PORT } from '@/utils/constant';

export class App {
  private app: Express;
  private PORT: number;

  constructor() {
    this.app = express();
    this.PORT = PORT;

    this.bootstrap();
    this.initBodyParser();
    this.registerRoute();
  }

  private initBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private registerRoute() {
    Injector.getRoutes<UserController>(UserController, this.app);
  }

  private bootstrap() {
    this.app.listen(this.PORT, () =>
      console.log(`Server is running on ${this.PORT}`),
    );
  }
}
