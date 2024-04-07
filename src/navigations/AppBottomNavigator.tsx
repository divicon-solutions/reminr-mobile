import React, { useCallback } from "react";
import BottomTabNavigationBar from "./NavigationBars/BottomTabNavigationBar";
import { AppBottomNavigatorParamList } from "./types";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useAuth } from "@providers/auth";
import MIIcon from "react-native-vector-icons/MaterialIcons";
import FIcon from "react-native-vector-icons/Fontisto";
import TodayScreen from "@features/Reminders/ReminderList";
import DashboardScreen from "@features/Home/Dashboard";
import MedicationsScreen from "@features/Medication/MedicationsList";
import InrScreen from "@features/InrTest/InrList";
import { StackNavigationProps } from "@navigations/types";
import { Alert } from "react-native";
import { useCallbackRequestControllerCreate, useUsersControllerFindMe } from "@api";

const Tab = createBottomTabNavigator<AppBottomNavigatorParamList>();
type AppBottomNavigatorProps = StackNavigationProps<"Home">;

export default function AppBottomNavigator({ navigation }: AppBottomNavigatorProps) {
	const { mutateAsync: callBackReqMutateAsync } = useCallbackRequestControllerCreate();
	const { data } = useUsersControllerFindMe();
	const { user } = useAuth();

	const settings = useCallback(() => {
		return (
			<MIIcon
				name="settings"
				size={24}
				color={"black"}
				onPress={() => {
					navigation.navigate("Settings");
				}}
			/>
		);
	}, [navigation]);

	const callsupport = useCallback(() => {
		return (
			<MIIcon
				name="call"
				size={24}
				color={"black"}
				onPress={() => {
					if (data?.phoneNumber?.length)
						Alert.alert("Call Support", "Are you sure you want to request a call support?", [
							{
								text: "Cancel",
								onPress: () => console.log("Cancel Pressed"),
								style: "cancel",
							},
							{
								text: "Yes",
								onPress: async () => {
									await callBackReqMutateAsync({
										data: {
											isResolved: false,
											userId: user?.uid ?? "",
										},
									});
								},
							},
						]);
					else {
						Alert.alert("Call Support", "Please update phone number to get a call back", [
							{
								text: "Ok",
								onPress: () => navigation.navigate("Account"),
								style: "cancel",
							},
						]);
					}
				}}
			/>
		);
	}, [user, callBackReqMutateAsync, data?.phoneNumber?.length, navigation]);

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
					tabBarIcon: ({ color }) => <MIIcon name="today" color={color} size={24} />,
					headerRight: settings,
					headerLeft: callsupport,
				}}
			/>
			<Tab.Screen
				name="Dashboard"
				component={DashboardScreen}
				options={{
					headerTitle: "Dashboard",
					tabBarLabel: "Dashboard",
					tabBarIcon: ({ color }) => <MIIcon name="dashboard" color={color} size={24} />,
					headerRight: settings,
					headerLeft: callsupport,
				}}
			/>
			<Tab.Screen
				name="Medications"
				component={MedicationsScreen}
				options={{
					headerTitle: "Medications",
					tabBarLabel: "Medications",
					tabBarIcon: ({ color }) => <MIIcon name="medication" color={color} size={24} />,
					headerRight: settings,
					headerLeft: callsupport,
				}}
			/>
			<Tab.Screen
				name="InrTest"
				component={InrScreen}
				options={{
					headerTitle: "INR Test",
					tabBarLabel: "INR Test",
					tabBarIcon: ({ color }) => <FIcon name="blood-drop" color={color} size={24} />,
					headerRight: settings,
					headerLeft: callsupport,
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
