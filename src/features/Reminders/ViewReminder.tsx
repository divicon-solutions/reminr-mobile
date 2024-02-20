import { Dimensions, SafeAreaView, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text } from "react-native-paper";
import { Reminder } from "@api";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";

type ViewReminderProps = Readonly<{
	reminder: Reminder;
	closeModal: () => void;
}>;

export default function ViewReminder(props: ViewReminderProps) {
	const { reminder, closeModal } = props;

	const styles = useStyles();

	return (
		<SafeAreaView style={styles.root}>
			<View>
				<IconButton icon="close" onPress={closeModal} style={styles.closeButton} />
				<List.Item title={reminder.title} />
				<List.Item title={"Dose"} right={() => <Text>{reminder.medication?.dosage}</Text>} />
				<List.Item
					title={"Time"}
					right={() => <Text>{parseDateToFormat(reminder.remindAt, "hh:mm A")}</Text>}
				/>
			</View>
			<View>
				<Button mode="contained" onPress={props.closeModal} style={styles.snoozeButton}>
					Snooze
				</Button>
				<View style={styles.buttonGroup}>
					<Button mode="outlined" onPress={props.closeModal} style={styles.skipButton}>
						Skip
					</Button>
					<Button mode="contained" onPress={props.closeModal} style={styles.takenButton}>
						Taken
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}

const useStyles = makeStyles(() => ({
	root: {
		padding: 10,
		flexGrow: 1,
		justifyContent: "space-between",
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
}));
