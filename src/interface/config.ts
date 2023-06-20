export interface ConfigEnvironment {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: "postgres";
}

export interface Config {
  development: ConfigEnvironment;
  test: ConfigEnvironment;
  production: ConfigEnvironment;
}
