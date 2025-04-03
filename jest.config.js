/** @type {import('ts-jest').JestConfigWithTsJest} **/

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");

export default {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./src/tests"],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/",
	}),
	clearMocks: true,
};
