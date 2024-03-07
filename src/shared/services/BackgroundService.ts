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

	async init() {
		try {
			await this.scheduleReminders();
		} catch (error) {
			console.error("[BackgroundService] [init] Error", error);
		}
	}
}

export const backgroundService = new BackgroundService();
