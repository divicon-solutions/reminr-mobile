import React, { useMemo } from "react";
import { useField } from "formik";
import { HelperText } from "react-native-paper";
import { View } from "react-native";
import { SelectList, SelectListProps } from "@components/SelectFields";
import { ListDto } from "@utils/constants";
import { makeStyles } from "@hooks/makeStyles";

interface SelectFormFieldProps
	extends Omit<SelectListProps, "data" | "setSelected" | "defaultOption"> {
	name: string;
	label: string;
	items: ListDto[];
	height?: number;
}

export function SelectFormField({
	label,
	name,
	items,
	height,
	...props
}: Readonly<SelectFormFieldProps>) {
	const [field, meta, helpers] = useField(name);
	const errorText = meta.error;
	const styles = useStyles();

	const data = useMemo(() => {
		return items.map((item) => ({ key: item.value, value: item.label }));
	}, [items]);

	const defaultOption = useMemo(() => {
		return data.find((item) => item.key === field.value);
	}, [data, field.value]);

	return (
		<View style={[styles.container, { height: height }]}>
			<HelperText style={styles.helperText} type="info">
				{label}
			</HelperText>
			<SelectList
				defaultOption={defaultOption}
				setSelected={(value: string) => helpers.setValue(value)}
				data={data}
				boxStyles={{ backgroundColor: "white" }}
				dropdownStyles={{ backgroundColor: "white" }}
				{...props}
			/>
			{errorText && <HelperText type="error">{errorText}</HelperText>}
		</View>
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
}));
