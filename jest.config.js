module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/',
    ],
    moduleFileExtensions: [
      'js',
      'jsx',
    ],
    testMatch: [
      '**/__tests__/**/*.js',
      '**/__tests__/**/*.jsx',
      '**/?(*.)+(spec|test).js',
      '**/?(*.)+(spec|test).jsx',
    ],
  };
  