import { View, Text } from "react-native";
import React from "react";
import { ReminderDto } from "@api";
import { Button } from "react-native-paper";

type ViewReminderProps = {
	reminder: ReminderDto;
};

export default function ViewReminder(props: ViewReminderProps) {
	const { reminder } = props;
	return (
		<View>
			<Text>{reminder.title}</Text>
			<Text>Dose: {reminder.description}</Text>
			<Text>Time: {reminder.remindAt}</Text>

			<Button onPress={() => {}}>Snooze</Button>
			<Button onPress={() => {}}>Skip</Button>
			<Button onPress={() => {}}>Take Medication</Button>
		</View>
	);
}
