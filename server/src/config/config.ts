import dotenv from "dotenv";

dotenv.config();

interface ConfigTypes {
  PORT: number;
  MONGODB_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
}

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${name} is required but not defined`);
  }
  return value || defaultValue!;
}

function getNumberEnvVar(name: string, defaultValue: number): number {
  const value = process.env[name];
  const parsed = parseInt(value || "", 10);
  if (isNaN(parsed)) {
    if (value === undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} must be a number`);
  }
  return parsed;
}

export const config: ConfigTypes = {
  PORT: getNumberEnvVar("PORT", 3000),
  MONGODB_URL: getEnvVar("MONGODB_URL"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  JWT_EXPIRY: getEnvVar("JWT_EXPIRY"),
};
