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
			<ScrollView style={{ padding: 20 }}>
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
								<TextFormField name="name" label="Medication Name" style={{ height: 40 }} />
								<SelectFormField
									name="frequency"
									label="Frequency"
									items={[{ label: "Daily", value: "daily" }]}
								/>
								<TextFormField name="dosage" label="Dose" style={{ height: 40 }} />
								<DateFormField name="startDate" label="Start Date" style={{ height: 40 }} />
								<View
									style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 15 }}
								>
									<Button
										buttonColor="#e34040"
										mode="contained"
										style={{ borderRadius: 0, width: 160 }}
									>
										Delete
									</Button>
									<Button
										mode="contained"
										onPress={() => handleSubmit()}
										disabled={!isValid || isSubmitting}
										loading={isSubmitting}
										style={{ borderRadius: 0, width: 160 }}
									>
										Save Changes
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
