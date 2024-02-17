import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { http } from "@services/InterceptorService";

export const mutator = <T>(config: AxiosRequestConfig): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = http({ ...config, cancelToken: source.token }).then(({ data }) => data);

	// @ts-ignore
	promise.cancel = () => {
		source.cancel("Query was cancelled by React Query");
	};

	return promise;
};

export default mutator;

export interface ErrorType<Error> extends AxiosError<Error> {}
