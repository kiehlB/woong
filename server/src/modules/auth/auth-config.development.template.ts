const authConfig = {
  callbackSuccessUrl: 'http://localhost:4000/login/success',
  callbackFailureUrl: 'http://localhost:4000/login/failure',
  jwtSecretKey: process.env.jwtSecretKey,
  providers: {
    facebook: {
      // https://developers.facebook.com/
      clientID: 'Facebook Client Id',
      clientSecret: 'Facebook Client Secret',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    github: {
      // https://github.com/settings/developers
      clientID: process.env.Github_ClientID,
      clientSecret: process.env.Github_ClientSecret,
      callbackURL: process.env.Github_CallbackURL,
    },
    google: {
      // https://console.developers.google.com/
      // OR https://console.cloud.google.com/
      clientID: 'Google Client Id',
      clientSecret: 'Google Client Secret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    linkedin: {
      // https://www.linkedin.com/developers/
      clientID: 'LinkedIn Client Id',
      clientSecret: 'LinkedIn Client Secret',
      callbackURL: 'http://localhost:3000/auth/linkedin/callback',
    },
    twitter: {
      // https://developer.twitter.com/
      clientID: 'Twitter Client Id',
      clientSecret: 'Twitter Client Secret',
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
    },
    windowslive: {
      // Windows Live Account Strategy
      // https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
      clientID: 'Windows Live Client Id',
      clientSecret: 'Windows Live Client Secret',
      callbackURL: 'http://localhost:3000/auth/windowslive/callback',
    },
    microsoft: {
      // Similar to Windows Live but with Microsoft Graph (API) Strategy
      // https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
      clientID: 'Microsoft Graph Client Id',
      clientSecret: 'Microsoft Graph Client Secret',
      callbackURL: 'http://localhost:3000/auth/microsoft/callback',
    },
  },
};

export default authConfig;
