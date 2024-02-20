import { View, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import React from "react";
import { BottomTabNavigationProps } from "@navigations/types";
import { Button } from "react-native-paper";
import { MedicationDto, useMedicationsControllerFindAll } from "@api";
import Loader from "@components/Loader";
import { Card, Text } from "react-native-paper";

type MedicationsListProps = BottomTabNavigationProps<"Medications">;

export default function MedicationsList({ navigation }: MedicationsListProps) {
	const { data, isLoading, isRefetching, refetch } = useMedicationsControllerFindAll();
	if (isLoading) return <Loader />;
	return (
		<FlatList
			data={data}
			style={{ padding: 16 }}
			renderItem={({ item }) => (
				<TouchableOpacity onPress={() => navigation.navigate("EditMedicationScreen", { item })}>
					<View>
						<Card
							mode="contained"
							style={{ backgroundColor: "white", borderRadius: 5, marginBottom: 10 }}
						>
							<Card.Content>
								<Text
									variant="bodyMedium"
									style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}
								>
									{item.name}
								</Text>
								<Text>2 pills {item.frequency.toLowerCase()} - 06:00 PM</Text>
							</Card.Content>
						</Card>
					</View>
				</TouchableOpacity>
			)}
			keyExtractor={(item) => item.id.toString()}
			ListEmptyComponent={<Text>No Medications</Text>}
			ListHeaderComponent={
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Button
						mode="contained"
						onPress={() => navigation.navigate("AddMedication")}
						style={{ marginBottom: 15, borderRadius: 0, width: 300 }}
					>
						Add Medication
					</Button>
				</View>
			}
			refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
		/>
	);
}
