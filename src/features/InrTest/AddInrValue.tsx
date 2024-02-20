import { View, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import {
	CreateInrTestDto,
	getInrTestControllerFindAllQueryKey,
	useInrTestControllerCreate,
} from "@api";
import { Schema, number, object, string } from "yup";
import { Formik } from "formik";
import { getCurrentUtcTimestamp } from "@utils/formatters";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { TextFormField } from "@components/FormFields/TextFormField";
import DateFormField from "@components/FormFields/DateFormField";
import { Button, IconButton } from "react-native-paper";
import { makeStyles } from "@hooks/makeStyles";
import { useQueryClient } from "@tanstack/react-query";

const schema: Schema<CreateInrTestDto> = object({
	date: string().required(),
	inrValue: number().required(),
	remarks: string().nullable(),
	verificationImage: string().nullable(),
});

type AddInrValueProps = Readonly<{
	hideModal: () => void;
}>;
export default function AddInrValue({ hideModal }: AddInrValueProps) {
	const { mutateAsync } = useInrTestControllerCreate();
	const styles = useStyles();
	const queryClient = useQueryClient();

	const initialValues: CreateInrTestDto = {
		date: getCurrentUtcTimestamp(),
		inrValue: 0,
		remarks: null,
		verificationImage: null,
	};

	const onSubmit = async (values: CreateInrTestDto) => {
		await mutateAsync({ data: { ...values, inrValue: Number(values.inrValue) } });
		const queryKey = getInrTestControllerFindAllQueryKey();
		queryClient.invalidateQueries({ queryKey });
		hideModal();
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
			{({ handleSubmit, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.root} contentContainerStyle={styles.content}>
					<View style={styles.form}>
						<IconButton style={styles.closeButton} icon="close" onPress={hideModal} />
						<TextFormField
							label="INR Value"
							name="inrValue"
							type="number"
							keyboardType="number-pad"
						/>
						<DateFormField label="Date" name="date" />
						<TextFormField label="Remarks" name="remarks" />
					</View>
					<SafeAreaView>
						<Button
							mode="contained"
							onPress={() => handleSubmit()}
							disabled={!isValid}
							loading={isSubmitting}
							style={styles.addInrButton}
						>
							Add Inr Value
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
		width: Dimensions.get("window").width / 2,
		alignSelf: "center",
		borderRadius: 0,
	},
}));
