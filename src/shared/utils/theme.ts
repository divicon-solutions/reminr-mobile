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
};

const customTheme = {
	...lightTheme,
};

const darkTheme: MD3Theme = {
	...CombinedDarkTheme,
};

export { lightTheme, darkTheme, customTheme };

export type CustomTheme = typeof customTheme;
