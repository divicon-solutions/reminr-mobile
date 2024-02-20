import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
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
	intervalCount: number().nullable(),
	intervalUnit: string().nullable(),
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
			<ScrollView style={{ padding: 20 }}>
				<KeyboardAvoidView>
					<Formik
						initialValues={{
							frequency: "",
							intervalCount: null,
							intervalUnit: null,
							name: "",
							specificDays: [],
							startDate: new Date(),
						}}
						validationSchema={schema}
						onSubmit={onSubmit}
					>
						{({ handleSubmit, isValid, isSubmitting }) => (
							<View>
								<TextFormField name="name" label="Medication Name" style={{ height: 40 }} />
								<SelectFormField
									name="frequency"
									label="Frequency"
									items={[{ label: "Daily", value: "DAILY" }]}
								/>
								<TextFormField name="dosage" label="Dose" style={{ height: 40 }} />
								<DateFormField name="startDate" label="Start Date" style={{ height: 40 }} />

								<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
									<Button
										mode="contained"
										onPress={() => handleSubmit()}
										disabled={!isValid || isSubmitting}
										loading={isSubmitting}
										style={{ marginTop: 15, borderRadius: 0, width: 300 }}
									>
										Add Medication
									</Button>
								</View>
							</View>
						)}
					</Formik>
				</KeyboardAvoidView>
			</ScrollView>
		</SafeAreaView>
	);
}
