import React from "react";
import { Dimensions, View } from "react-native";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { TextFormField } from "@components/FormFields/TextFormField";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { StackNavigationProps } from "@navigations/types";
import { makeStyles } from "@hooks/makeStyles";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { AlertService } from "@services/AlertService";

type FormValues = {
	email: string;
	password: string;
};

const schema: Schema<FormValues> = object({
	email: string().email("Email is not valid").required("Email is required"),
	password: string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

type LoginProps = StackNavigationProps<"Login">;
export default function Login({ navigation }: LoginProps) {
	const { signIn } = useAuth();
	const styles = useStyles();

	const onSubmit = async (values: FormValues) => {
		try {
			await signIn(values.email, values.password);
		} catch (error: any) {
			const errMsg = error.message || "An error occurred";
			AlertService.errorMessage(errMsg);
		}
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={schema}
			onSubmit={onSubmit}
		>
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
						<TextFormField name="password" label="Password" type="password" />
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

							<Button mode="text" onPress={() => navigation.navigate("ForgotPassword")}>
								Forgot Password?
							</Button>

							<Button mode="text" onPress={() => navigation.navigate("SignUp")}>
								Don't have an account? Sign up
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
