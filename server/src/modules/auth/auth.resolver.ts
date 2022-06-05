import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SigninRequest, SigninResponse } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => SigninResponse)
  async signin(
    @Args('input') _: SigninRequest,
    @CurrentUser() user: TokenUser,
    @Context() { res }: { res: Response },
  ) {
    const token = await this.authService.signin({ id: user.id });

    res.cookie('auth-cookie', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { token };
  }
}
