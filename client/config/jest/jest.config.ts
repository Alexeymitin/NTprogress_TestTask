export default {
	clearMocks: true,
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: [
		'\\\\node_modules\\\\',
	],
	preset: 'ts-jest',
	moduleFileExtensions: [
		'js',
		'jsx',
		'ts',
		'tsx',
		'json',
		'node',
	],
	moduleDirectories: [
		'node_modules',
	],
	modulePaths: [
		'<rootDir>'
	],
	roots: [
		'<rootDir>',
	],
	testMatch: [
		'<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
	],
	rootDir: '../../',
	setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
	moduleNameMapper: {
		'\\.s?css$': 'identity-obj-proxy',
		'^react-tabulator$': '<rootDir>/node_modules/react-tabulator/lib/ReactTabulator.js',
		// '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
		// '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>config/jest/mocks/fileMock.js'
	},
	reporters: [
		'default'
	],
};
