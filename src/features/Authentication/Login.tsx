import React from "react";
import { SafeAreaView, View } from "react-native";
import { Formik } from "formik";
import { Schema, object, string } from "yup";
import { TextFormField } from "@components/FormFields/TextFormField";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import { StackNavigationProps } from "@navigations/types";
import { environment } from "@environment/index";

type FormValues = {
	email: string;
	password: string;
};

const schema: Schema<FormValues> = object({
	email: string().email().required(),
	password: string().min(8).required(),
});

type LoginProps = StackNavigationProps<"Login">;
export default function Login({ navigation }: LoginProps) {
	const { signIn } = useAuth();

	const onSubmit = async (values: FormValues) => {
		await signIn(values.email, values.password);
	};

	return (
		<SafeAreaView>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={schema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, isSubmitting, isValid }) => (
					<View>
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
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={isSubmitting || !isValid}
							loading={isSubmitting}
						>
							Login
						</Button>

						<Button mode="text" onPress={() => navigation.navigate("SignUp")}>
							Dont have an account? Sign up {environment.baseUrl}
						</Button>
					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
}
