import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Schema, array, number, object, string } from "yup";
import { MedicationDto, UpdateMedicationDto, useMedicationsControllerUpdate } from "@api";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { TextFormField } from "@components/FormFields/TextFormField";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import DateFormField from "@components/FormFields/DateFormField";
import { Button } from "react-native-paper";

const schema: Schema = object({
	frequency: string().required(),
	intervalCount: number(),
	intervalUnit: string(),
	name: string().required(),
	specificDays: array(),
	startDate: string().required(),
});

type EditMedcationProps = {
	route: {
		params: {
			item: MedicationDto;
		};
	};
};

export default function EditMedication(props: EditMedcationProps) {
	const { item } = props.route.params;
	const { mutateAsync } = useMedicationsControllerUpdate();

	const onSubmit = async (values: UpdateMedicationDto) => {
		await mutateAsync({ id: item.id, data: values });
	};
	return (
		<SafeAreaView>
			<ScrollView>
				<KeyboardAvoidView>
					<Formik
						initialValues={{
							frequency: item.frequency,
							intervalCount: item.intervalCount,
							intervalUnit: item.intervalUnit,
							name: item.name,
							specificDays: item.specificDays,
							startDate: item.startDate,
						}}
						validationSchema={schema}
						onSubmit={onSubmit}
					>
						{({ handleSubmit, isValid, isSubmitting }) => (
							<View>
								<Text>Edit Medication</Text>

								<TextFormField name="name" label="Medication Name" />
								<SelectFormField
									name="frequency"
									label="Frequency"
									items={[{ label: "Daily", value: "daily" }]}
								/>
								<DateFormField name="startDate" label="Start Date" />

								<Button
									mode="contained"
									onPress={() => handleSubmit()}
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								>
									Add Medication
								</Button>
							</View>
						)}
					</Formik>
				</KeyboardAvoidView>
			</ScrollView>
		</SafeAreaView>
	);
}
