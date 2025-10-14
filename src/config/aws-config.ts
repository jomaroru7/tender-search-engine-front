import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      loginWith: {
        email: true,
        oauth: {
          domain: import.meta.env.VITE_COGNITO_DOMAIN,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: [import.meta.env.VITE_COGNITO_REDIRECT_URI],
          redirectSignOut: [import.meta.env.VITE_COGNITO_REDIRECT_URI],
          responseType: 'code'
        }
      }
    }
  }
});
