import { Dimensions, View } from "react-native";
import React from "react";
import { ReminderDto } from "@api";
import { Button, Card, Text } from "react-native-paper";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyboardAvoidView from "@components/KeyboardAvoidView";

type ViewReminderProps = {
	reminder: ReminderDto;
};

export default function ViewReminder(props: ViewReminderProps) {
	const { reminder } = props;

	const renderCard = (title: string, content: string) => (
		<Card mode="contained" style={{ backgroundColor: "white", borderRadius: 5, marginBottom: 20 }}>
			<Card.Content>
				{title === "medicationName" ? (
					<Text variant="bodyMedium" style={{ fontSize: 18, fontWeight: "bold" }}>
						{content}
					</Text>
				) : (
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Text>{title ? `${title}:` : ""}</Text>
						<Text>{content}</Text>
					</View>
				)}
			</Card.Content>
		</Card>
	);

	return (
		<KeyboardAvoidView
			style={{ padding: 20 }}
			contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
		>
			<View>
				{renderCard("medicationName", reminder.title)}
				{renderCard("Dose", "1 pills")}
				{renderCard("Time", moment(reminder.remindAt, "hh:mmA").format("hh:mm A"))}
			</View>
			<SafeAreaView>
				<Button
					mode="contained"
					onPress={() => {}}
					style={{
						width: 300,
						alignSelf: "center",
						marginBottom: 15,
						borderRadius: 0,
						backgroundColor: "#f9af47",
					}}
				>
					<Text style={{ fontWeight: 700 }}>Snooze</Text>
				</Button>
				<SafeAreaView style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<Button
						mode="outlined"
						onPress={() => {}}
						style={{ width: Dimensions.get("window").width / 3, borderRadius: 0 }}
					>
						Skip
					</Button>
					<Button
						mode="contained"
						onPress={() => {}}
						style={{ width: Dimensions.get("window").width / 3, borderRadius: 0 }}
					>
						Taken
					</Button>
				</SafeAreaView>
			</SafeAreaView>
		</KeyboardAvoidView>
	);
}
