module.exports = {
	clearMocks: true,
	collectCoverageFrom: ['**/**/*.{js}'],
	moduleFileExtensions: ['js'],
	testEnvironment: 'jsdom',
	testMatch: ['**/*.test.js'],
	testPathIgnorePatterns: [
		'\\\\node_modules\\\\',
	],
}
