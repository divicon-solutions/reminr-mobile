import { makeStyles } from "@hooks/makeStyles";
import { useAuth } from "@providers/auth";
import { AlertService } from "@services/AlertService";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function VerifyEmail() {
	const styles = useStyles();
	const { resendVerificationEmail, signOut } = useAuth();

	const handleResendVerificationEmail = async () => {
		try {
			await resendVerificationEmail();
			AlertService.successMessage("Verification email sent successfully");
		} catch (error: any) {
			const errMsg = error.message || "An error occurred";
			AlertService.errorMessage(errMsg);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error: any) {
			const errMsg = error.message || "An error occurred";
			AlertService.errorMessage(errMsg);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("@assets/verify-email.jpg")}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text style={styles.message}>Please verify your email address to continue.</Text>
			<View style={styles.buttonGroup}>
				<Button mode="contained" style={styles.button} onPress={handleResendVerificationEmail}>
					Resend Verification Email
				</Button>
				<Button mode="contained" style={styles.button} onPress={handleSignOut}>
					I have verified my email
				</Button>
			</View>
		</View>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.background,
		padding: 10,
	},
	image: {
		width: Dimensions.get("window").width * 0.5,
		height: 150,
		marginBottom: 20,
	},
	message: {
		fontSize: 18,
	},
	buttonGroup: {
		marginTop: 20,
		flexDirection: "column",
		justifyContent: "center",
		gap: 10,
	},
	button: {
		borderRadius: 0,
	},
}));
