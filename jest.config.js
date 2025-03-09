// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// // import tsconfig from "./tsconfig.json";
// // //ts-ignore
// //import moduleNameMapper from "tsconfig-paths-jest";

// module.exports = {
// 	preset: "ts-jest",
// 	testEnvironment: "node",
// 	transform: {
// 		"^.+.tsx?$": ["ts-jest", {}],
// 	},
// 	testMatch: ["**/*.test.ts"],
// 	verbose: true,
// 	forceExit: true,
// 	//moduleNameMapper: moduleNameMapper(tsconfig),
// 	moduleDirectories: ["node_modules", "<rootDir>/src"],
// 	moduleNameMapper: {
// 		"@controllers/(.*)": "<rootDir>/src/controllers/$1",
// 		"@config/(.*)": "<rootDir>/src/config/$1",
// 		"@database/(.*)": "<rootDir>/src/database/$1",
// 		"@errors/(.*)": "<rootDir>/src/errors/$1",
// 		"services/(.*)": "<rootDir>/src/services/$1",
// 		"@middleware/(.*)": "<rootDir>/src/middleware/$1",
// 		"@models/(.*)": "<rootDir>/src/models/$1",
// 		"@routes/(.*)": "<rootDir>/src/routes/$1",
// 		"@types/(.*)": "<rootDir>/src/types/$1",
// 		"@util/(.*)": "<rootDir>/src/util/$1",
// 	},
// };

import { pathsToModuleNameMapper } from "ts-jest";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.json");

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
