import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { Appbar, Text } from "react-native-paper";

export default function StackNavigationBar(props: Readonly<StackHeaderProps>) {
	const {
		navigation,
		options: { title, headerShown, headerTitle, headerLeft, headerRight, headerTintColor },
		route,
	} = props;
	const canGoBack = navigation.canGoBack();
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
			{headerLeft
				? headerLeft({})
				: canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
			{typeof headerTitle === "function" ? (
				headerTitle({ children: headerTitleText, tintColor: headerTintColor })
			) : (
				<Appbar.Content title={<Text variant="titleSmall">{headerTitleText.toUpperCase()}</Text>} />
			)}
			{headerRight && headerRight({})}
		</Appbar.Header>
	);
}
