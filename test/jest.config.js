module.exports = {
  verbose: true,
  rootDir: '..',
  jest-environment: "jsdom",
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
