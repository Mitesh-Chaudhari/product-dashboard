// jest.config.cjs

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle CSS / SCSS imports
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Handle static asset imports (images, fonts)
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/mocks/fileMock.js',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use babel-jest for JS/JSX/TSX
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
  ],
};
