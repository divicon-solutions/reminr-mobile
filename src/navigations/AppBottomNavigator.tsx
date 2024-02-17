import React, { useCallback } from "react";
import BottomTabNavigationBar from "./NavigationBars/BottomTabNavigationBar";
import { AppBottomNavigatorParamList } from "./types";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TodayScreen from "@features/Home/Today";
import DashboardScreen from "@features/Home/Dashboard";
import { useAuth } from "@providers/auth";

const Tab = createBottomTabNavigator<AppBottomNavigatorParamList>();

export default function AppBottomNavigator() {
	const { signOut } = useAuth();

	const logout = useCallback(() => {
		return <Icon name="logout" size={24} onPress={signOut} />;
	}, [signOut]);

	return (
		<Tab.Navigator
			screenOptions={{ header: BottomTabNavigationBar, headerShown: true }}
			tabBar={BottomTabBar}
		>
			<Tab.Screen
				name="Today"
				component={TodayScreen}
				options={{
					headerTitle: "Today",
					tabBarLabel: "Today",
					tabBarIcon: ({ color }) => <Icon name="today" color={color} size={24} />,
					headerRight: logout,
				}}
			/>
			<Tab.Screen
				name="Dashboard"
				component={DashboardScreen}
				options={{
					headerTitle: "Dashboard",
					tabBarLabel: "Dashboard",
					tabBarIcon: ({ color }) => <Icon name="dashboard" color={color} size={24} />,
					headerRight: logout,
				}}
			/>
		</Tab.Navigator>
	);
}

function BottomTabBar({ navigation, state, descriptors, insets }: Readonly<BottomTabBarProps>) {
	return (
		<BottomNavigation.Bar
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
		/>
	);
}
