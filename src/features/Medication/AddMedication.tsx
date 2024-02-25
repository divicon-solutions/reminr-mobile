import React from "react";
import {
	CreateMedicationDto,
	CreateMedicationDtoFrequency,
	getMedicationsControllerFindAllQueryKey,
	useMedicationsControllerCreate,
} from "@api";
import { getCurrentUtcTimestamp, getCurrentUtcTimestampWithTimeOnly } from "@utils/formatters";
import { useQueryClient } from "@tanstack/react-query";
import { StackNavigationProps } from "@navigations/types";
import MedicationForm from "./MedicationForm";

type AddMedicationProps = StackNavigationProps<"AddMedication">;

export default function AddMedication({ navigation }: AddMedicationProps) {
	const { mutateAsync } = useMedicationsControllerCreate();

	const queryClient = useQueryClient();

	const onSubmit = async (values: CreateMedicationDto) => {
		await mutateAsync({ data: { ...values, noOfPills: Number(values.noOfPills) } });
		const queryKey = getMedicationsControllerFindAllQueryKey();
		await queryClient.invalidateQueries({ queryKey });
		navigation.goBack();
	};

	const initialValues: CreateMedicationDto = {
		noOfPills: 0,
		frequency: CreateMedicationDtoFrequency.DAILY,
		name: "",
		startDate: getCurrentUtcTimestamp(),
		specificDays: [],
		time: getCurrentUtcTimestampWithTimeOnly(),
	};

	return <MedicationForm initialValues={initialValues} onSubmit={onSubmit} />;
}
