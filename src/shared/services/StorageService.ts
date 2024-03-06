import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
	private _fcmTokenKey = "fcmToken";

	async getFcmToken() {
		return await AsyncStorage.getItem(this._fcmTokenKey);
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
