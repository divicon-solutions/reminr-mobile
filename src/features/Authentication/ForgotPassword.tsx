import { Dimensions, Image, View } from "react-native";
import React from "react";
import { TextFormField } from "@components/FormFields/TextFormField";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { makeStyles } from "@hooks/makeStyles";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { AlertService } from "@services/AlertService";
import { StackNavigationProps } from "@navigations/types";

type FormValues = {
	email: string;
};

const schema: Schema<FormValues> = object({
	email: string().email("Email is not valid").required("Email is required"),
});

type ForgotPasswordProps = StackNavigationProps<"ForgotPassword">;
export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
	const styles = useStyles();
	const { forgotPassword } = useAuth();

	const onSubmit = async (values: FormValues) => {
		try {
			await forgotPassword(values.email);
			AlertService.successMessage(
				"If the email exists, a password reset link will be sent to your email.",
			);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			navigation.goBack();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<Formik initialValues={{ email: "" }} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isSubmitting, isValid }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.content}>
					<View style={styles.form}>
						<Image source={require("@assets/logo.png")} style={styles.logo} />
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

const useStyles = makeStyles(() => ({
	container: {
		padding: 16,
		backgroundColor: "white",
	},
	content: {
		flexGrow: 1,
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
	logo: {
		width: 200,
		height: 200,
		alignSelf: "center",
	},
}));
