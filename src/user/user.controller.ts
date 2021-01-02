import { Request, Response } from 'express';
import { Controller, Route } from '@/decorator';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Route('/:id')
  me(req: Request, res: Response) {
    return res.json({
      name: req.params.id,
    });
  }

  @Route('/')
  helloWorld(_req: Request, res: Response) {
    return res.json({
      message: this.userService.helloWorld(),
    });
  }
}
