import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { adaptNavigationTheme, MD3LightTheme, MD3DarkTheme, MD3Theme } from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const lightTheme: MD3Theme = {
	...CombinedDefaultTheme,
	colors: {
		primary: "#7279d8",
		onPrimary: "rgb(255, 255, 255)",
		primaryContainer: "rgb(222, 224, 255)",
		onPrimaryContainer: "rgb(0, 14, 94)",
		secondary: "rgb(175, 45, 47)",
		onSecondary: "rgb(255, 255, 255)",
		secondaryContainer: "rgb(255, 218, 215)",
		onSecondaryContainer: "rgb(65, 0, 4)",
		tertiary: "rgb(52, 106, 34)",
		onTertiary: "rgb(255, 255, 255)",
		tertiaryContainer: "rgb(180, 243, 154)",
		onTertiaryContainer: "rgb(4, 33, 0)",
		error: "rgb(186, 26, 26)",
		onError: "rgb(255, 255, 255)",
		errorContainer: "rgb(255, 218, 214)",
		onErrorContainer: "rgb(65, 0, 2)",
		background: "#eeeeee",
		onBackground: "rgb(27, 27, 31)",
		surface: "rgb(255, 251, 255)",
		onSurface: "rgb(27, 27, 31)",
		surfaceVariant: "rgb(227, 225, 236)",
		onSurfaceVariant: "rgb(70, 70, 79)",
		outline: "rgb(118, 118, 128)",
		outlineVariant: "rgb(199, 197, 208)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(48, 48, 52)",
		inverseOnSurface: "rgb(243, 240, 244)",
		inversePrimary: "rgb(187, 195, 255)",
		elevation: {
			level0: "transparent",
			level1: "rgb(246, 243, 251)",
			level2: "rgb(241, 238, 248)",
			level3: "rgb(235, 233, 246)",
			level4: "rgb(233, 231, 245)",
			level5: "rgb(230, 228, 243)",
		},
		surfaceDisabled: "rgba(27, 27, 31, 0.12)",
		onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
		backdrop: "rgba(47, 48, 56, 0.4)",
	},
};

const customTheme = {
	...lightTheme,
	colors: {
		...lightTheme.colors,
		appBar: "rgb(78, 87, 169)",
		onAppBar: "rgb(255, 255, 255)",
		appBarContainer: "rgb(224, 224, 255)",
		onAppBarContainer: "rgb(2, 8, 101)",
	},
};

const darkTheme: MD3Theme = {
	...CombinedDarkTheme,
	colors: {
		primary: "rgb(187, 195, 255)",
		onPrimary: "rgb(25, 39, 120)",
		primaryContainer: "rgb(50, 63, 144)",
		onPrimaryContainer: "rgb(222, 224, 255)",
		secondary: "rgb(255, 179, 174)",
		onSecondary: "rgb(104, 0, 11)",
		secondaryContainer: "rgb(142, 19, 26)",
		onSecondaryContainer: "rgb(255, 218, 215)",
		tertiary: "rgb(153, 214, 129)",
		onTertiary: "rgb(10, 57, 0)",
		tertiaryContainer: "rgb(27, 82, 11)",
		onTertiaryContainer: "rgb(180, 243, 154)",
		error: "rgb(255, 180, 171)",
		onError: "rgb(105, 0, 5)",
		errorContainer: "rgb(147, 0, 10)",
		onErrorContainer: "rgb(255, 180, 171)",
		background: "rgb(27, 27, 31)",
		onBackground: "rgb(228, 225, 230)",
		surface: "rgb(27, 27, 31)",
		onSurface: "rgb(228, 225, 230)",
		surfaceVariant: "rgb(70, 70, 79)",
		onSurfaceVariant: "rgb(199, 197, 208)",
		outline: "rgb(144, 144, 154)",
		outlineVariant: "rgb(70, 70, 79)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(228, 225, 230)",
		inverseOnSurface: "rgb(48, 48, 52)",
		inversePrimary: "rgb(75, 87, 169)",
		elevation: {
			level0: "transparent",
			level1: "rgb(35, 35, 42)",
			level2: "rgb(40, 40, 49)",
			level3: "rgb(45, 46, 56)",
			level4: "rgb(46, 47, 58)",
			level5: "rgb(49, 51, 62)",
		},
		surfaceDisabled: "rgba(228, 225, 230, 0.12)",
		onSurfaceDisabled: "rgba(228, 225, 230, 0.38)",
		backdrop: "rgba(47, 48, 56, 0.4)",
	},
};

export { lightTheme, darkTheme, customTheme };

export type CustomTheme = typeof customTheme;
