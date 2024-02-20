import { View, Text, FlatList, RefreshControl, Modal } from "react-native";
import React, { Fragment } from "react";
import { BottomTabNavigationProps } from "@navigations/types";
import { ReminderDto, useRemindersControllerFindAll } from "@api";
import Loader from "@components/Loader";
import { TouchableOpacity } from "react-native";
import ViewReminder from "@features/Medication/ViewReminder";
import Icon from "react-native-vector-icons/MaterialIcons";

type TodayProps = BottomTabNavigationProps<"Today">;

export default function Today({ navigation }: TodayProps) {
	const { data, isLoading, isRefetching, refetch } = useRemindersControllerFindAll();
	const [modalVisible, setModalVisible] = React.useState(false);
	const [selectedReminder, setSelectedReminder] = React.useState<ReminderDto | null>(null);

	const handleReminderPress = (reminder: ReminderDto) => {
		setSelectedReminder(reminder);
		setModalVisible(true);
	};
	if (isLoading) return <Loader />;
	return (
		<Fragment>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleReminderPress(item)}>
						<View>
							<Text>{item.title}</Text>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={<Text>No Medications</Text>}
				ListHeaderComponent={<Text>Today</Text>}
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
			/>

			<Modal animationType="slide" presentationStyle="pageSheet" visible={modalVisible}>
				<View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
					<TouchableOpacity
						onPress={() => {
							setModalVisible(!modalVisible);
						}}
					>
						<Icon name="close" size={24} />
					</TouchableOpacity>
				</View>
				<View>{selectedReminder && <ViewReminder reminder={selectedReminder} />}</View>

				<TouchableOpacity
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<Text>Hide Modal</Text>
				</TouchableOpacity>
			</Modal>
		</Fragment>
	);
}
