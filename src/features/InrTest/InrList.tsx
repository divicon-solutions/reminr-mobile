import { RefreshControl, Dimensions, View } from "react-native";
import React, { useCallback } from "react";
import { InrTestDto, useInrTestControllerFindAll } from "@api";
import { FlatList } from "react-native-gesture-handler";
import Loader from "@components/Loader";
import { Button, Card, List } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";
import { makeStyles } from "@hooks/makeStyles";
import FIcon from "react-native-vector-icons/Fontisto";
import { BottomTabNavigationProps } from "@navigations/types";

type InrListProps = BottomTabNavigationProps<"InrTest">;

export default function InrList(props: InrListProps) {
	const { navigation } = props;
	const { data, isLoading, isRefetching, refetch } = useInrTestControllerFindAll();
	const styles = useStyles();

	const renderItem = useCallback(
		({ item }: { item: InrTestDto }) => {
			return (
				<Card mode="contained" style={styles.inrResultCard}>
					<List.Item
						title={item.inrValue.toString()}
						description={parseDateToFormat(item.date, "MMM DD, YYYY")}
						right={(props) => <FIcon name="blood-drop" size={24} {...props} color={"red"} />}
						onPress={() => navigation.navigate("EditInrValue", { inrTest: item })}
						titleStyle={styles.inrResultValue}
						descriptionStyle={styles.dateStyles}
					/>
				</Card>
			);
		},
		[navigation, styles.dateStyles, styles.inrResultCard, styles.inrResultValue],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Button
				mode="contained"
				style={styles.addInrButton}
				onPress={() => navigation.navigate("AddInrValue")}
			>
				Add INR Test Result
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
	inrResultValue: {
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 5,
	},
	inrResultCard: {
		backgroundColor: theme.colors.onPrimary,
	},
	dateStyles: {
		fontSize: 10,
	},
}));
