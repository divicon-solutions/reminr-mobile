module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		"react-native-paper/babel",
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				root: ["./src"],
				extensions: [
					".js",
					".jsx",
					".ts",
					".tsx",
					".android.js",
					".android.tsx",
					".ios.js",
					".ios.tsx",
				],
				alias: {
					"@api": ["./src/api"],
					"@assets": ["./src/assets"],
					"@features": ["./src/features"],
					"@environment": ["./src/environment"],
					"@store": ["./src/store"],
					"@navigations": ["./src/navigations"],
					"@shared": ["./src/shared"],
					"@hooks": ["./src/shared/hooks"],
					"@components": ["./src/shared/components"],
					"@services": ["./src/shared/services"],
					"@utils": ["./src/shared/utils"],
				},
			},
		],
	],
};
