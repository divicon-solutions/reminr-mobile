import {
	Dimensions,
	ImageBackground,
	Pressable,
	RefreshControl,
	ScrollView,
	View,
} from "react-native";
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
				<View>
					<Text variant="titleMedium" style={styles.cardUpperTitle}>
						Wellness Score:
					</Text>
					<Card mode="contained" style={styles.wellnessScore}>
						<Card.Content>
							<Text variant="bodyMedium">
								{<Text variant="titleLarge">{data?.wellnessScore}</Text>}
								/100
							</Text>
						</Card.Content>
					</Card>
				</View>
				<View>
					<Text variant="titleMedium" style={styles.cardUpperTitle}>
						Next INR Test:
					</Text>
					<Card mode="contained" style={styles.inrTest}>
						<ImageBackground>
							<Card.Content>
								<Text variant="bodyMedium" style={{ textAlign: "center" }}>
									on
								</Text>
								<Text variant="bodyLarge">Mar 15th</Text>
							</Card.Content>
						</ImageBackground>
					</Card>
				</View>
			</View>
			<Pressable
				onPress={() =>
					navigation.navigate("IncentivesOverview", { accountBalance: data?.incentiveAmount ?? 0 })
				}
			>
				<Text variant="titleMedium" style={styles.cardUpperTitle}>
					Incentives:
				</Text>
				<Card mode="contained" style={{ backgroundColor: colors.tertiaryContainer }}>
					<Card.Content>
						<Text variant="titleLarge">$ {data?.incentiveAmount} </Text>
						<Text variant="bodyMedium" style={styles.viewAccount}>
							View account{">"}
						</Text>
					</Card.Content>
				</Card>
			</Pressable>

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
}));
