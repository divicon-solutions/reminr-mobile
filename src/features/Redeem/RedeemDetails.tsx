import { View, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import { StackNavigationProps } from "@navigations/types";
import ADIcon from "react-native-vector-icons/AntDesign";
import { makeStyles } from "@hooks/makeStyles";
import { Button, Divider, Text } from "react-native-paper";
import { parseDateToFormat } from "@utils/formatters";

type RedeemDetailsProps = StackNavigationProps<"RedeemDetails">;

export default function RedeemedCardDetails({ route }: RedeemDetailsProps) {
	const { redeemTransaction } = route.params;
	const styles = useStyles();
	const [copyTransition, setCopyTransition] = useState(false);

	const copyGiftCardCodeToClipboard = () => {
		// if (redeemTransaction.giftCardCode) Clipboard.setString(redeemTransaction.giftCardCode);
		setCopyTransition(true);
		setTimeout(() => {
			setCopyTransition(false);
		}, 1000);
	};

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
			{/* <View style={{ alignItems: "center" }}>
				<Text style={{ color: "#7279d8", fontWeight: "800", fontSize: 17 }}>
					Redeem ID: {"XXXXXXX"}
				</Text>
			</View> */}
			<View style={styles.itemContainer}>
				<Text style={styles.label}>{"Amount"}:</Text>
				<Text style={styles.value}>{redeemTransaction.amount}</Text>
			</View>
			<View style={styles.itemContainer}>
				<Text style={styles.label}>{"Gift Card"}:</Text>
				<Text style={styles.value}>{redeemTransaction.giftCardType}</Text>
			</View>
			<View style={styles.itemContainer}>
				<Text style={styles.label}>{"Requested Date"}:</Text>
				<Text style={styles.value}>
					{parseDateToFormat(redeemTransaction.createdAt, "MM/DD/YYYY HH:mm A")}
				</Text>
			</View>
			<View style={styles.itemContainer}>
				<Text style={styles.label}>{"Processed Date"}:</Text>
				<Text style={styles.value}>
					{redeemTransaction.processedAt &&
						parseDateToFormat(redeemTransaction.processedAt, "MM/DD/YYYY HH:mm A")}
				</Text>
			</View>
			{redeemTransaction?.processedAt && (
				<View style={styles.giftCardCodeContainer}>
					<View style={styles.giftCardCodeBackground}>
						<Text style={styles.giftCardCode}>{redeemTransaction.giftCardCode}</Text>
					</View>

					<Button
						mode={copyTransition ? "contained" : "outlined"}
						style={{ marginTop: 10 }}
						onPress={copyGiftCardCodeToClipboard}
					>
						{copyTransition ? "Copied!" : "Copy Code"}
					</Button>
				</View>
			)}
		</SafeAreaView>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: "center",
		alignItems: "center",
		height: Dimensions.get("window").height / 5,
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
	giftCardCodeContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	giftCardCodeBackground: {
		backgroundColor: theme.colors.primary,
		padding: 10,
		borderRadius: 5,
	},
	giftCardCode: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Courier",
		color: theme.colors.onPrimary,
	},
}));
