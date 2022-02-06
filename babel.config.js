module.exports = {
	presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
	plugins: [
		["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
	]
}
