import { View, FlatList, RefreshControl, Modal } from "react-native";
import React, { Fragment } from "react";
import { BottomTabNavigationProps } from "@navigations/types";
import { ReminderDto, useRemindersControllerFindAll } from "@api";
import Loader from "@components/Loader";
import { TouchableOpacity } from "react-native";
import ViewReminder from "@features/Medication/ViewReminder";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, Text } from "react-native-paper";
import moment from "moment";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
			<View style={{ padding: 16 }}>
				<Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 10 }}>Medications Due:</Text>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => handleReminderPress(item)}>
							<View style={{ flex: 1 }}>
								<Card
									mode="contained"
									style={{ backgroundColor: "white", borderRadius: 5, marginBottom: 10 }}
								>
									<Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
										<View>
											<Text variant="bodyMedium" style={{ fontSize: 18, fontWeight: "bold" }}>
												{item.title}
											</Text>
											<Text>2 pills</Text>
										</View>
										<View>
											<MCIcon name="timer-sand-complete" size={24} color="#f09337" />
										</View>
									</Card.Content>
									<Card.Content>
										<Text style={{ marginTop: 15, fontSize: 12 }}>
											{moment(item.remindAt, "hh:mmA").format("hh:mm A")}
										</Text>
									</Card.Content>
								</Card>
							</View>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.id.toString()}
					ListEmptyComponent={<Text>No Medications</Text>}
					refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
				/>
			</View>
			<Modal animationType="slide" presentationStyle="pageSheet" visible={modalVisible}>
				<View style={{ backgroundColor: "#eeeeee", flex: 1 }}>
					<View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Icon name="close" size={24} />
						</TouchableOpacity>
					</View>
					{selectedReminder && <ViewReminder reminder={selectedReminder} />}

					{/* <TouchableOpacity
						onPress={() => {
							setModalVisible(!modalVisible);
						}}
					>
						<Text>Hide Modal</Text>
					</TouchableOpacity> */}
				</View>
			</Modal>
		</Fragment>
	);
}
