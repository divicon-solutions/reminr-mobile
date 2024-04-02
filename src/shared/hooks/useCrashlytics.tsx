import { storageService } from "@services/StorageService";
import { useEffect } from "react";
import { Alert } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";

export const useCrashlytics = () => {
	useEffect(() => {
		const bootstrap = async () => {
			try {
				const isCrashlyticsEnabled = crashlytics().isCrashlyticsCollectionEnabled;
				const isUserEnabled = await storageService.isCrashlyticsEnabled();
				console.log("CrashlyticsInjecter isCrashlyticsEnabled:", isCrashlyticsEnabled);
				if (isUserEnabled && !isCrashlyticsEnabled) {
					Alert.alert(
						"Do you want to send crash reports?",
						"Crash reports help us to improve the app. You can change this setting in the settings page.",
						[
							{
								text: "Enable",
								onPress: async () => {
									await crashlytics().setCrashlyticsCollectionEnabled(true);
									await storageService.setCrashlyticsEnabled(true);
								},
							},
							{
								text: "Cancel",
								onPress: () => {
									storageService.setCrashlyticsEnabled(false);
								},
								style: "cancel",
							},
						],
					);
				}
			} catch (error) {
				console.error("CrashlyticsInjecter error:", error);
			}
		};
		bootstrap();
	}, []);
};
