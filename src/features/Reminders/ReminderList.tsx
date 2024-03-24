import { FlatList, RefreshControl, Modal, View } from "react-native";
import React, { useCallback } from "react";
import { Card, List, Text } from "react-native-paper";
import { Reminder, useRemindersControllerFindAll } from "@api";
import Loader from "@components/Loader";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
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
		({ item, isDisabled }: { item: Reminder; isDisabled: boolean }) => {
			return (
				<Card
					mode="contained"
					style={[styles.reminderCard, isDisabled && styles.disabledReminderCard]}
				>
					<List.Item
						title={
							<>
								<Text
									style={[styles.reminderNameStyle, isDisabled && styles.disabledReminderText]}
									variant="bodyMedium"
								>
									{item.title}
								</Text>
								<Text>{item.description}</Text>
							</>
						}
						titleStyle={styles.reminderNameStyle}
						description={parseDateToFormat(item.remindAt, "hh:mm A")}
						descriptionStyle={[isDisabled && styles.disabledReminderText]}
						onPress={() => handleReminderPress(item)}
						right={() =>
							isDisabled ? (
								<IonIcon style={styles.doneIcon} name="checkmark-circle" size={30} />
							) : (
								<MCIcon style={styles.dueIcon} name="timer-sand-complete" size={30} />
							)
						}
					/>
				</Card>
			);
		},
		[styles],
	);

	if (isLoading) {
		return <Loader />;
	}

	// filter data if the remindAt date is not today
	return (
		<>
			{data?.filter(
				(reminder) =>
					new Date(reminder.remindAt).toDateString() === new Date().toDateString() &&
					reminder.status === true,
			)?.length > 0 ? (
				<FlatList
					data={data?.filter(
						(reminder) =>
							new Date(reminder.remindAt).toDateString() === new Date().toDateString() &&
							reminder.status === true,
					)}
					renderItem={({ item }) => renderItem({ item: item, isDisabled: true })}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => <View style={styles.divider} />}
					ListHeaderComponent={<Text variant="headlineSmall">Medication Taken:</Text>}
					ListEmptyComponent={<Text>No Medications</Text>}
					refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
					style={styles.root}
				/>
			) : null}
			<FlatList
				data={data?.filter(
					(reminder) =>
						new Date(reminder.remindAt).toDateString() === new Date().toDateString() &&
						reminder.status === false,
				)}
				renderItem={({ item }) => renderItem({ item: item, isDisabled: false })}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
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

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		backgroundColor: theme.colors.background,
	},
	card: {
		borderRadius: 5,
	},
	reminderCard: {
		backgroundColor: theme.colors.onPrimary,
	},
	disabledReminderCard: {
		backgroundColor: theme.colors.disabledCard,
	},
	disabledReminderText: {
		color: theme.colors.onDisabledCard,
	},
	divider: {
		height: 10,
	},
	reminderNameStyle: {
		fontWeight: "700",
		fontSize: 17,
		marginBottom: 15,
	},
	doneIcon: {
		color: theme.colors.success,
	},
	dueIcon: {
		color: theme.colors.pending,
	},
}));
