import React from "react";
import { View, StyleSheet } from "react-native";

export default function SplashScreen() {
	return <View style={styles.container} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
