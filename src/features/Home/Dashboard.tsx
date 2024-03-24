import { Dimensions, ImageBackground, RefreshControl, ScrollView, View } from "react-native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import { useDashboardControllerGetDashboardData } from "@api";
import Loader from "@components/Loader";
import MedicationsGraph from "./MedicationsGraph";
import InrTestsGraph from "./InrTestsGraph";
import { StackNavigationProps } from "@navigations/types";

type DashboardProps = StackNavigationProps<"Home">;

export default function Dashboard({ navigation }: DashboardProps) {
	const styles = useStyles();
	const { data, isLoading, isRefetching, refetch } = useDashboardControllerGetDashboardData();
	const [showMedicationsGraph, setShowMedicationsGraph] = React.useState(true);
	const { colors } = useAppTheme();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<ScrollView
			style={styles.root}
			refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
		>
			<View style={styles.upperView}>
				<View />
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.title}>
							{data?.wellnessScore ?? 0} <Text style={styles.by100Text}>/100</Text>{" "}
						</Text>
						<Text style={styles.content}>{"Wellness Score"}</Text>
					</View>
				</View>
				<View />
			</View>
			<View style={styles.upperView}>
				<View>
					<Text variant="titleMedium" style={styles.cardUpperTitle}>
						Incentives:
					</Text>
					<Card mode="contained" style={styles.inrTest}>
						<ImageBackground>
							<Card.Content>
								<Text variant="headlineSmall">$ {data?.incentiveAmount}</Text>
							</Card.Content>
						</ImageBackground>
					</Card>
				</View>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "space-between",
						marginTop: 15,
					}}
				>
					<Button
						mode="contained"
						style={styles.incentiveButton}
						onPress={() =>
							navigation.navigate("RedeemAmount", { accountBalance: data?.incentiveAmount ?? 0 })
						}
					>
						Redeem Incentives
					</Button>
					<Button
						mode="contained"
						style={styles.incentiveButton}
						onPress={() => navigation.navigate("RedeemHistory")}
					>
						Redeem History
					</Button>
				</View>
			</View>
			<View
				style={{
					marginTop: 20,
					backgroundColor: colors.onPrimary,
					padding: 10,
					borderRadius: 10,
					overflow: "hidden",
				}}
			>
				<Text variant="titleMedium" style={(styles.cardUpperTitle, { marginTop: 10 })}>
					Your Progress
				</Text>
				<View style={styles.graphButtonsContainer}>
					<Button
						mode="outlined"
						style={[
							styles.medicationsButton,
							{
								backgroundColor: showMedicationsGraph ? colors.primary : colors.onPrimary,
							},
						]}
						onPress={() => setShowMedicationsGraph(true)}
					>
						<Text
							style={{
								color: showMedicationsGraph ? colors.onPrimary : colors.primary,
							}}
						>
							Medications
						</Text>
					</Button>
					<Button
						mode="outlined"
						style={[
							styles.inrButton,
							{
								backgroundColor: showMedicationsGraph ? colors.onPrimary : colors.primary,
							},
						]}
						onPress={() => setShowMedicationsGraph(false)}
					>
						<Text
							style={{
								color: showMedicationsGraph ? colors.primary : colors.onPrimary,
							}}
						>
							INR Tests
						</Text>
					</Button>
				</View>
				{showMedicationsGraph ? (
					<MedicationsGraph data={data?.takenMedications ?? []} />
				) : (
					<InrTestsGraph data={data?.inrTests ?? []} />
				)}
			</View>
		</ScrollView>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 18,
		backgroundColor: theme.colors.background,
	},
	container: {
		alignItems: "center",
	},
	card: {
		width: 130,
		height: 130,
		borderRadius: 100,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	content: {
		fontSize: 13,
		marginTop: 5,
	},
	upperView: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15,
	},
	wellnessScore: {
		height: 85,
		backgroundColor: theme.colors.onPrimary,
		flexDirection: "column",
		justifyContent: "center",
		width: 125,
		alignItems: "center",
	},
	incentiveButton: {
		width: Dimensions.get("window").width / 2,
		alignSelf: "center",
		borderRadius: 0,
		borderColor: theme.colors.primary,
	},
	inrTest: {
		height: 85,
		backgroundColor: theme.colors.onPrimary,
		flexDirection: "column",
		justifyContent: "center",
		width: 125,
		alignItems: "center",
	},
	inrButton: {
		width: Dimensions.get("window").width / 3,
		alignSelf: "center",
		borderRadius: 0,
		borderColor: theme.colors.primary,
	},
	medicationsButton: {
		borderRadius: 0,
		backgroundColor: theme.colors.error,
		width: Dimensions.get("window").width / 3,
		borderColor: theme.colors.primary,
	},
	graphButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	cardUpperTitle: {
		fontWeight: "700",
	},
	viewAccount: {
		textAlign: "right",
		marginTop: 18,
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
	by100Text: {
		fontSize: 15,
	},
}));
