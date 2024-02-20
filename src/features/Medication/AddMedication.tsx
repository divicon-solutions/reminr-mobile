import { View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import { Formik } from "formik";
import { Schema, array, mixed, number, object, string } from "yup";
import {
	CreateMedicationDto,
	CreateMedicationDtoFrequency,
	CreateMedicationDtoIntervalUnit,
	CreateMedicationDtoSpecificDaysItem,
	getMedicationsControllerFindAllQueryKey,
	useMedicationsControllerCreate,
} from "@api";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import DateFormField from "@components/FormFields/DateFormField";
import { Button, IconButton } from "react-native-paper";
import { getCurrentUtcTimestamp } from "@utils/formatters";
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

type AddMedicationProps = Readonly<{
	hideModal: () => void;
}>;
export default function AddMedication({ hideModal }: AddMedicationProps) {
	const { mutateAsync } = useMedicationsControllerCreate();
	const styles = useStyles();

	const queryClient = useQueryClient();

	const onSubmit = async (values: CreateMedicationDto) => {
		await mutateAsync({ data: values });
		const queryKey = getMedicationsControllerFindAllQueryKey();
		hideModal();
		await queryClient.invalidateQueries({ queryKey });
	};

	const initialValues: CreateMedicationDto = {
		noOfPills: 0,
		frequency: CreateMedicationDtoFrequency.DAILY,
		name: "",
		startDate: getCurrentUtcTimestamp(),
		specificDays: [],
	};

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
						<TextFormField
							name="noOfPills"
							label="No of pills"
							type="number"
							keyboardType="number-pad"
						/>
						<DateFormField name="startDate" label="Start Date" />
					</View>

					<SafeAreaView>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid || isSubmitting}
							loading={isSubmitting}
							style={styles.buttonStyle}
						>
							Add Medication
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
	buttonStyle: {
		borderRadius: 0,
		width: Dimensions.get("window").width / 2,
		alignSelf: "center",
	},
}));
