import { Service } from '@/decorator';

@Service()
export class UserService {
  helloWorld() {
    return 'Hello world';
  }
}
