import { Alert } from "react-native";
import React from "react";
import {
	CreateMedicationDto,
	getMedicationsControllerFindAllQueryKey,
	useMedicationsControllerRemove,
	useMedicationsControllerUpdate,
} from "@api";
import { useQueryClient } from "@tanstack/react-query";
import { StackNavigationProps } from "@navigations/types";
import MedicationForm from "./MedicationForm";

type EditMedicationProps = StackNavigationProps<"EditMedication">;

export default function EditMedication({ navigation, route }: EditMedicationProps) {
	const { medication } = route.params;
	const { mutateAsync } = useMedicationsControllerUpdate();
	const { mutateAsync: deleteMutateAsync } = useMedicationsControllerRemove();

	const queryClient = useQueryClient();

	const onSubmit = async (values: CreateMedicationDto) => {
		await mutateAsync({
			id: medication.id,
			data: { ...values, noOfPills: Number(values.noOfPills) },
		});
		const queryKey = getMedicationsControllerFindAllQueryKey();
		await queryClient.invalidateQueries({ queryKey });
		navigation.goBack();
	};

	const onDelete = async () => {
		Alert.alert("Are you sure?", "You want to delete this medication?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "OK",
				onPress: async () => {
					await deleteMutateAsync({ id: medication.id });
					const queryKey = getMedicationsControllerFindAllQueryKey();
					await queryClient.invalidateQueries({ queryKey });
					navigation.goBack();
				},
			},
		]);
	};

	const initialValues: CreateMedicationDto = medication;

	return (
		<MedicationForm initialValues={initialValues} onSubmit={onSubmit} onDelete={onDelete} isEdit />
	);
}
