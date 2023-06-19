import { Config } from "../interface/config";

const getEnvVariable = (variableName: string): string => {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(`Environment variable ${variableName} is not set.`);
  }
  return value;
};

const configJson: Config = {
  development: {
    username: getEnvVariable("POSTGRES_USER"),
    password: getEnvVariable("POSTGRES_PASSWORD"),
    database: getEnvVariable("POSTGRES_DB"),
    host: getEnvVariable("POSTGRES_HOST"),
    dialect: "postgres",
  },
  test: {
    username: "your_postgres_username",
    password: "your_postgres_password",
    database: "your_test_database_name",
    host: "postgres",
    dialect: "postgres",
  },
  production: {
    username: "your_postgres_username",
    password: "your_postgres_password",
    database: "your_production_database_name",
    host: "your_production_host",
    dialect: "postgres",
  },
};

export default configJson;
