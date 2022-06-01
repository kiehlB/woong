import {
  Body,
  Controller,
  Get,
  Param,
  Res,
  Req,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/users.service';
import authConfig from './auth-config.development.template';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${authConfig.callbackSuccessUrl}?code=${jwt}`);
    } else {
      res.redirect(authConfig.callbackFailureUrl);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() userLoginDto: any) {
    return await this.authService.signin(req.user);
  }

  // @Get('/logout')
  // logout(@Req() req, @Res() res) {
  //   req.logout();
  //   res.redirect('/');
  // }

  // @Post('signup')
  // async signup(@Body() signupUser: any) {
  //   return await this.authService.signup(signupUser);
  // }

  // @Post('username-available')
  // async usernameAvailable(@Body() username: any) {
  //   return await this.authService.usernameAvailable(username);
  // }

  // @Post('link/:providerName')
  // @UseGuards(AuthGuard('jwt'))
  // providerLink(@Param() params, @Body() tokenDto: any, @Request() req) {
  //   console.log(
  //     'link::',
  //     req.user,
  //     'providerName::',
  //     params.providerName,
  //     ' - token::',
  //     tokenDto,
  //   );
  //   return this.userService.link(req.user.userId, tokenDto.token, params.providerName);
  // }

  // @Get('unlink/:providerName')
  // @UseGuards(AuthGuard('jwt'))
  // unlink(@Param() params, @Request() req) {
  //   console.log('user is', req.user);
  //   return this.userService.unlink(req.user.userId, params.providerName);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getProfile(@Request() req) {
  //   return this.userService.findOne({ 'providers.providerId': req.user.userId });
  // }
}
