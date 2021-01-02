import express, { Router } from 'express';

export const Controller = (prefix: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefixRoute', prefix, target);
  };
};

export const Service = (): ClassDecorator => {
  return () => {};
};

export const Route = (path: string): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    if (!Reflect.hasMetadata('controllers', target)) {
      Reflect.defineMetadata(
        'controllers',
        [
          {
            path,
            method: descriptor.value,
          },
        ],
        target,
      );
    } else {
      const controllers = Reflect.getMetadata('controllers', target);
      controllers.push({
        path,
        method: descriptor.value,
      });
      Reflect.defineMetadata('controllers', controllers, target);
    }
  };
};

type Type<T> = new (...args: any[]) => T;

export class Injector {
  static getController<T>(target: Type<T>): T {
    const dependencies = Reflect.getMetadata('design:paramtypes', target) || [];

    const resolvedDependencies = dependencies.map(
      (dependency: new (...args: any[]) => any) =>
        Injector.getController(dependency),
    );

    return new target(...resolvedDependencies);
  }

  static getRoutes<T>(target: Type<T>, appRouter: Router) {
    const router = express.Router();
    const controller = Injector.getController<T>(target) as any;
    const routes = Reflect.getMetadata('controllers', controller) || [];
    const prefixRoute = Reflect.getMetadata(
      'prefixRoute',
      controller.constructor,
    );

    routes.map((route: any) =>
      router.get(route.path, route.method.bind(controller)),
    );

    appRouter.use(prefixRoute, router);
  }
}
