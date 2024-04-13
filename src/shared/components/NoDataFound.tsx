import { makeStyles } from "@hooks/makeStyles";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "react-native-paper";

export default function NoDataFound() {
	const styles = useStyles();
	return (
		<View style={styles.container}>
			<Image source={require("@assets/empty-data.jpg")} style={styles.image} resizeMode="contain" />
			<Text style={styles.message}>No data found</Text>
		</View>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.background,
	},
	image: {
		width: Dimensions.get("window").width * 0.5,
		height: 150,
		marginBottom: 20,
	},
	message: {
		fontSize: 18,
	},
}));
