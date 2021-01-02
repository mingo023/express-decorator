import { Request, Response } from 'express';
import { Controller, Route } from '@/decorator';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Route('/:id', ['get', 'post'])
  me(req: Request, res: Response) {
    return res.json({
      name: req.params.id,
    });
  }

  @Route('/', 'get')
  helloWorld(_req: Request, res: Response) {
    return res.json({
      message: this.userService.helloWorld(),
    });
  }
}
