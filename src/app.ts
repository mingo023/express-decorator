import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { UserController } from '@/user/user.controller';
import { Injector } from './decorator';

export class App {
  private app: Express;

  constructor() {
    this.app = express();

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
    this.app.listen(4000, () => console.log('Server is running on 4000'));
  }
}
