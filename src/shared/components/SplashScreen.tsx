import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";

export default function SplashScreen() {
	return (
		<>
			<StatusBar backgroundColor="#f5f5f5" animated />
			<View style={styles.container} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		justifyContent: "center",
		alignItems: "center",
	},
});
