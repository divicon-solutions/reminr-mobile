import {
	CreateMedicationDto,
	CreateMedicationDtoFrequency,
	CreateMedicationDtoIntervalUnit,
	CreateMedicationDtoSpecificDaysItem,
} from "@api";
import DateFormField from "@components/FormFields/DateFormField";
import { MultiSelectFormField } from "@components/FormFields/MultiSelectFormField";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import { TextFormField } from "@components/FormFields/TextFormField";
import TimeFormField from "@components/FormFields/TimeFormField";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { makeStyles } from "@hooks/makeStyles";
import { snakeCaseToUpperCamelCase } from "@utils/formatters";
import { Formik } from "formik";
import React from "react";
import { View, SafeAreaView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { Schema, object, mixed, number, string, array } from "yup";

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
	time: string().required(),
});

type MedicationFormProps = Readonly<{
	initialValues: CreateMedicationDto;
	isEdit?: boolean;
	onSubmit: (values: CreateMedicationDto) => void;
	onDelete?: () => void;
}>;

export default function MedicationForm({
	initialValues,
	onSubmit,
	isEdit,
	onDelete,
}: MedicationFormProps) {
	const styles = useStyles();

	return (
		<Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
			{({ handleSubmit, isValid, isSubmitting, values }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View style={styles.form}>
						<TextFormField name="name" label="Medication Name" />
						<SelectFormField
							name="frequency"
							label="Frequency"
							items={Object.values(CreateMedicationDtoFrequency).map((value) => ({
								value,
								label: snakeCaseToUpperCamelCase(value),
							}))}
						/>
						{values.frequency === CreateMedicationDtoFrequency.SPECIFIC_DAYS && (
							<MultiSelectFormField
								name="specificDays"
								label="Specific Days"
								items={Object.values(CreateMedicationDtoSpecificDaysItem).map((value) => ({
									value,
									label: snakeCaseToUpperCamelCase(value),
								}))}
							/>
						)}
						{values.frequency === CreateMedicationDtoFrequency.DAYS_INTERVAL && (
							<>
								<SelectFormField
									name="intervalUnit"
									label="Interval Unit"
									items={Object.values(CreateMedicationDtoIntervalUnit).map((value) => ({
										value,
										label: snakeCaseToUpperCamelCase(value),
									}))}
								/>
								<TextFormField name="intervalCount" label="Interval Count" type="number" />
							</>
						)}
						<TextFormField
							name="noOfPills"
							label="No of pills"
							type="number"
							keyboardType="number-pad"
						/>
						<DateFormField name="startDate" label="Start Date" />
						<TimeFormField name="time" label="Time" />
					</View>

					{isEdit ? (
						<SafeAreaView style={styles.submitContainer}>
							<Button mode="contained" style={styles.deleteButton} onPress={onDelete}>
								Delete
							</Button>
							<Button
								mode="contained"
								onPress={() => handleSubmit()}
								disabled={!isValid || isSubmitting}
								loading={isSubmitting}
								style={styles.saveButton}
							>
								Save
							</Button>
						</SafeAreaView>
					) : (
						<SafeAreaView>
							<Button
								mode="contained"
								onPress={() => handleSubmit()}
								disabled={!isValid || isSubmitting}
								loading={isSubmitting}
								style={styles.addMedicationbutton}
							>
								Add Medication
							</Button>
						</SafeAreaView>
					)}
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
	addMedicationbutton: {
		borderRadius: 0,
		alignSelf: "center",
		width: Dimensions.get("window").width / 2,
	},
	saveButton: {
		borderRadius: 0,
		backgroundColor: theme.colors.primary,
		width: Dimensions.get("window").width / 3,
	},
	deleteButton: {
		borderRadius: 0,
		backgroundColor: theme.colors.error,
		width: Dimensions.get("window").width / 3,
	},
	form: {
		gap: 10,
	},
}));
