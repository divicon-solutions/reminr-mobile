import { View, FlatList, RefreshControl } from "react-native";
import React, { useCallback } from "react";
import { RedeemDto, useRedeemsControllerFindAll } from "@api";
import Loader from "@components/Loader";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import { Card, List } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";
import NoDataFound from "@components/NoDataFound";

type RedeemHistoryProps = StackNavigationProps<"RedeemHistory">;

export default function RedeemHistory({ navigation }: RedeemHistoryProps) {
	const { user } = useAuth();
	const { data, isLoading, isRefetching, refetch } = useRedeemsControllerFindAll({
		userId: user?.uid,
	});
	const styles = useStyles();
	const { colors } = useAppTheme();

	const renderItem = useCallback(
		({ item }: { item: RedeemDto }) => {
			return (
				<Card
					mode="contained"
					style={[
						styles.redeemCard,
						{
							backgroundColor: item.processedAt ? colors.successContainer : colors.pending,
						},
					]}
					onPress={() => {
						navigation.navigate("RedeemDetails", { redeemId: item.id });
					}}
				>
					<List.Item
						title={item.amount}
						description={
							item.processedAt
								? `Redeemed on ${parseDateToFormat(item.processedAt)}`
								: `Redeem requested on ${parseDateToFormat(item.createdAt)}`
						}
						right={(props) =>
							item.processedAt ? (
								<List.Icon {...props} icon="check" />
							) : (
								<List.Icon {...props} icon="clock" />
							)
						}
						titleStyle={styles.redeemNameStyle}
					/>
				</Card>
			);
		},
		[
			styles.redeemCard,
			styles.redeemNameStyle,
			colors.pending,
			colors.successContainer,
			navigation,
		],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
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
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		backgroundColor: theme.colors.background,
	},
	redeemCard: {
		backgroundColor: theme.colors.onPrimary,
	},
	redeemNameStyle: {
		fontWeight: "700",
		fontSize: 17,
		marginBottom: 15,
	},
	divider: {
		height: 10,
	},
}));
