import { Notification } from "@notifee/react-native";
import { localNotificationsService } from "./LocalNotificationsService";
import { remindersControllerFindAll } from "@api";

class BackgroundService {
	async scheduleReminders() {
		try {
			const reminders = await remindersControllerFindAll();
			const promises = reminders.map(async (reminder) => {
				return localNotificationsService.createTriggerNotification({
					title: reminder.title,
					body: reminder.description ?? undefined,
					timestamp: new Date(reminder.remindAt).getTime(),
				});
			});
			await Promise.all(promises);
			console.log("[BackgroundService] scheduleReminders: Reminders scheduled");
		} catch (error) {
			console.error("[BackgroundService] scheduleReminders:", error);
		}
	}

	async runBackgroundServiceForNotification(notification: Notification) {
		try {
			// update the notification to run again in 5 minutes
			const id = localNotificationsService.createIntervalNotification({
				id: notification.id,
				snooze: 300,
			});
		} catch (error) {
			console.error("[BackgroundService] runBackgroundServiceForNotification:", error);
		}
	}

	async init() {
		try {
			// await this.scheduleReminders();

			// trigger a notification every 10 seconds

			for (let i = 0; i < 10; i++) {
				const id = localNotificationsService.createTriggerNotification({
					title: "Interval Notification",
					body: "This is an interval notification",
					timestamp: new Date().getTime() + i * 10000,
				});
				console.log("[BackgroundService] [init] Interval notification created", id);
			}
			console.log("[BackgroundService] [init] Interval notification created", id);
		} catch (error) {
			console.error("[BackgroundService] [init] Error", error);
		}
	}
}

export const backgroundService = new BackgroundService();
