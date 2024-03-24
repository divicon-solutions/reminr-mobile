import { Dimensions, SafeAreaView, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text } from "react-native-paper";
import {
	Reminder,
	getRemindersControllerFindAllQueryKey,
	useRemindersControllerUpdate,
} from "@api";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import { useQueryClient } from "@tanstack/react-query";

type ViewReminderProps = Readonly<{
	reminder: Reminder;
	closeModal: () => void;
}>;

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
		const queryKey = getRemindersControllerFindAllQueryKey();
		queryClient.invalidateQueries({ queryKey });
		closeModal();
	};

	return (
		<SafeAreaView style={styles.root}>
			<View>
				<IconButton icon="close" onPress={closeModal} style={styles.closeButton} />
				<List.Item titleStyle={styles.reminderTitleStyle} title={reminder.title} />
				{/* <List.Item title={"Dose"} right={() => <Text>{reminder.medication?.dosage}</Text>} /> */}
				<List.Item
					title={"Due at"}
					titleStyle={styles.descriptionStyle}
					right={() => (
						<Text style={styles.descriptionStyle}>
							{parseDateToFormat(reminder.remindAt, "hh:mm A")}
						</Text>
					)}
				/>
			</View>
			<View>
				{
					// hide snooze button if reminder time is in the past
					new Date(reminder.remindAt) < new Date() && (
						<Button mode="contained" onPress={closeModal} style={styles.snoozeButton}>
							Snooze
						</Button>
					)
				}
				<View style={styles.buttonGroup}>
					<Button mode="outlined" onPress={props.closeModal} style={styles.skipButton}>
						Skip
					</Button>
					<Button mode="contained" onPress={handleTaken} style={styles.takenButton}>
						Taken
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
