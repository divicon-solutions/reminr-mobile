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

				{typeof field.value === "string" && field.value.length > 0 && (
					<View style={styles.imageContainer}>
						<Image source={{ uri: field.value }} style={styles.image} />
					</View>
				)}
				<View style={styles.buttonContainer}>
					<Pressable onPress={() => onUpload("gallery")} style={styles.button}>
						<Icon name="image" size={20} />
						<Text>Upload Photo</Text>
					</Pressable>
					<Pressable onPress={() => onUpload("camera")} style={styles.button}>
						<Icon name="camera" size={20} />
						<Text>Take Photo</Text>
					</Pressable>

					{errorText && <HelperText type="error">{errorText}</HelperText>}
				</View>
			</View>
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
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 10,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
	imageContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 10,
	},
	image: {
		width: 100,
		height: 100,
	},
}));
