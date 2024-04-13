import { Alert, Dimensions, SafeAreaView, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text } from "react-native-paper";
import {
	Reminder,
	getRemindersControllerFindAllQueryKey,
	useRemindersControllerUpdate,
} from "@api";
import { getTodayTimestamp, parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import { useQueryClient } from "@tanstack/react-query";
import { localNotificationsService } from "@services/LocalNotificationsService";
import moment from "moment";
import { storageService } from "@services/StorageService";
import { AlertService } from "@services/AlertService";

type ViewReminderProps = Readonly<{
	reminder: Reminder;
	closeModal: () => void;
}>;

async function getSnoozeNotification(reminderId: string) {
	const snoozeNotifications = await storageService.getSnoozeNotifications();
	if (!snoozeNotifications[reminderId]) {
		return null;
	}
	const snoozeNotification = snoozeNotifications[reminderId];
	if (snoozeNotification.timestamp < new Date().getTime()) {
		return null;
	}
	return snoozeNotification;
}

async function setSnoozeNotification(
	reminderId: string,
	notificationId: string,
	timestamp: number,
) {
	const snoozeNotifications = await storageService.getSnoozeNotifications();
	snoozeNotifications[reminderId] = { notificationId, timestamp };
	await storageService.setSnoozeNotifications(snoozeNotifications);
}

export default function ViewReminder(props: ViewReminderProps) {
	const { reminder, closeModal } = props;
	const { mutateAsync } = useRemindersControllerUpdate();
	const queryClient = useQueryClient();

	const styles = useStyles();

	const handleTaken = async () => {
		await mutateAsync({
			id: reminder.id,
			data: { status: true, acknowledgedAt: new Date().toISOString() },
		});
		const queryKey = getRemindersControllerFindAllQueryKey({ date: getTodayTimestamp() });
		queryClient.invalidateQueries({ queryKey });
		closeModal();
	};

	const handleUnTaken = async () => {
		await mutateAsync({
			id: reminder.id,
			data: { status: null, acknowledgedAt: null },
		});
		const queryKey = getRemindersControllerFindAllQueryKey({ date: getTodayTimestamp() });
		queryClient.invalidateQueries({ queryKey });
		closeModal();
	};

	const handleSkip = async () => {
		await mutateAsync({
			id: reminder.id,
			data: { status: false, acknowledgedAt: new Date().toISOString() },
		});
		const queryKey = getRemindersControllerFindAllQueryKey({ date: getTodayTimestamp() });
		queryClient.invalidateQueries({ queryKey });
		closeModal();
	};

	const handleSnooze = async () => {
		const snoozeData = await getSnoozeNotification(reminder.id);
		if (snoozeData?.timestamp) {
			Alert.alert(
				"Snooze",
				`You have already snoozed this reminder. It will be reminded again at ${parseDateToFormat(new Date(snoozeData.timestamp).toISOString(), "hh:mm A", true)}`,
			);
			return;
		}
		const timestamp = moment().add(10, "minutes").toDate().getTime();
		const id = await localNotificationsService.createTriggerNotification({
			title: reminder.title,
			body: reminder.description ?? "",
			timestamp,
			data: {
				reminderId: reminder.id,
			},
		});
		await setSnoozeNotification(reminder.id, id, timestamp);
		AlertService.successMessage("You'll be reminded again in 10 minutes");
		closeModal();
	};

	const status = (() => {
		if (reminder.status === true && reminder.acknowledgedAt) {
			return "Taken";
		}
		if (reminder.status === false && reminder.acknowledgedAt) {
			return "Skipped";
		}
		return "Pending";
	})();

	return (
		<SafeAreaView style={styles.root}>
			<View>
				<IconButton icon="close" onPress={closeModal} style={styles.closeButton} />
				<List.Item titleStyle={styles.reminderTitleStyle} title={reminder.title} />
				<List.Item
					titleStyle={styles.descriptionStyle}
					title={"No of Pills"}
					right={() => (
						<Text style={styles.descriptionStyle}>{reminder.medication?.noOfPills}</Text>
					)}
				/>
				<List.Item
					title={"Due at"}
					titleStyle={styles.descriptionStyle}
					right={() => (
						<Text style={styles.descriptionStyle}>
							{parseDateToFormat(reminder.remindAt, "hh:mm A", true)}
						</Text>
					)}
				/>
			</View>
			<View>
				{status === "Pending" && new Date(reminder.remindAt).getTime() < new Date().getTime() && (
					<Button mode="contained" onPress={handleSnooze} style={styles.snoozeButton}>
						Snooze
					</Button>
				)}
				<View style={styles.buttonGroup}>
					{status === "Pending" && (
						<Button mode="outlined" onPress={handleSkip} style={styles.skipButton}>
							Skip
						</Button>
					)}
					<Button
						mode="contained"
						onPress={status === "Pending" ? handleTaken : handleUnTaken}
						style={styles.takenButton}
					>
						{status === "Pending" ? "Taken" : "UnTake"}
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		flexGrow: 1,
		justifyContent: "space-between",
		backgroundColor: theme.colors.background,
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	card: {
		borderRadius: 5,
	},
	snoozeButton: {
		width: 300,
		alignSelf: "center",
		marginBottom: 15,
		borderRadius: 0,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	skipButton: {
		width: Dimensions.get("window").width / 3,
		borderRadius: 0,
	},
	takenButton: {
		width: Dimensions.get("window").width / 3,
		borderRadius: 0,
	},
	reminderTitleStyle: {
		fontSize: 25,
	},
	descriptionStyle: {
		fontSize: 18,
	},
}));
