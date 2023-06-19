export interface Config {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
  };
  test: {
    username: string;
    password: string;
    database: string;
    host: string;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
  };
}
