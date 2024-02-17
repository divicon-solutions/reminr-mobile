import { ActivityIndicator, View } from "react-native";
import React from "react";
import { makeStyles } from "@hooks/makeStyles";

export default function Loader() {
	const styles = useStyles();
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" animating />
		</View>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.backgroundColor,
	},
}));
