import { CustomTheme } from "@utils/theme";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const useAppTheme = () => useTheme<CustomTheme>();

export const makeStyles =
	<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, V>(
		styles: T | ((theme: CustomTheme, props: V) => T),
	) =>
	(props: V = {} as any): T => {
		const theme = useAppTheme();

		return useMemo(() => {
			const css = typeof styles === "function" ? styles(theme, props) : styles;
			return StyleSheet.create(css);
		}, [props, theme]);
	};
