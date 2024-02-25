import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import { useField } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

interface DateFormFieldProps extends TextInputProps {
	name: string;
	type?: "text" | "password";
	minimumDate?: Date;
	maximumDate?: Date;
	onDateChange?: (date: Date) => void;
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
	const { colors } = useAppTheme();

	return (
		<>
			<View style={styles.container}>
				<HelperText style={styles.helperText} type="info">
					{label}
				</HelperText>
				<TextInput
					mode="outlined"
					textColor={colors.primary2}
					value={moment(selectedDate).utc().format("MM/DD/YYYY")}
					onChangeText={(value: string) => {
						const utcDate = moment(value).utc().format("YYYY-MM-DD");
						setSelectedDate(new Date(utcDate));
						onDateChange?.(new Date(utcDate));
						helpers.setValue(utcDate + "T00:00:00.000Z");
					}}
					error={!!errorText}
					outlineStyle={styles.outlineStyle}
					right={
						<TextInput.Icon
							icon={"calendar"}
							color={colors.primary2}
							onPress={() => setOpen(true)}
						/>
					}
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

const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
	},
	helperText: {
		color: theme.colors.primary1,
		fontWeight: "bold",
		fontSize: 14,
		marginLeft: -8,
		marginBottom: 1,
	},
	outlineStyle: {
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: theme.colors.primary2,
	},
}));
