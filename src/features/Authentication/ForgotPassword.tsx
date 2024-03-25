import { Button, Text, View } from "react-native";
import React, { Component } from "react";
import { TextFormField } from "@components/FormFields/TextFormField";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { makeStyles } from "@hooks/makeStyles";
import { Dimensions, ViewStyle } from "react-native";

type FormValues = {
	email: string;
};

const schema: Schema<FormValues> = object({
	email: string().email("Email is not valid").required("Email is required"),
});

export default function ForgotPassword() {
	const styles = useStyles();
	const onSubmit = async (values: FormValues) => {
		try {
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={schema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, isSubmitting, isValid }) => (
				<KeyboardAvoidView>
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
								Login
							</Button>

							{/* <Button mode="text" onPress={() => navigation.navigate("SignUp")}>
									Don't have an account? Sign up
								</Button> */}
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
	} as ViewStyle, // Add type assertion to make it compatible with ViewStyle
	buttonGroup: {
		marginTop: 20,
	},
	loginButton: {
		width: Dimensions.get("window").width * 0.7,
		borderRadius: 0,
		alignSelf: "center",
	},
}));
