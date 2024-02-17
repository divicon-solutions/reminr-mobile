import Config from "react-native-config";

export const environment = {
	baseUrl: Config.API_BASE_URL ?? "http://localhost:8080/api/v1",
};
