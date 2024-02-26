import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import { useDashboardControllerGetDashboardData } from "@api";
import Loader from "@components/Loader";
import MedicationsGraph from "./MedicationsGraph";
import InrTestsGraph from "./InrTestsGraph";

export default function Dashboard() {
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
					<Text variant="titleMedium" style={{ fontWeight: "700" }}>
						Wellness Score:
					</Text>
					<Card mode="contained" style={styles.wellnessScore}>
						<Card.Content>
							<Text variant="bodyMedium">
								{
									<Text variant="titleLarge" style={{ textAlign: "center" }}>
										{data?.wellnessScore}
									</Text>
								}
								/100
							</Text>
						</Card.Content>
					</Card>
				</View>
				<View>
					<Text variant="titleMedium" style={{ fontWeight: "700" }}>
						Next INR Test:
					</Text>
					<Card mode="contained" style={styles.inrTest}>
						<Card.Content>
							<Text variant="bodyMedium" style={{ textAlign: "center" }}>
								on
							</Text>
							<Text variant="bodyLarge" style={{ textAlign: "center" }}>
								Mar 15th
							</Text>
						</Card.Content>
					</Card>
				</View>
			</View>
			<View>
				<Text variant="titleMedium" style={{ fontWeight: "700" }}>
					Incentives:
				</Text>
				<Card mode="contained" style={{ backgroundColor: colors.tertiaryContainer }}>
					<Card.Content>
						<Text variant="titleLarge">$ {data?.incentiveAmount} </Text>
						<Text variant="bodyMedium" style={{ textAlign: "right", marginTop: 18 }}>
							View account{">"}
						</Text>
					</Card.Content>
				</Card>
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
				<Text variant="titleMedium" style={{ fontWeight: "700", marginTop: 10 }}>
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
		padding: 10,
		backgroundColor: theme.colors.onPrimary,
	},
	inrTest: {
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: theme.colors.onPrimary,
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
}));
