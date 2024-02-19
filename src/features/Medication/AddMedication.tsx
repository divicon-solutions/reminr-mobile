import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Formik } from "formik";
import { Schema, array, number, object, string } from "yup";
import { CreateMedicationDto, useMedicationsControllerCreate } from "@api";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
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

export default function AddMedication() {
	const { mutateAsync } = useMedicationsControllerCreate();

	const onSubmit = async (values: any) => {
		await mutateAsync({ data: values });
	};
	return (
		<SafeAreaView>
			<ScrollView>
				<KeyboardAvoidView>
					<Formik
						initialValues={{
							frequency: "",
							intervalCount: 0,
							intervalUnit: "",
							name: "",
							specificDays: [],
							startDate: new Date(),
						}}
						validationSchema={schema}
						onSubmit={onSubmit}
					>
						{({ handleSubmit, isValid, isSubmitting }) => (
							<View>
								<Text>AddMedication</Text>

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
