import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifiedCallback } from 'passport-jwt';
import { Provider } from '../../../common/types/Provider';

import authConfig from '../auth-config.development.template';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.Github_ClientID,
      clientSecret: process.env.Github_ClientSecret,
      callbackURL: process.env.Github_CallbackURL,
      passReqToCallback: true,
      scope: ['user:email'],
    });
  }

  async validate(
    req: any,

    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    try {
      Logger.log(`GitHub UserProfile`, 'Auth');

      const jsonProfile = (profile && profile._json) || {};
      const userProfile = {
        userId: profile.id || jsonProfile.id,
        github: profile.id || jsonProfile.id,
        username: profile.login || jsonProfile.login,
        picture: `${jsonProfile.avatar_url}&size=.200`,
        email:
          profile.email ||
          (Array.isArray(profile.emails) && profile.emails[0].value),
      };

      const oauthResponse = await this.authService.validateOAuthLogin(
        accessToken,
        userProfile,
        'github',
      );

      done(null, {
        ...JSON.parse(JSON.stringify(oauthResponse.user)),
        jwt: oauthResponse.jwt,
      });
    } catch (err) {
      done(err, false);
    }
  }
}
