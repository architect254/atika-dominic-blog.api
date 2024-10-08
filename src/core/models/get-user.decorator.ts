import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '@endpoints/user/user.entity';

export const GetUser = createParamDecorator(
  (key: string, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return key ? user[key] : user;
  },
);
