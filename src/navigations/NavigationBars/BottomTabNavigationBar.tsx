import React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Appbar, Text } from "react-native-paper";

export default function BottomTabNavigationBar(props: Readonly<BottomTabHeaderProps>) {
	const {
		options: { title, headerShown, headerTitle, headerRight, headerTintColor, headerLeft },
		route,
	} = props;
	const headerTitleText = (() => {
		if (typeof headerTitle === "string" && headerTitle) {
			return headerTitle;
		} else if (title) {
			return title;
		} else {
			return route.name;
		}
	})();

	if (!headerShown) {
		return null;
	}

	return (
		<Appbar.Header>
			{headerLeft && headerLeft({})}
			{typeof headerTitle === "function" ? (
				headerTitle({ children: headerTitleText, tintColor: headerTintColor })
			) : (
				<Appbar.Content title={<Text variant="titleSmall">{headerTitleText.toUpperCase()}</Text>} />
			)}
			{headerRight && headerRight({})}
		</Appbar.Header>
	);
}
