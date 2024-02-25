import { useUploadControllerUpload } from "@api";
import { PermissionsAndroid, Platform } from "react-native";
import {
	ImageLibraryOptions,
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary,
} from "react-native-image-picker";

export const useImagePicker = () => {
	const { mutateAsync } = useUploadControllerUpload();

	const uploadAsset = async (
		response: ImagePickerResponse,
		pathToSave: string,
		fileName?: string,
	) => {
		try {
			if (response.didCancel || !response.assets || !response.assets.length) {
				return;
			}
			const file = response.assets[0];
			if (!file.uri) {
				return;
			}
			// FIX ME: This is a workaround to send the file to the backend as blob can't be sent directly
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const blob: any = {
				uri: file.uri,
				type: file.type,
				name: file.fileName,
			};
			const uploadResponse = await mutateAsync({
				data: { file: blob, path: pathToSave, fileName },
			});
			return uploadResponse;
		} catch (error) {
			console.error("[useFilePicker] [uploadAsset] Error: ", error);
			throw error;
		}
	};

	const pickFromGallery = async (options?: ImageLibraryOptions) => {
		try {
			const defaultOptions: ImageLibraryOptions = {
				mediaType: "photo",
				...(options ?? {}),
				selectionLimit: 1,
			};
			const result = await launchImageLibrary(defaultOptions);
			return result;
		} catch (error) {
			console.error("[useFilePicker] [pickFromGallery] Error: ", error);
			throw error;
		}
	};

	const pickFromCamera = async (options?: ImageLibraryOptions) => {
		try {
			const defaultOptions: ImageLibraryOptions = {
				mediaType: "photo",
				...(options ?? {}),
				selectionLimit: 1,
				includeBase64: true,
			};
			if (Platform.OS === "android") {
				await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
					title: "App Camera Permission",
					message: "App needs access to your camera ",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				});
			}
			const result = await launchCamera(defaultOptions);
			return result;
		} catch (error) {
			console.error("[useFilePicker] [pickFromCamera] Error: ", error);
			throw error;
		}
	};

	return { pickFromGallery, pickFromCamera, uploadAsset };
};
