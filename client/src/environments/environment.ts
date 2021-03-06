// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  port: 8000,
  whitelisteddomains: [ 'localhost:8000' ],
  blacklisteddomains: [
    'localhost:8000/api/login',
    'localhost:8000/api/signup'
  ],
  token: 'tobber_token',
  omdb: {
    key: '77245df9',
    url: 'https://www.omdbapi.com'
  }
};
