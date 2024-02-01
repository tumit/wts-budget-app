module.exports = {
  preset: 'jest-preset-angular',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coverageDirectory: './coverage',
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
  collectCoverage: true,
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
};
