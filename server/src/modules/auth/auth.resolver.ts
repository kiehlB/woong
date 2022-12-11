import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SigninRequest, SigninResponse } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser, TokenUser } from 'src/decorator/auth-user.decorator';
import { AuthService } from './auth.service';
import { ExpriedJwtAuthGuard } from './guards/graphql-passport-auth.guard';
import { CoreResponse } from 'src/common/dto/coreResponse.dto';

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
      secure: false,
      httpOnly: false,
    });

    return { token };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async logout(
    @CurrentUser() user: TokenUser,
    @Context() { res }: { res: Response },
  ): Promise<CoreResponse> {
    res.clearCookie('auth-cookie');

    return { ok: true };
  }
}
