module.exports = {
	"extends": ["plugin:@typescript-eslint/recommended"],
	"rules": {
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/explicit-function-return-type": false,
		"@typescript-eslint/no-var-requires": false,
		"@typescript-eslint/no-magic-numbers": true,
		"@typescript-eslint/restrict-plus-operands": true,
		"@typescript-eslint/no-explicit-any": false,
		"@typescript-eslint/no-use-before-define": false,
		"quotes": ["error", "single"],
	},
	"globals": {
		"$": true,
	}
};