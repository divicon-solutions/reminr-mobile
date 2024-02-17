import axios, { AxiosInstance } from "axios";
import { AlertService } from "./AlertService";
import { LoaderService } from "./LoaderService";
import { environment } from "@environment";

class InterceptorService {
	private _axiosInstance: AxiosInstance;
	private authTokenGetter: () => Promise<string | null> = () => Promise.resolve(null);
	private _userId: string | null = null;

	constructor(http: AxiosInstance) {
		this._axiosInstance = http;
	}

	setAuthTokenGetter(arg0: (() => Promise<string | null>) | undefined) {
		if (arg0) {
			this.authTokenGetter = arg0;
		}
	}

	getAuthToken() {
		return this.authTokenGetter();
	}

	setUserId(arg0: string | null) {
		this._userId = arg0;
	}

	addRequestInterceptor(): this {
		this._axiosInstance.interceptors.request.use(
			async (config) => {
				console.log(
					"[InterceptorService] calling",
					config.url,
					config.method,
					config.method === "get" ? config.params : config.data,
				);
				if (["post", "put", "delete"].includes(config.method || "")) {
					if (!config.url?.includes("search")) {
						LoaderService.showLoader();
					}
				}
				const authToken = await this.authTokenGetter();
				if (authToken) {
					config.headers.Authorization = `Bearer ${authToken}`;
				}
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
