import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogBox, Platform } from "react-native";
import App from "./App";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { customTheme } from "@utils/theme";
import { AuthProvider } from "@providers/auth";
import * as RootNavigation from "@navigations/RootNavigation";
import { request, PERMISSIONS } from "react-native-permissions";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 1 * 60 * 60 * 1000, // 1 hour
			retry: false,
		},
	},
});

// Handle JavaScript exceptions
const errorHandler = (error: Error, isFatal: boolean) => {
	// Perform any additional error handling here
	console.error("[exceptionHandler] JS error:", error, { isFatal });
};

setJSExceptionHandler(errorHandler, false);

// Handle native crashes (Android only)
const nativeErrorHandler = (errorString: string) => {
	// Perform any additional error handling here
	console.error("[exceptionHandler] Native error:", errorString);
};

setNativeExceptionHandler(nativeErrorHandler);

export default function Main() {
	// const isDarkTheme = useColorScheme() === "dark";
	// const isDarkTheme = false;

	useEffect(() => {
		LogBox.ignoreAllLogs(true);
		const requestAppTrackingTransparency = async () => {
			if (Platform.OS === "ios") {
				const status = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
				console.log("App Tracking Transparency status", status);
			}
		};
		requestAppTrackingTransparency();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<AuthProvider>
					<NavigationContainer ref={RootNavigation.navigationRef}>
						<PaperProvider theme={customTheme}>
							<App />
						</PaperProvider>
					</NavigationContainer>
				</AuthProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
