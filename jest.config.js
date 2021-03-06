module.exports = {
	preset: 'react-native',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.jsx$': 'babel-jest',
		'^.+\\.js$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.ts?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	modulePathIgnorePatterns: ['utils'],
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		'./setup-tests.js',
		'jest-expect-message',
	],
	transformIgnorePatterns: [
		'node_modules/(?!(react-native' +
			'|@react-native' +
			'|@react-navigation' +
			'|react-native-iphone-x-helper' +
			'|react-native-paper-dropdown' +
			'|react-native-vector-icons' +
			'|react-native-fs' +
			'|rn-fetch-blob-v2' +
			')/)',
	],
}
