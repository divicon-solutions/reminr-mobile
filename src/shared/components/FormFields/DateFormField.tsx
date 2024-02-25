import { makeStyles } from "@hooks/makeStyles";
import { useField } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface DateFormFieldProps extends TextInputProps {
	name: string;
	type?: "text" | "password";
	minimumDate?: Date;
	maximumDate?: Date;
	onDateChange?: (date: Date) => void;
	pickerMode?: "date" | "time" | "datetime";
}

export default function DateFormField({
	label,
	name,
	minimumDate,
	maximumDate,
	onDateChange,
	...props
}: Readonly<DateFormFieldProps>) {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [open, setOpen] = useState(false);
	const styles = useStyles();
	const [field, meta, helpers] = useField(name);
	const errorText = meta.error;

	useEffect(() => {
		setSelectedDate(new Date(field.value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<View style={styles.container}>
				<HelperText style={styles.helperText} type="info">
					{label}
				</HelperText>
				<TextInput
					mode="outlined"
					value={moment(selectedDate).utc().format("MM/DD/YYYY")}
					error={!!errorText}
					outlineStyle={styles.outlineStyle}
					right={<TextInput.Icon icon={"calendar"} onPress={() => setOpen(true)} />}
					{...props}
					editable={false}
				/>
				{errorText && <HelperText type="error">{errorText}</HelperText>}
			</View>
			<DatePicker
				modal
				mode="date"
				open={open}
				date={selectedDate}
				timeZoneOffsetInMinutes={0}
				minimumDate={minimumDate}
				maximumDate={maximumDate}
				onConfirm={(date) => {
					setOpen(false);
					const utcDate = moment(date).utc().format("YYYY-MM-DD");
					setSelectedDate(date);
					onDateChange?.(date);
					helpers.setValue(utcDate + "T00:00:00.000Z");
				}}
				onCancel={() => setOpen(false)}
			/>
		</>
	);
}

const useStyles = makeStyles(() => ({
	container: {
		width: "100%",
	},
	helperText: {
		fontWeight: "bold",
		fontSize: 14,
		marginLeft: -8,
		marginBottom: 1,
	},
	outlineStyle: {
		borderRadius: 8,
		borderWidth: 0.5,
	},
}));
