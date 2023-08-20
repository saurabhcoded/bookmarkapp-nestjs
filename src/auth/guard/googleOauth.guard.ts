import { AuthGuard } from '@nestjs/passport';

export class googleOauth extends AuthGuard('google') {
  constructor() {
    super();
  }
}
