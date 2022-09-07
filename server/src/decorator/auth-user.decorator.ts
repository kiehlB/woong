import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface TokenUser {
  id: number;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    console.log(gqlContext.getContext().req.user);

    return gqlContext.getContext().req.user;
  },
);
