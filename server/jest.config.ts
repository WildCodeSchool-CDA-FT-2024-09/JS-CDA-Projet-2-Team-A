import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/tests/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
