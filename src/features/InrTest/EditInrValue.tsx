import { View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import {
	CreateInrTestDto,
	getInrTestControllerFindAllQueryKey,
	useInrTestControllerRemove,
	useInrTestControllerUpdate,
} from "@api";
import { Schema, number, object, string } from "yup";
import { Formik } from "formik";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import DateFormField from "@components/FormFields/DateFormField";
import { Button } from "react-native-paper";
import { makeStyles } from "@hooks/makeStyles";
import { useQueryClient } from "@tanstack/react-query";
import FileFormField from "@components/FormFields/FileFormField";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";

const schema: Schema<CreateInrTestDto> = object({
	date: string().required(),
	inrValue: number().required(),
	remarks: string().nullable(),
	verificationImage: string().nullable(),
	userId: string().required(),
});

type EditInrValueProps = StackNavigationProps<"EditInrValue">;
export default function EditInrValue({ route, navigation }: EditInrValueProps) {
	const { inrTest } = route.params;
	const { user } = useAuth();
	const { mutateAsync } = useInrTestControllerUpdate();
	const { mutateAsync: deleteMutateAsync } = useInrTestControllerRemove();
	const styles = useStyles();
	const queryClient = useQueryClient();

	const initialValues: CreateInrTestDto = {
		date: inrTest.date,
		inrValue: inrTest.inrValue,
		remarks: inrTest.remarks,
		verificationImage: inrTest.verificationImage,
		userId: user?.uid ?? "",
	};

	const onSubmit = async (values: CreateInrTestDto) => {
		await mutateAsync({ id: inrTest.id, data: { ...values, inrValue: Number(values.inrValue) } });
		const queryKey = getInrTestControllerFindAllQueryKey();
		queryClient.invalidateQueries({ queryKey });
		navigation.goBack();
	};

	const onDelete = async () => {
		await deleteMutateAsync({ id: inrTest.id });
		const queryKey = getInrTestControllerFindAllQueryKey();
		queryClient.invalidateQueries({ queryKey });
		navigation.goBack();
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.root} contentContainerStyle={styles.content}>
					<View style={styles.form}>
						<TextFormField
							label="INR Value"
							name="inrValue"
							type="number"
							keyboardType="decimal-pad"
						/>
						<DateFormField label="Date" name="date" />
						<TextFormField label="Remarks" name="remarks" />
						<FileFormField label="Verification Image" name="verificationImage" />
					</View>
					<SafeAreaView style={styles.submitContainer}>
						<Button mode="contained" style={styles.deleteButton} onPress={onDelete}>
							Delete
						</Button>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid}
							loading={isSubmitting}
							style={styles.addInrButton}
						>
							Save Changes
						</Button>
					</SafeAreaView>
				</KeyboardAvoidView>
			)}
		</Formik>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		backgroundColor: theme.colors.background,
	},
	form: {
		flexDirection: "column",
		gap: 10,
	},
	content: {
		flexGrow: 1,
		justifyContent: "space-between",
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	addInrButton: {
		width: Dimensions.get("window").width / 2.5,
		alignSelf: "center",
		borderRadius: 0,
	},
	deleteButton: {
		borderRadius: 0,
		backgroundColor: theme.colors.error,
		width: Dimensions.get("window").width / 2.5,
	},
	submitContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		gap: 10,
	},
}));
