import { Dimensions, View } from "react-native";
import React from "react";
import { TextFormField } from "@components/FormFields/TextFormField";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { makeStyles } from "@hooks/makeStyles";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { AlertService } from "@services/AlertService";

type FormValues = {
	email: string;
};

const schema: Schema<FormValues> = object({
	email: string().email("Email is not valid").required("Email is required"),
});

export default function ForgotPassword() {
	const styles = useStyles();
	const { forgotPassword } = useAuth();

	const onSubmit = async (values: FormValues) => {
		try {
			await forgotPassword(values.email);
			AlertService.successMessage(
				"If the email exists, a password reset link will be sent to your email.",
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<Formik initialValues={{ email: "" }} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isSubmitting, isValid }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.content}>
					<View style={styles.form}>
						<TextFormField
							name="email"
							label="Email"
							keyboardType="email-address"
							autoCapitalize="none"
							textContentType="emailAddress"
						/>
						<View style={styles.buttonGroup}>
							<Button
								mode="contained"
								onPress={() => handleSubmit()}
								disabled={isSubmitting || !isValid}
								loading={isSubmitting}
								style={styles.loginButton}
							>
								Send Reset Link
							</Button>
						</View>
					</View>
				</KeyboardAvoidView>
			)}
		</Formik>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		padding: 16,
		backgroundColor: theme.colors.background,
	},
	content: {
		flexGrow: 1,
		justifyContent: "center",
	},
	form: {
		gap: 10,
	},
	buttonGroup: {
		marginTop: 20,
	},
	loginButton: {
		width: Dimensions.get("window").width * 0.7,
		borderRadius: 0,
		alignSelf: "center",
	},
}));
