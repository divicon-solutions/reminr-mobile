import * as React from "react";
import { Dimensions, Pressable, SafeAreaView, View } from "react-native";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import MIcon from "react-native-vector-icons/MaterialIcons";
import ADIcon from "react-native-vector-icons/AntDesign";
import { Text } from "react-native-paper";
import { StackNavigationProps } from "@navigations/types";

type IncentivesOverviewProps = StackNavigationProps<"IncentivesOverview">;

export default function IncentivesOverview({ navigation, route }: IncentivesOverviewProps) {
	const { accountBalance } = route.params;
	const styles = useStyles();
	const { colors } = useAppTheme();

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.amountView}>
				<Text style={styles.amountStyle}>$ {accountBalance}</Text>
			</View>
			<View style={styles.iconsView}>
				<View>
					<Pressable
						onPress={() => navigation.navigate("RedeemAmount", { accountBalance: accountBalance })}
						style={styles.iconContainer}
					>
						<ADIcon name="arrowright" size={30} color={colors.primary} />
					</Pressable>
					<Text style={styles.iconBottomText}>Redeem Gift Card</Text>
				</View>
				<View>
					<Pressable
						onPress={() => navigation.navigate("RedeemHistory")}
						style={styles.iconContainer}
					>
						<MIcon name="redeem" size={30} color={colors.primary} />
					</Pressable>
					<Text style={styles.iconBottomText}>Redeemed History</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flex: 1,
		margin: 15,
	},
	amountStyle: {
		fontSize: 40,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	iconContainer: {
		width: 75,
		height: 75,
		borderRadius: 50,
		backgroundColor: theme.colors.onPrimary,
		justifyContent: "center",
		alignItems: "center",
	},
	iconsView: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height * 0.1,
	},
	iconBottomText: {
		fontSize: 11,
		marginTop: 10,
	},
	amountView: {
		marginTop: Dimensions.get("window").height * 0.1,
	},
}));
