import { RefreshControl, Dimensions, View } from "react-native";
import React, { useCallback } from "react";
import { MedicationDto, useMedicationsControllerFindAll } from "@api";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@components/Loader";
import { Button, Card, List } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import { BottomTabNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";
import NoDataFound from "@components/NoDataFound";

type MedicationsListProps = BottomTabNavigationProps<"Medications">;

export default function MedicationsList({ navigation }: MedicationsListProps) {
	const { user } = useAuth();
	const { data, isLoading, isRefetching, refetch } = useMedicationsControllerFindAll({
		userId: user?.uid,
	});
	const styles = useStyles();

	const renderItem = useCallback(
		({ item }: { item: MedicationDto }) => {
			return (
				<Card mode="contained" style={styles.medicationCard}>
					<List.Item
						title={item.name}
						description={`${item.noOfPills} pills - ${parseDateToFormat(item.startDate)}`}
						onPress={() => navigation.navigate("EditMedication", { medication: item })}
						titleStyle={styles.medicationNameStyle}
					/>
				</Card>
			);
		},
		[navigation, styles.medicationCard, styles.medicationNameStyle],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Button
				mode="contained"
				style={styles.addInrButton}
				onPress={() => navigation.navigate("AddMedication")}
			>
				Add Medication
			</Button>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				onRefresh={refetch}
				refreshing={isRefetching}
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
				style={styles.root}
				ListEmptyComponent={NoDataFound}
			/>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		backgroundColor: theme.colors.background,
	},
	addInrButton: {
		marginTop: 10,
		marginBottom: 5,
		width: Dimensions.get("window").width * 0.6,
		alignSelf: "center",
		borderRadius: 0,
	},
	divider: {
		height: 10,
	},
	medicationCard: {
		backgroundColor: theme.colors.onPrimary,
	},
	medicationNameStyle: {
		fontWeight: "700",
		fontSize: 17,
		marginBottom: 15,
	},
}));
