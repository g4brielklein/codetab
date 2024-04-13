const nextJest = require("next/jest.js");

const createJestConfig = nextJest();

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
