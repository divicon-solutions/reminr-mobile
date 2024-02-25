import { makeStyles } from "@hooks/makeStyles";
import { useField } from "formik";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HelperText, TextInputProps } from "react-native-paper";
import { useImagePicker } from "@hooks/useImagePicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface DateFormFieldProps extends TextInputProps {
	name: string;
}

export default function FileFormField({ label, name }: Readonly<DateFormFieldProps>) {
	const styles = useStyles();
	const [field, meta, helpers] = useField(name);
	const errorText = meta.error;
	const { pickFromGallery, uploadAsset, pickFromCamera } = useImagePicker();

	const onUpload = async (source: "camera" | "gallery") => {
		const response = await (source === "camera" ? pickFromCamera() : pickFromGallery());
		if (!response) {
			return;
		}
		const pathToSave = "inr-tests";
		const uploadResponse = await uploadAsset(response, pathToSave);
		if (uploadResponse) {
			helpers.setValue(uploadResponse.fileUrl);
		}
	};

	return (
		<>
			<View style={styles.container}>
				<HelperText style={styles.helperText} type="info">
					{label}
				</HelperText>

				{field.value && (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
							marginTop: 10,
						}}
					>
						<Image source={{ uri: field.value }} style={{ width: 100, height: 100 }} />
					</View>
				)}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-around",
						marginTop: 10,
					}}
				>
					<Pressable
						onPress={() => onUpload("gallery")}
						style={{ alignItems: "center", justifyContent: "center", gap: 5 }}
					>
						<Icon name="image" size={20} />
						<Text>Upload Photo</Text>
					</Pressable>
					<Pressable
						onPress={() => onUpload("camera")}
						style={{ alignItems: "center", justifyContent: "center", gap: 5 }}
					>
						<Icon name="camera" size={20} />
						<Text>Take Photo</Text>
					</Pressable>

					{errorText && <HelperText type="error">{errorText}</HelperText>}
				</View>
			</View>
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
