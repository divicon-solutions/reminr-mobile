import { localNotificationsService } from "./LocalNotificationsService";
import { remindersControllerFindAll } from "@api";
import { storageService, NotificationsTracker } from "./StorageService";
import { getTodayTimestamp } from "@utils/formatters";

class BackgroundService {
	async scheduleReminders() {
		try {
			const reminders = await remindersControllerFindAll({ date: getTodayTimestamp() });
			const prevTracker = await storageService.getNotificationsTracker();
			const notificationIds = Object.values(prevTracker).map((item) => item.notificationId);
			await localNotificationsService.cancelNotifications(notificationIds);
			const promises = reminders.map(async (reminder) => {
				if (prevTracker[reminder.id]?.date === reminder.remindAt) {
					console.log(
						`[BackgroundService] scheduleReminders: Reminder for ${reminder.medication?.name} already scheduled`,
					);
					return;
				}
				if (new Date(reminder.remindAt).getTime() < new Date().getTime()) {
					console.log(
						`[BackgroundService] scheduleReminders: Reminder for ${reminder.medication?.name} is in the past`,
					);
					return;
				}
				console.log(
					`[BackgroundService] scheduleReminders: Scheduling reminder for ${reminder.medication?.name} at ${new Date(reminder.remindAt)}`,
				);
				const id = await localNotificationsService.createTriggerNotification({
					title: reminder.title,
					body: reminder.description ?? undefined,
					timestamp: new Date(reminder.remindAt).getTime(),
				});
				console.log(`[BackgroundService] scheduleReminders: Scheduled reminder with id ${id}`);
				return { id, reminderId: reminder.id, date: reminder.remindAt };
			});
			const result = await Promise.all(promises);
			const tracker = result.reduce((acc, current) => {
				if (current) {
					acc[current.reminderId] = { notificationId: current.id, date: current.date };
				}
				return acc;
			}, {} as NotificationsTracker);
			console.log("[BackgroundService] scheduleReminders: Reminders scheduled");
			await storageService.setNotificationsTracker(tracker);
		} catch (error) {
			console.error("[BackgroundService] scheduleReminders:", error);
		}
	}
}

export const backgroundService = new BackgroundService();
