import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogBox } from "react-native";
import App from "./App";
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { customTheme } from "@utils/theme";

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

setJSExceptionHandler(errorHandler, true);

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
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<NavigationContainer>
					<PaperProvider theme={customTheme}>
						<App />
					</PaperProvider>
				</NavigationContainer>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
