import { View, SafeAreaView } from "react-native";
import React from "react";
import { Schema, string, object } from "yup";
import { UpdateUserDto, useUsersControllerFindOne, useUsersControllerUpdate } from "@api";
import { StackNavigationProps } from "@navigations/types";
import { Formik } from "formik";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { makeStyles } from "@hooks/makeStyles";
import { TextFormField } from "@components/FormFields/TextFormField";
import { Button } from "react-native-paper";
import { useAuth } from "@providers/auth";
import Loader from "@components/Loader";

// Email, fullname, phone number

const schema: Schema<UpdateUserDto> = object({
	fullName: string().required(),
	phoneNumber: string().nullable(),
});

type AccountProps = StackNavigationProps<"Account">;

export default function Account({ navigation }: AccountProps) {
	const { user } = useAuth();
	const { mutateAsync } = useUsersControllerUpdate();
	const { data, isLoading, refetch } = useUsersControllerFindOne(user?.uid || "");
	const styles = useStyles();
	const initialValues: UpdateUserDto = {
		fullName: data?.fullName || "", // Provide a default value for fullName
		phoneNumber: data?.phoneNumber,
		email: data?.email,
	};

	const onSubmit = async (values: UpdateUserDto) => {
		await mutateAsync({
			id: user?.uid || "",
			data: {
				fullName: values.fullName,
				phoneNumber: values.phoneNumber,
			},
		});
		navigation.goBack();

		await refetch();
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View style={styles.form}>
						<TextFormField name="fullName" label="Full Name" />
						<TextFormField disabled name="email" label="Email" />
						<TextFormField name="phoneNumber" label="Phone Number" />
					</View>
					<SafeAreaView>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid || isSubmitting}
						>
							Save
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
