import { View, Alert } from "react-native";
import React from "react";
import { useAuth } from "@providers/auth";
import { Formik } from "formik";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText } from "react-native-paper";
import { object, string } from "yup";
import { makeStyles } from "@hooks/makeStyles";
import { StackNavigationProps } from "@navigations/types";
import { AlertService } from "@services/AlertService";

const schema = object({
	oldPassword: string().required(),
	newPassword: string().required(),
	confirmPassword: string().required(),
});

type ChangePasswordProps = StackNavigationProps<"ChangePassword">;

export default function ChangePassword({ navigation }: ChangePasswordProps) {
	const { changePassword } = useAuth();
	const styles = useStyles();

	const [arePasswordsMatching, setArePasswordsMatching] = React.useState(true);

	const initialValues = {
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	};

	const onSubmit = async (values: {
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
	}) => {
		if (values.newPassword !== values.confirmPassword) {
			setArePasswordsMatching(false);
			return;
		}

		setArePasswordsMatching(true);

		try {
			await changePassword(values.oldPassword, values.newPassword);
			AlertService.successMessage("Password changed successfully");
			navigation.goBack();
		} catch (error: any) {
			Alert.alert("Error", error.message);
		}
	};

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View style={styles.form}>
						<TextFormField type="password" name="oldPassword" label="Old Password" />
						<TextFormField type="password" name="newPassword" label="New Password" />
						<TextFormField type="password" name="confirmPassword" label="Confirm Password" />
						{!arePasswordsMatching && (
							<HelperText type="error">New Password and Confirm Password do not match</HelperText>
						)}
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
