import { RefreshControl, Dimensions, Modal, View } from "react-native";
import React, { useCallback } from "react";
import { InrTestDto, useInrTestControllerFindAll } from "@api";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@components/Loader";
import { Button, Card, List } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import FIcon from "react-native-vector-icons/Fontisto";
import { useDialog } from "@hooks/useDialog";
import AddInrValue from "./AddInrValue";

export default function InrList() {
	const { data, isLoading, isRefetching, refetch } = useInrTestControllerFindAll();
	const styles = useStyles();
	const { open, handleClickOpen, handleClose } = useDialog();

	const renderItem = useCallback(({ item }: { item: InrTestDto }) => {
		return (
			<Card mode="contained">
				<List.Item
					title={item.inrValue.toString()}
					description={parseDateToFormat(item.date, "MMM DD, YYYY")}
					right={(props) => <FIcon name="blood-drop" size={24} {...props} color={"red"} />}
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
						Add Inr Value
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
				<AddInrValue hideModal={handleClose} />
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
