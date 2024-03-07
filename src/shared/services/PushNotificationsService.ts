import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";
import { getBundleId, getApplicationName, getDeviceName } from "react-native-device-info";
import { storageService } from "./StorageService";
import notifee, {
	AndroidImportance,
	AndroidVisibility,
	InitialNotification,
	Notification,
} from "@notifee/react-native";
import {
	CreatePushTokenDto,
	pushTokensControllerCreate,
	pushTokensControllerUnsubscribe,
} from "@api";
import { backgroundService } from "./BackgroundService";

class PushNotificationsService {
	private async requestPermissions() {
		if (Platform.OS === "ios") {
			const granted = await messaging().requestPermission();
			return granted === messaging.AuthorizationStatus.AUTHORIZED;
		} else if (Platform.OS === "android") {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}
		return false;
	}

	private async subscribe(token: string, userId: string) {
		const existingToken = await storageService.getFcmToken();
		if (!token || existingToken === token) {
			console.log("[PushNotificationsService] [setUpRemoteNotifications] Token is null or same");
			return;
		}
		await storageService.setFcmToken(token);
		const apnsToken = await messaging().getAPNSToken();
		const deviceName = await getDeviceName();

		const payload: CreatePushTokenDto = {
			device: deviceName,
			userId,
			identifier: getBundleId(),
			platform: Platform.OS === "ios" ? "IOS" : "ANDROID",
			token,
			apnToken: apnsToken,
		};
		await pushTokensControllerCreate(payload);
	}

	private async setUpRemoteNotifications(userId: string) {
		await messaging().registerDeviceForRemoteMessages();
		const token = await messaging().getToken();
		await this.subscribe(token, userId);
	}

	async init(userId: string) {
		try {
			const result = await this.requestPermissions();
			if (!result) {
				console.log("[PushNotificationsService] [init] Permissions not granted");
				return;
			}
			await this.setUpRemoteNotifications(userId);
		} catch (error) {
			console.error("[PushNotificationsService] [init] Error", error);
		}
	}

	async unsubscribe() {
		await messaging().unregisterDeviceForRemoteMessages();
		const existingToken = await storageService.getFcmToken();
		if (!existingToken) {
			console.log("[PushNotificationsService] [unsubscribe] Token is null");
			return;
		}
		await pushTokensControllerUnsubscribe({ token: existingToken });
		storageService.setFcmToken(null);
	}

	async displayNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) {
		await notifee.requestPermission();
		const channelId = await notifee.createChannel({
			id: "default",
			name: `${getApplicationName()} Notifications`,
			importance: AndroidImportance.HIGH,
			sound: "default",
			visibility: AndroidVisibility.PUBLIC,
		});
		if (remoteMessage?.notification) {
			await notifee.displayNotification({
				title: remoteMessage.notification.title,
				body: remoteMessage.notification.body,
				android: { channelId },
			});
		}
	}

	async onInitialNotification(notification: InitialNotification | null) {
		if (!notification?.notification) {
			console.log("[PushNotificationsService] [onInitialNotification] Notification is null");
			return;
		}
	}

	async onSelectNotification(notification: Notification | undefined) {
		if (!notification) {
			console.log("[PushNotificationsService] [onSelectNotification] Notification is null");
			return;
		}
	}

	async onSelectedRemoteMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) {
		if (!remoteMessage?.notification) {
			console.log("[PushNotificationsService] [onSelectedRemoteMessage] Notification is null");
			return;
		}
	}
}

export const pushNotificationsService = new PushNotificationsService();

export const setUpFirebaseMessagingBackgroundHandler = () => {
	messaging().setBackgroundMessageHandler(async (remoteMessage) => {
		console.log(
			"[PushNotificationsService] [setUpFirebaseMessagingBackgroundHandler] onMessage",
			remoteMessage,
		);
		backgroundService.init();
	});
};
