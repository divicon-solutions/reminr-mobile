import React from "react";
import { useField } from "formik";
import { HelperText } from "react-native-paper";
import { View } from "react-native";
import SelectDropdown, { SelectDropdownProps } from "react-native-select-dropdown";
import { ListDto } from "@utils/constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";

interface SelectFormFieldProps extends Omit<SelectDropdownProps, "onSelect" | "data"> {
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
	const { colors } = useAppTheme();

	return (
		<View style={[styles.container, { height: height }]}>
			<HelperText style={styles.helperText} type="info">
				{label}
			</HelperText>
			<SelectDropdown
				data={items.length === 0 ? [{ value: "", label: "No Options Found" }] : items}
				onSelect={(selectedItem: ListDto) => helpers.setValue(selectedItem.value)}
				defaultValueByIndex={
					field.value ? items.findIndex((item) => item.value === field.value) : undefined
				}
				buttonTextAfterSelection={(selectedItem: ListDto) => selectedItem.label}
				rowTextForSelection={(item: ListDto) => item.label}
				buttonStyle={styles.dropdownBtn}
				buttonTextStyle={styles.dropdownBtnText}
				dropdownIconPosition="right"
				dropdownStyle={styles.dropdown}
				rowStyle={styles.dropdownRow}
				rowTextStyle={styles.dropdownRowText}
				renderDropdownIcon={(isOpened: boolean) => (
					<Icon name={isOpened ? "chevron-up" : "chevron-down"} color={colors.primary2} size={24} />
				)}
				search
				searchPlaceHolder="Search"
				searchInputStyle={styles.searchInput}
				renderSearchInputLeftIcon={() => <Icon name="magnify" size={24} color={colors.primary} />}
				onFocus={() => helpers.setTouched(true)}
				{...props}
			/>
			{errorText && <HelperText type="error">{errorText}</HelperText>}
		</View>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
	},
	dropdown: {
		backgroundColor: theme.colors.backgroundColor,
		borderRadius: 8,
	},
	dropdownBtn: {
		flex: 1,
		width: "100%",
		backgroundColor: theme.colors.backgroundColor,
		borderWidth: 0.5,
		borderRadius: 8,
		borderColor: theme?.colors?.primary2,
	},
	dropdownBtnText: {
		color: theme.dark ? "#fff" : theme?.colors?.primary2,
		fontSize: 14,
		textAlign: "left",
	},
	dropdownRow: {
		backgroundColor: theme.colors.backgroundColor,
		borderBottomColor: "#444",
		borderBottomWidth: 1,
	},
	dropdownRowText: {
		color: theme.dark ? "#fff" : theme?.colors?.primary2,
		textAlign: "left",
		fontSize: 14,
	},
	searchInput: {
		padding: 12,
		borderBottomColor: theme?.colors?.primary1,
		borderBottomWidth: 1,
		borderTopColor: theme?.colors?.primary1,
		borderTopWidth: 1,
		backgroundColor: theme.colors.backgroundColor,
	},
	helperText: {
		color: theme.colors.primary1,
		fontWeight: "bold",
		fontSize: 14,
		marginLeft: -8,
		marginBottom: 1,
	},
}));
