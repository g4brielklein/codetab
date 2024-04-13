const nextJest = require("next/jest.js");

const createJestConfig = nextJest();

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/tests/integration/setup.js"],
});

module.exports = jestConfig;
