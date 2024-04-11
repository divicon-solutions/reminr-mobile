import AsyncStorage from "@react-native-async-storage/async-storage";

export type NotificationsTracker = Record<
	string,
	{
		notificationId: string;
		date: string;
	}
>;

class StorageService {
	private _fcmTokenKey = "fcmToken";
	private _crashlyticsEnabledKey = "crashlyticsEnabled";
	private _notificationsTrackerKey = "notificationsTracker";

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

	async getNotificationsTracker(): Promise<NotificationsTracker> {
		const value = await AsyncStorage.getItem(this._notificationsTrackerKey);
		return value ? JSON.parse(value) : {};
	}

	async setNotificationsTracker(tracker: NotificationsTracker) {
		await AsyncStorage.setItem(this._notificationsTrackerKey, JSON.stringify(tracker));
	}
}

export const storageService = new StorageService();
