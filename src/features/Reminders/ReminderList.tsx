import { RefreshControl, Modal, View, SectionList } from "react-native";
import React, { useCallback, useMemo } from "react";
import { Card, List, Text } from "react-native-paper";
import { Reminder, useRemindersControllerFindAll } from "@api";
import Loader from "@components/Loader";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import ViewReminder from "./ViewReminder";
import { makeStyles } from "@hooks/makeStyles";
import { getTodayTimestamp, parseDateToFormat } from "@utils/formatters";
import NoDataFound from "@components/NoDataFound";

const now = getTodayTimestamp();

export default function ReminderList() {
	const { data, isLoading, isRefetching, refetch } = useRemindersControllerFindAll({
		date: now,
	});
	const [selectedReminder, setSelectedReminder] = React.useState<Reminder | null>(null);

	const styles = useStyles();

	const handleReminderPress = (reminder: Reminder) => {
		setSelectedReminder(reminder);
	};

	const handleReminderDismiss = () => {
		setSelectedReminder(null);
	};

	const renderItem = useCallback(
		({ item, isDisabled, isDue }: { item: Reminder; isDisabled: boolean; isDue: boolean }) => {
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
						description={parseDateToFormat(item.remindAt, "hh:mm A", true)}
						descriptionStyle={[isDisabled && styles.disabledReminderText]}
						onPress={() => handleReminderPress(item)}
						right={() =>
							isDisabled ? (
								<IonIcon style={styles.doneIcon} name="checkmark-circle" size={30} />
							) : (
								isDue && <MCIcon style={styles.dueIcon} name="timer-sand-complete" size={30} />
							)
						}
					/>
				</Card>
			);
		},
		[styles],
	);

	const takenReminders = useMemo(
		() => data?.filter((reminder) => reminder.status === true) || [],
		[data],
	);
	const upcomingReminders = useMemo(
		() =>
			data?.filter(
				(reminder) =>
					new Date(reminder.remindAt).getTime() > new Date().getTime() &&
					reminder.status !== true &&
					reminder.acknowledgedAt === null,
			) || [],
		[data],
	);
	const dueReminders = useMemo(
		() =>
			data?.filter(
				(reminder) =>
					new Date(reminder.remindAt).getTime() < new Date().getTime() &&
					reminder.status !== true &&
					reminder.acknowledgedAt === null,
			) || [],
		[data],
	);
	const skippedReminders = useMemo(
		() => data?.filter((reminder) => reminder.status === false) || [],
		[data],
	);

	const sectionList = useMemo(() => {
		return [
			{ title: "Upcoming", data: upcomingReminders },
			{ title: "Due", data: dueReminders },
			{ title: "Taken", data: takenReminders },
			{ title: "Skipped", data: skippedReminders },
		];
	}, [takenReminders, dueReminders, upcomingReminders, skippedReminders]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<SectionList
				sections={sectionList.filter((section) => section.data.length > 0)}
				keyExtractor={(item) => item.id}
				renderItem={({ item, section }) =>
					renderItem({
						item,
						isDisabled: section.title === "Taken",
						isDue: section.title === "Due",
					})
				}
				renderSectionHeader={({ section: { title } }) => (
					<View style={styles.headerTitles}>
						<Text variant="titleMedium">{title}:</Text>
					</View>
				)}
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				ListEmptyComponent={NoDataFound}
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
	headerTitles: {
		paddingVertical: 10,
	},
}));
