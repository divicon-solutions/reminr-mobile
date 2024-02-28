import { makeStyles } from "@hooks/makeStyles";
import { useField } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface TimeFormFieldProps extends TextInputProps {
	name: string;
	type?: "text" | "password";
	minimumDate?: Date;
	maximumDate?: Date;
	onDateChange?: (date: Date) => void;
	pickerMode?: "date" | "time" | "datetime";
}

export default function TimeFormField({
	label,
	name,
	minimumDate,
	maximumDate,
	onDateChange,
	...props
}: Readonly<TimeFormFieldProps>) {
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
					value={moment(selectedDate).utc().format("hh:mm A")}
					error={!!errorText}
					outlineStyle={styles.outlineStyle}
					right={
						<TextInput.Icon icon={"clock-time-eleven-outline"} onPress={() => setOpen(true)} />
					}
					{...props}
					editable={false}
				/>
				{errorText && <HelperText type="error">{errorText}</HelperText>}
			</View>
			<DatePicker
				modal
				mode="time"
				open={open}
				date={selectedDate}
				timeZoneOffsetInMinutes={0}
				minimumDate={minimumDate}
				maximumDate={maximumDate}
				onConfirm={(date) => {
					const utcDate = moment(date).utc().format("HH:mm");
					setSelectedDate(date);
					onDateChange?.(date);
					helpers.setValue("1970-01-01T" + utcDate + ":00.000Z");
				}}
				onCancel={() => setOpen(false)}
			/>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
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
		backgroundColor: theme.colors.onPrimary,
	},
}));
