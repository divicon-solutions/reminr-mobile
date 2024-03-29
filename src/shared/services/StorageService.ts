import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
	private _fcmTokenKey = "fcmToken";
	private _crashlyticsEnabledKey = "crashlyticsEnabled";

	async getFcmToken() {
		return await AsyncStorage.getItem(this._fcmTokenKey);
	}

	async isCrashlyticsEnabled() {
		const value = await AsyncStorage.getItem(this._crashlyticsEnabledKey);
		return value !== "false";
	}

	async setCrashlyticsEnabled(enabled: boolean) {
		await AsyncStorage.setItem(this._crashlyticsEnabledKey, enabled ? "true" : "false");
	}

	async setFcmToken(token: string | null) {
		if (!token) {
			await AsyncStorage.removeItem(this._fcmTokenKey);
			return;
		}
		await AsyncStorage.setItem(this._fcmTokenKey, token);
	}
}

export const storageService = new StorageService();
