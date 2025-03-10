/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.ts'],
  verbose: true,
  testTimeout: 10000,
};

export default config;