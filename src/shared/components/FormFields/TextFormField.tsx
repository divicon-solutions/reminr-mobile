import React, { useState } from "react";
import { useField } from "formik";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { View } from "react-native";
import { makeStyles } from "@hooks/makeStyles";

interface TextFormFieldProps extends TextInputProps {
	name: string;
	type?: "text" | "password";
}

export function TextFormField({ label, name, type, ...props }: Readonly<TextFormFieldProps>) {
	const [field, meta, helpers] = useField(name);
	const errorText = meta.error;
	const [hidePassword, setHidePassword] = useState(true);
	const handleClickHidePassword = () => setHidePassword((hide) => !hide);
	const styles = useStyles();

	return (
		<View style={[styles.container]}>
			<HelperText style={[styles.helperText]} type="info">
				{label}
			</HelperText>
			<TextInput
				mode="outlined"
				value={field.value}
				onChangeText={(value: string) => helpers.setValue(value)}
				error={!!errorText}
				secureTextEntry={hidePassword && type === "password"}
				right={
					type === "password" && (
						<TextInput.Icon
							icon={hidePassword ? "eye" : "eye-off"}
							onPress={handleClickHidePassword}
						/>
					)
				}
				outlineStyle={styles.outlineStyle}
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
	helperText: {
		color: theme.colors.primary1,
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: -8,
		marginBottom: 1,
	},
	outlineStyle: {
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: theme.colors.primary2,
	},
}));
