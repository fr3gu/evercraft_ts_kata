module.exports = {
    roots: ["<rootDir>"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    testRegex: "(/specs/).*-spec.ts$",
    moduleFileExtensions: ["ts", "js"],
  }