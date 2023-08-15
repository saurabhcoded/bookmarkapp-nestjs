import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface CustomRequest extends Express.Request {
  user?: any; // or the actual type of your user object if known
}

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
