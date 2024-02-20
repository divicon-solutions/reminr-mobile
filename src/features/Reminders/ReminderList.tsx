import { FlatList, RefreshControl, Modal } from "react-native";
import React, { useCallback } from "react";
import { Card, List, Text } from "react-native-paper";
import { Reminder, useRemindersControllerFindAll } from "@api";
import Loader from "@components/Loader";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ViewReminder from "./ViewReminder";
import { makeStyles } from "@hooks/makeStyles";
import { parseDateToFormat } from "@utils/formatters";

export default function ReminderList() {
	const { data, isLoading, isRefetching, refetch } = useRemindersControllerFindAll();
	const [selectedReminder, setSelectedReminder] = React.useState<Reminder | null>(null);

	const styles = useStyles();

	const handleReminderPress = (reminder: Reminder) => {
		setSelectedReminder(reminder);
	};

	const handleReminderDismiss = () => {
		setSelectedReminder(null);
	};

	const renderItem = useCallback(
		({ item }: { item: Reminder }) => {
			return (
				<Card mode="contained" style-={styles.card}>
					<List.Item
						title={
							<>
								<Text variant="bodyMedium">{item.title}</Text>
								<Text>{item.description}</Text>
							</>
						}
						description={parseDateToFormat(item.remindAt, "hh:mm A")}
						onPress={() => handleReminderPress(item)}
						right={() => <MCIcon name="timer-sand-complete" size={30} />}
					/>
				</Card>
			);
		},
		[styles],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={<Text variant="headlineSmall">Medication Due:</Text>}
				ListEmptyComponent={<Text>No Medications</Text>}
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
				style={styles.root}
			/>
			<Modal
				visible={selectedReminder != null}
				onDismiss={handleReminderDismiss}
				animationType="slide"
				presentationStyle="pageSheet"
			>
				{selectedReminder && (
					<ViewReminder reminder={selectedReminder} closeModal={handleReminderDismiss} />
				)}
			</Modal>
		</>
	);
}

const useStyles = makeStyles(() => ({
	root: {
		padding: 10,
	},
	card: {
		borderRadius: 5,
	},
}));
