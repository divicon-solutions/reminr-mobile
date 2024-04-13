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
		data,
		timestamp,
	}: Pick<Notification, "title" | "body" | "data"> & { timestamp: number }) {
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
				data,
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

	async createIntervalNotification({
		title,
		body,
		snooze,
	}: Pick<Notification, "title" | "body"> & { snooze: number }) {
		try {
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
		} catch (error) {
			console.error("[LocalNotificationsService] [createIntervalNotification]", error);
		}
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
