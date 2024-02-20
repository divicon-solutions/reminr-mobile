import { RefreshControl, Dimensions, Modal, View } from "react-native";
import React, { useCallback, useState } from "react";
import { MedicationDto, useMedicationsControllerFindAll } from "@api";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@components/Loader";
import { Button, Card, List } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import { useDialog } from "@hooks/useDialog";
import AddMedication from "./AddMedication";
import EditMedication from "./EditMedication";

export default function MedicationsList() {
	const { data, isLoading, isRefetching, refetch } = useMedicationsControllerFindAll();
	const styles = useStyles();
	const { open, handleClickOpen, handleClose } = useDialog();
	const [selectedMedication, setSelectedMedication] = useState<MedicationDto | null>(null);

	const renderItem = useCallback(({ item }: { item: MedicationDto }) => {
		return (
			<Card mode="contained">
				<List.Item
					title={item.name}
					description={`${item.dosage} pills - ${parseDateToFormat(item.startDate)}`}
					onPress={() => setSelectedMedication(item)}
				/>
			</Card>
		);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={
					<Button mode="contained" style={styles.addInrButton} onPress={handleClickOpen}>
						Add Medication
					</Button>
				}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				onRefresh={refetch}
				refreshing={isRefetching}
				refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
				style={styles.root}
			/>
			<Modal
				visible={open}
				animationType="slide"
				presentationStyle="pageSheet"
				onDismiss={handleClose}
			>
				<AddMedication hideModal={handleClose} />
			</Modal>
			<Modal
				visible={!!selectedMedication}
				animationType="slide"
				presentationStyle="pageSheet"
				onDismiss={() => setSelectedMedication(null)}
			>
				{selectedMedication && (
					<EditMedication
						hideModal={() => setSelectedMedication(null)}
						medication={selectedMedication}
					/>
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
	addInrButton: {
		marginBottom: 10,
		width: Dimensions.get("window").width * 0.6,
		alignSelf: "center",
		borderRadius: 0,
	},
	divider: {
		height: 10,
	},
}));
