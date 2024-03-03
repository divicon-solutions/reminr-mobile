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
}

export const localNotificationsService = new LocalNotificationsService();
