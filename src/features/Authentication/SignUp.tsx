import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { TextFormField } from "@components/FormFields/TextFormField";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { CreateUserDto } from "@api";
import { makeStyles } from "@hooks/makeStyles";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { StackNavigationProps } from "@navigations/types";
import { getTimeZone } from "react-native-localize";

type FormValues = CreateUserDto & {
	password: string;
	confirmPassword: string;
};

const schema: Schema<FormValues> = object({
	email: string().email().required("Email is required"),
	fullName: string().required("Full Name is required"),
	password: string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: string()
		.required("Confirm Password is required")
		.test({
			name: "passwords-match",
			message: "Confirm Password must match Password",
			test: function (value) {
				return this.parent.password === value;
			},
		}),
});

type SignUpProps = StackNavigationProps<"SignUp">;
export default function SignUp({ navigation }: SignUpProps) {
	const { signUp } = useAuth();
	const styles = useStyles();

	const onSubmit = async ({ confirmPassword: _, ...values }: FormValues) => {
		const timeZone = getTimeZone();
		await signUp({ ...values, timeZone });
	};

	return (
		<Formik
			initialValues={{ email: "", password: "", confirmPassword: "", fullName: "" }}
			validationSchema={schema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, isSubmitting, isValid }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.content}>
					<View style={styles.form}>
						<Image source={require("@assets/logo.png")} style={styles.logo} />
						<TextFormField name="fullName" label="Full Name" />
						<TextFormField
							name="email"
							label="Email"
							keyboardType="email-address"
							autoCapitalize="none"
							textContentType="emailAddress"
						/>
						<TextFormField
							name="password"
							label="Password"
							type="password"
							autoComplete="new-password"
						/>
						<TextFormField
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							autoComplete="new-password"
						/>
						<View style={styles.buttonGroup}>
							<Button
								mode="contained"
								onPress={() => handleSubmit()}
								disabled={isSubmitting || !isValid}
								loading={isSubmitting}
								style={styles.signUpButton}
							>
								Sign Up
							</Button>

							<Button mode="text" onPress={() => navigation.goBack()}>
								Already have an account? Login
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
		justifyContent: "center",
	},
	form: {
		gap: 10,
	},
	buttonGroup: {
		marginTop: 20,
	},
	signUpButton: {
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
