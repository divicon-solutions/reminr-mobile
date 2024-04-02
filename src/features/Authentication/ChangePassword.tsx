import { View } from "react-native";
import React from "react";
import { useAuth } from "@providers/auth";
import { Formik } from "formik";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { object, ref, string } from "yup";
import { makeStyles } from "@hooks/makeStyles";
import { StackNavigationProps } from "@navigations/types";
import { AlertService } from "@services/AlertService";

const initialValues = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
};

const schema = object({
	oldPassword: string().required("Old password is required"),
	newPassword: string()
		.required("New password is required")
		.min(8, "Password must be at least 8 characters long"),
	confirmPassword: string()
		.required("Confirm password is required")
		.oneOf([ref("newPassword")], "Passwords do not match"),
});

type FormValues = typeof initialValues;

type ChangePasswordProps = StackNavigationProps<"ChangePassword">;

export default function ChangePassword({ navigation }: ChangePasswordProps) {
	const { changePassword } = useAuth();
	const styles = useStyles();

	const onSubmit = async (values: FormValues) => {
		try {
			await changePassword(values.oldPassword, values.newPassword);
			AlertService.successMessage("Password changed successfully");
			navigation.goBack();
		} catch (error: any) {
			console.error(error);
			AlertService.errorMessage(error.message);
		}
	};

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View style={styles.form}>
						<TextFormField type="password" name="oldPassword" label="Current Password" />
						<TextFormField type="password" name="newPassword" label="New Password" />
						<TextFormField type="password" name="confirmPassword" label="Confirm Password" />
					</View>
					<SafeAreaView>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid || isSubmitting}
						>
							Change Password
						</Button>
					</SafeAreaView>
				</KeyboardAvoidView>
			)}
		</Formik>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		padding: 10,
		backgroundColor: theme.colors.background,
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	containerStyle: {
		flexGrow: 1,
		justifyContent: "space-between",
	},
	submitContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
	},
	form: {
		gap: 10,
	},
}));
