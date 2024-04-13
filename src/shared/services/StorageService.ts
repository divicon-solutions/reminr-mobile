import AsyncStorage from "@react-native-async-storage/async-storage";

export type NotificationsTracker = Record<
	string,
	{
		notificationId: string;
		date: string;
	}
>;

export type SnoozeNotifications = Record<
	string,
	{
		notificationId: string;
		timestamp: number;
	}
>;

class StorageService {
	private _fcmTokenKey = "fcmToken";
	private _crashlyticsEnabledKey = "crashlyticsEnabled";
	private _notificationsTrackerKey = "notificationsTracker";
	private _snoozeNotificationsKey = "snoozeNotifications";

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

	async getSnoozeNotifications(): Promise<SnoozeNotifications> {
		const value = await AsyncStorage.getItem(this._snoozeNotificationsKey);
		return value ? JSON.parse(value) : {};
	}

	async setSnoozeNotifications(snoozeNotifications: SnoozeNotifications) {
		await AsyncStorage.setItem(this._snoozeNotificationsKey, JSON.stringify(snoozeNotifications));
	}
}

export const storageService = new StorageService();
