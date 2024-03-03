import moment from "moment";
import BackgroundTimer from "react-native-background-timer";
import { localNotificationsService } from "./LocalNotificationsService";
import { Platform } from "react-native";

class BackgroundService {
	async scheduleReminders() {
		try {
			localNotificationsService.createTriggerNotification({
				title: "Good morning!",
				body: "Don't forget to take your medication",
				timestamp: moment().add(10, "seconds").toDate().getTime(),
			});
		} catch (error) {
			console.error("[BackgroundService] scheduleReminders:", error);
		}
	}

	async init() {
		const now = new Date();
		// const midnight = moment().add(1, "days").startOf("day").toDate();
		const midnight = moment().add(10, "seconds").toDate();
		const timeUntilMidnight = midnight.getTime() - now.getTime();

		if (Platform.OS === "ios") {
			BackgroundTimer.start();
		}

		BackgroundTimer.setTimeout(async () => {
			await this.scheduleReminders();
			this.init();
		}, timeUntilMidnight);
	}
}

export const backgroundService = new BackgroundService();
