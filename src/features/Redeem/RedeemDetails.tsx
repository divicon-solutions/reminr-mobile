/* eslint-disable react-native/no-inline-styles */
import { View, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StackNavigationProps } from "@navigations/types";
import ADIcon from "react-native-vector-icons/AntDesign";
import { makeStyles } from "@hooks/makeStyles";
import { Divider, Text } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";

type RedeemDetailsProps = StackNavigationProps<"RedeemDetails">;

export default function RedeemedCardDetails({ route, navigation }: RedeemDetailsProps) {
	const { redeemTransaction } = route.params;
	const [data, setData] = useState([]);
	const styles = useStyles();

	const labels = {
		amount: "Amount",
		processedAt: "Redeemed on",
		giftCardType: "Gift Card",
		giftCardCode: "Code",
	};

	useEffect(() => {
		const data = Object.keys(redeemTransaction)
			.filter((key) => labels.hasOwnProperty(key))
			.map((key) => ({
				label: labels[key],
				value:
					key == "processedAt"
						? parseDateToFormat(redeemTransaction[key], "DD MMM YYYY, hh:mm A")
						: key == "amount"
							? `$ ` + redeemTransaction[key]
							: redeemTransaction[key],
			}));
		setData(data);
	}, [redeemTransaction]);

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Text style={styles.label}>{item.label}:</Text>
			<Text style={styles.value}>{item.value}</Text>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.root}>
				<ADIcon
					name={redeemTransaction?.processedAt ? "checkcircle" : "clockcircle"}
					size={70}
					color={redeemTransaction?.processedAt ? "#37b24d" : "#fab005"}
				/>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: redeemTransaction?.processedAt ? "#37b24d" : "#fab005",
					}}
				>
					{redeemTransaction?.processedAt ? "Redeem Successful" : "Redeem Processing"}
				</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text>
					{redeemTransaction?.processedAt
						? "Your Redeem has been processed!"
						: "Your Redeem is Processing!"}
				</Text>
			</View>
			<Divider style={{ borderWidth: 0.5, borderColor: "lightgray", margin: 20 }} />
			<View style={{ alignItems: "center" }}>
				<Text style={{ color: "#7279d8", fontWeight: "800", fontSize: 17 }}>
					Redeem ID: {"XXXXXXX"}
				</Text>
			</View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</SafeAreaView>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: "center",
		alignItems: "center",
		height: Dimensions.get("window").height / 4,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 10,
		flexShrink: 0,
	},
	value: {
		fontSize: 16,
		fontWeight: "bold",
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		marginRight: 20,
		marginLeft: 20,
	},
}));
