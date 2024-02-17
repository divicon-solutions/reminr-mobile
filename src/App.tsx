import React, { useEffect, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { protectedScreens, unprotectedScreens } from "@navigations";
import AppBottomNavigator from "@navigations/AppBottomNavigator";
import StackNavigationBar from "@navigations/NavigationBars/StackNavigationBar";
import { useAlertStore } from "@store/alert";
import { useLoaderStore } from "@store/loader";
import { Snackbar, Text } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { makeStyles } from "@hooks/makeStyles";
import SplashScreen from "@components/SplashScreen";
import { RootStackParamList } from "@navigations/types";
import { StatusBar } from "react-native";
import { useAuth } from "@providers/auth";

const Stack = createStackNavigator<RootStackParamList>();

function AppContainer() {
	const { isLoading, user } = useAuth();

	if (isLoading) {
		return <SplashScreen />;
	}

	if (!user) {
		return (
			<Stack.Navigator initialRouteName="Login" screenOptions={{ header: StackNavigationBar }}>
				{unprotectedScreens.map(({ name, Component, options }) => (
					<Stack.Screen key={name} name={name} component={Component} options={options} />
				))}
			</Stack.Navigator>
		);
	}

	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ header: StackNavigationBar }}>
			<Stack.Screen name="Home" component={AppBottomNavigator} options={{ headerShown: false }} />
			{protectedScreens.map(({ name, Component, options }) => (
				<Stack.Screen key={name} name={name} component={Component} options={options} />
			))}
		</Stack.Navigator>
	);
}

export default function App() {
	const [open, setOpen] = useState(false);
	const [backdropOpen, setBackdropOpen] = useState(false);
	const styles = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	const alertRef = useRef(useAlertStore.getState());
	const loaderRef = useRef(useLoaderStore.getState());

	useEffect(() => {
		const unsubscribeAlert = useAlertStore.subscribe((state) => {
			alertRef.current = state;
			setOpen(state.open);
		});
		const unsubscribeLoading = useLoaderStore.subscribe((state) => {
			loaderRef.current = state;
			setBackdropOpen(state.open);
		});

		return () => {
			unsubscribeAlert();
			unsubscribeLoading();
		};
	}, []);

	return (
		<>
			<StatusBar backgroundColor={"#99CBD1"} animated={true} />
			<AppContainer />
			<Snackbar
				visible={open}
				onDismiss={handleClose}
				duration={3000}
				style={styles[alertRef.current.severity]}
			>
				<Text>{alertRef.current.message}</Text>
			</Snackbar>
			<Spinner visible={backdropOpen} animation="fade" />
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	success: {
		backgroundColor: theme.colors.success1,
	},
	error: {
		backgroundColor: theme.colors.error,
	},
	info: {
		backgroundColor: theme.colors.cornflowerBlue2,
	},
	warning: {
		backgroundColor: theme.colors.moderate1,
	},
}));
