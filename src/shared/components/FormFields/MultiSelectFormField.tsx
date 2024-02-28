import React, { useEffect, useMemo, useState } from "react";
import { useField } from "formik";
import { HelperText } from "react-native-paper";
import { View } from "react-native";
import { MultipleSelectList, MultipleSelectListProps } from "@components/SelectFields";
import { ListDto } from "@utils/constants";
import { makeStyles } from "@hooks/makeStyles";

interface SelectFormFieldProps
	extends Omit<MultipleSelectListProps, "data" | "setSelected" | "defaultOption"> {
	name: string;
	label: string;
	items: ListDto[];
	height?: number;
}

export function MultiSelectFormField({
	label,
	name,
	items,
	height,
	...props
}: Readonly<SelectFormFieldProps>) {
	const [field, meta, helpers] = useField(name);
	const errorText = meta.error;
	const styles = useStyles();
	const [selected, setSelected] = useState<any[]>(field.value ?? []);

	const data = useMemo(() => {
		return items.map((item) => ({ key: item.value, value: item.label }));
	}, [items]);

	useEffect(() => {
		helpers.setValue(selected);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	const defaultOptions = useMemo(() => {
		return data.filter((item) => field.value?.includes(item.key));
	}, [field.value, data]);

	return (
		<View style={[styles.container, { height: height }]}>
			<HelperText style={styles.helperText} type="info">
				{label}
			</HelperText>
			<MultipleSelectList
				defaultOptions={defaultOptions ?? []}
				setSelected={setSelected}
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
