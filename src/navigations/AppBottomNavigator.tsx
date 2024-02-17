import React from "react";
import BottomTabNavigationBar from "./NavigationBars/BottomTabNavigationBar";
import { AppBottomNavigatorParamList } from "./types";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator<AppBottomNavigatorParamList>();

export default function AppBottomNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{ header: BottomTabNavigationBar, headerShown: true }}
			tabBar={BottomTabBar}
		>
			<Tab.Screen />
		</Tab.Navigator>
	);
}

function BottomTabBar({ navigation, state, descriptors, insets }: Readonly<BottomTabBarProps>) {
	return (
		<BottomNavigation.Bar
			style={{ backgroundColor: "#FDFDFD" }}
			activeIndicatorStyle={{ backgroundColor: "#6CA3AA" }}
			navigationState={state}
			safeAreaInsets={insets}
			onTabPress={({ route, preventDefault }): void => {
				const event = navigation.emit({
					type: "tabPress",
					target: route.key,
					canPreventDefault: true,
				});

				if (event.defaultPrevented) {
					preventDefault();
				} else {
					navigation.dispatch({
						...CommonActions.navigate(route.name, route.params),
						target: state.key,
					});
				}
			}}
			renderIcon={({ route, focused, color }) => {
				const { options } = descriptors[route.key];
				if (options.tabBarIcon) {
					return options.tabBarIcon({ focused, color, size: 24 });
				}
				return null;
			}}
			getLabelText={({ route }) => {
				const { options } = descriptors[route.key];
				if (typeof options.tabBarLabel === "string") {
					return options.tabBarLabel;
				}
				if (typeof options.title === "string") {
					return options.title;
				}
				return route.name;
			}}
			activeColor="teal"
			inactiveColor="gray"
		/>
	);
}
