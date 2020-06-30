export const environment = {
  production: true,
  port: 80,
  whitelisteddomains: [ 'tobber.ddns.net' ],
  blacklisteddomains: [
    'tobber.ddns.net/api/login',
    'tobber.ddns.net/api/signup'
  ],
  token: 'tobber_token',
  omdb: {
    key: '77245df9',
    url: 'https://www.omdbapi.com'
  }
};
