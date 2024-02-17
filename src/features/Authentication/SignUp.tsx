import React from "react";
import { SafeAreaView, View } from "react-native";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { TextFormField } from "@components/FormFields/TextFormField";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { CreateUserDto } from "@api";

type FormValues = CreateUserDto & {
	password: string;
	confirmPassword: string;
};

const schema: Schema<FormValues> = object({
	email: string().email().required(),
	fullName: string().required(),
	password: string().min(8).required(),
	confirmPassword: string()
		.required()
		.test({
			name: "passwords-match",
			message: "Passwords must match",
			test: function (value) {
				return this.parent.password === value;
			},
		}),
});

export default function Login() {
	const { signUp } = useAuth();

	const onSubmit = async ({ confirmPassword: _, ...values }: FormValues) => {
		await signUp(values);
	};

	return (
		<SafeAreaView>
			<Formik
				initialValues={{ email: "", password: "", confirmPassword: "", fullName: "" }}
				validationSchema={schema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, isSubmitting, isValid }) => (
					<View>
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
							secureTextEntry
							textContentType="password"
						/>
						<TextFormField
							name="confirmPassword"
							label="Confirm Password"
							secureTextEntry
							textContentType="password"
						/>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={isSubmitting || !isValid}
							loading={isSubmitting}
						>
							Sign Up
						</Button>
					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
}
