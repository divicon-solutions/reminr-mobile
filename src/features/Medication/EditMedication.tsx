import { View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import { Formik } from "formik";
import { Schema, array, mixed, number, object, string } from "yup";
import {
	CreateMedicationDto,
	CreateMedicationDtoFrequency,
	CreateMedicationDtoIntervalUnit,
	CreateMedicationDtoSpecificDaysItem,
	MedicationDto,
	getMedicationsControllerFindAllQueryKey,
	useMedicationsControllerRemove,
	useMedicationsControllerUpdate,
} from "@api";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import DateFormField from "@components/FormFields/DateFormField";
import { Button, IconButton } from "react-native-paper";
import { makeStyles } from "@hooks/makeStyles";
import { useQueryClient } from "@tanstack/react-query";

const schema: Schema<CreateMedicationDto> = object({
	frequency: mixed<CreateMedicationDtoFrequency>()
		.oneOf(Object.values(CreateMedicationDtoFrequency))
		.required(),
	intervalCount: number().nullable(),
	intervalUnit: mixed<NonNullable<CreateMedicationDtoIntervalUnit>>()
		.oneOf(Object.values(CreateMedicationDtoIntervalUnit))
		.nullable(),
	name: string().required(),
	specificDays: array()
		.of(
			mixed<CreateMedicationDtoSpecificDaysItem>()
				.oneOf(Object.values(CreateMedicationDtoSpecificDaysItem))
				.required(),
		)
		.required(),
	dosage: string(),
	noOfPills: number().required(),
	startDate: string().required(),
});

type EditMedicationProps = Readonly<{
	hideModal: () => void;
	medication: MedicationDto;
}>;

export default function EditMedication({ hideModal, medication }: EditMedicationProps) {
	const { mutateAsync } = useMedicationsControllerUpdate();
	const { mutateAsync: deleteMutateAsync } = useMedicationsControllerRemove();

	const styles = useStyles();

	const queryClient = useQueryClient();

	const onSubmit = async (values: CreateMedicationDto) => {
		await mutateAsync({ id: medication.id, data: values });
		const queryKey = getMedicationsControllerFindAllQueryKey();
		hideModal();
		await queryClient.invalidateQueries({ queryKey });
	};

	const onDelete = async () => {
		await deleteMutateAsync({ id: medication.id });
		const queryKey = getMedicationsControllerFindAllQueryKey();
		hideModal();
		await queryClient.invalidateQueries({ queryKey });
	};

	const initialValues: CreateMedicationDto = medication;

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View>
						<IconButton style={styles.closeButton} icon="close" onPress={hideModal} />
						<TextFormField name="name" label="Medication Name" />
						<SelectFormField
							name="frequency"
							label="Frequency"
							items={Object.values(CreateMedicationDtoFrequency).map((value) => ({
								value,
								label: value,
							}))}
						/>
						<TextFormField name="dosage" label="Dose" />
						<DateFormField name="startDate" label="Start Date" />
					</View>

					<SafeAreaView style={styles.submitContainer}>
						<Button mode="contained" style={styles.deleteButton} onPress={onDelete}>
							Delete
						</Button>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid || isSubmitting}
							loading={isSubmitting}
							style={styles.buttonStyle}
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
	buttonStyle: {
		borderRadius: 0,
		alignSelf: "center",
		width: Dimensions.get("window").width / 3,
	},
	deleteButton: {
		borderRadius: 0,
		backgroundColor: theme.colors.error,
		width: Dimensions.get("window").width / 3,
	},
}));
