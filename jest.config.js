module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/config/env-variables.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testTimeout: 90000,
  preset: '@shelf/jest-mongodb',
  setupFiles: ['<rootDir>/jest-setup-env.js']
}
