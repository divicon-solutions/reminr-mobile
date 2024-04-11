import notifee, {
	IntervalTrigger,
	Notification,
	TimeUnit,
	TimestampTrigger,
	TriggerType,
} from "@notifee/react-native";

class LocalNotificationsService {
	async createTriggerNotification({
		body,
		title,
		timestamp,
	}: Pick<Notification, "title" | "body"> & { timestamp: number }) {
		await notifee.requestPermission();

		const channelId = await notifee.createChannel({
			id: "reminders",
			name: "Reminders",
		});

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: timestamp,
		};

		const id = await notifee.createTriggerNotification(
			{
				title,
				body,
				android: {
					channelId,
				},
			},
			trigger,
		);

		return id;
	}

	async updateTriggerNotification(
		id: string,
		{ body, title, timestamp }: Partial<Notification> & { timestamp: number },
	) {
		await notifee.requestPermission();

		const channelId = await notifee.createChannel({
			id: "reminders",
			name: "Reminders",
		});

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: timestamp,
		};

		await notifee.createTriggerNotification(
			{
				id,
				title,
				body,
				android: {
					channelId,
				},
			},
			trigger,
		);
	}

	async createIntervalNotification({ id, snooze }: { id: string; snooze: number }) {
		await notifee.requestPermission();

		const channelId = await notifee.createChannel({
			id: "reminders",
			name: "Reminders",
		});

		const trigger: IntervalTrigger = {
			type: TriggerType.INTERVAL,
			interval: snooze,
			timeUnit: TimeUnit.SECONDS,
		};

		await notifee.createTriggerNotification(
			{
				id,
				android: {
					channelId,
				},
			},
			trigger,
		);

		return id;
	}

	async displayNotification(notification: Notification) {
		const channelId = await notifee.createChannel({
			id: "reminders",
			name: "Reminders",
		});
		await notifee.displayNotification({
			...notification,
			android: {
				channelId,
			},
		});
	}

	async cancelNotifications(ids: string[]) {
		try {
			await notifee.cancelTriggerNotifications(ids);
		} catch (error) {
			console.error("[LocalNotificationsService] [cancelNotifications]", error);
		}
	}
}

export const localNotificationsService = new LocalNotificationsService();

export const setUpLocalNotificationsBackgroundHandler = () => {
	notifee.onBackgroundEvent(async ({ type, detail }) => {
		console.log(
			"[LocalNotificationsService] [setUpLocalNotificationsBackgroundHandler]",
			type,
			detail,
		);
	});
};
