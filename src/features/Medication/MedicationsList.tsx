import { View, Text, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import React from "react";
import { BottomTabNavigationProps } from "@navigations/types";
import { Button } from "react-native-paper";
import { useMedicationsControllerFindAll } from "@api";
import Loader from "@components/Loader";

type MedicationsListProps = BottomTabNavigationProps<"Medications">;

export default function MedicationsList({ navigation }: MedicationsListProps) {
	const { data, isLoading, isRefetching, refetch } = useMedicationsControllerFindAll();
	if (isLoading) return <Loader />;
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<TouchableOpacity onPress={() => navigation.navigate("EditMedicationScreen", { item })}>
					<View>
						<Text>{item.name}</Text>
					</View>
				</TouchableOpacity>
			)}
			keyExtractor={(item) => item.id.toString()}
			ListEmptyComponent={<Text>No Medications</Text>}
			ListHeaderComponent={
				<Button onPress={() => navigation.navigate("AddMedication")}>Add Medication</Button>
			}
			refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
		/>
	);
}
