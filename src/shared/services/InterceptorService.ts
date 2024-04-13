import axios, { AxiosInstance } from "axios";
import { AlertService } from "./AlertService";
import { LoaderService } from "./LoaderService";
import { environment } from "@environment";
import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";

class InterceptorService {
	private _axiosInstance: AxiosInstance;

	constructor(http: AxiosInstance) {
		this._axiosInstance = http;
	}

	private async authTokenGetter() {
		const idToken = await auth().currentUser?.getIdToken();
		return idToken;
	}

	addRequestInterceptor(): this {
		this._axiosInstance.interceptors.request.use(
			async (config) => {
				if (["post", "put", "delete"].includes(config.method || "")) {
					if (!config.url?.includes("search")) {
						LoaderService.showLoader();
					}
				}
				const authToken = await this.authTokenGetter();
				if (authToken) {
					config.headers.Authorization = `Bearer ${authToken}`;
				}
				console.log(
					`[InterceptorService] calling with ${authToken ? "auth" : "no auth"} token`,
					config.url,
					config.method,
					config.method === "get" ? { params: config.params } : { data: config.data },
				);
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
		return this;
	}

	addResponseInterceptor(): this {
		this._axiosInstance.interceptors.response.use(
			(response) => {
				console.log(
					"[InterceptorService] response",
					response.config.url,
					response.config.method,
					response.status,
				);
				if (["post", "put", "delete"].includes(response.config.method || "")) {
					if (response.data?.message) {
						AlertService.successMessage(response.data.message);
					}
				}
				if (!response.config.url?.includes("search")) {
					LoaderService.hideLoader();
				}
				return response;
			},
			(error) => {
				if (error.toString().includes("CanceledError")) {
					return Promise.reject(error);
				}
				if (!error.response?.config?.headers?.Authorization) {
					// if the request was made without an auth token, then no need to show the error
					return Promise.reject(error);
				}
				crashlytics().recordError(new Error(error));
				console.error("[InterceptorService] error", error);
				if (error.response) {
					console.error("[InterceptorService] error.response", error.response.data);
				}
				// check the error status code
				if (error.response?.status === 413) {
					AlertService.errorMessage("File too large, please upload a smaller file");
				}

				if (![401, 404, 500].includes(error.response?.status || 0)) {
					const message = error.response?.data?.message;
					if (message) {
						AlertService.errorMessage(message);
					}
				}
				LoaderService.hideLoader();
				return Promise.reject(error);
			},
		);
		return this;
	}
}

const http = axios.create({ baseURL: environment.baseUrl });
const interceptor = new InterceptorService(http);
interceptor.addRequestInterceptor().addResponseInterceptor();

export { http, interceptor };
