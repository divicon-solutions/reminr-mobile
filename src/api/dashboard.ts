/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
	QueryFunction,
	QueryKey,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import type { AdminDashboardDataDto, DashboardDataDto } from "./models";
import { mutator } from "./mutators/index";
import type { ErrorType } from "./mutators/index";

export const dashboardControllerGetDashboardData = (id: string, signal?: AbortSignal) => {
	return mutator<DashboardDataDto>({
		url: `/v1/dashboard/member-data/${id}`,
		method: "GET",
		signal,
	});
};

export const getDashboardControllerGetDashboardDataQueryKey = (id: string) => {
	return [`/v1/dashboard/member-data/${id}`] as const;
};

export const getDashboardControllerGetDashboardDataQueryOptions = <
	TData = Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<
				Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>,
				TError,
				TData
			>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDashboardControllerGetDashboardDataQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>> = ({
		signal,
	}) => dashboardControllerGetDashboardData(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type DashboardControllerGetDashboardDataQueryResult = NonNullable<
	Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>
>;
export type DashboardControllerGetDashboardDataQueryError = ErrorType<unknown>;

export const useDashboardControllerGetDashboardData = <
	TData = Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<
				Awaited<ReturnType<typeof dashboardControllerGetDashboardData>>,
				TError,
				TData
			>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getDashboardControllerGetDashboardDataQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const dashboardControllerGetAdminDashboardData = (signal?: AbortSignal) => {
	return mutator<AdminDashboardDataDto[]>({
		url: `/v1/dashboard/admin-data`,
		method: "GET",
		signal,
	});
};

export const getDashboardControllerGetAdminDashboardDataQueryKey = () => {
	return [`/v1/dashboard/admin-data`] as const;
};

export const getDashboardControllerGetAdminDashboardDataQueryOptions = <
	TData = Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<
			Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>,
			TError,
			TData
		>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDashboardControllerGetAdminDashboardDataQueryKey();

	const queryFn: QueryFunction<
		Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>
	> = ({ signal }) => dashboardControllerGetAdminDashboardData(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type DashboardControllerGetAdminDashboardDataQueryResult = NonNullable<
	Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>
>;
export type DashboardControllerGetAdminDashboardDataQueryError = ErrorType<unknown>;

export const useDashboardControllerGetAdminDashboardData = <
	TData = Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<
			Awaited<ReturnType<typeof dashboardControllerGetAdminDashboardData>>,
			TError,
			TData
		>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getDashboardControllerGetAdminDashboardDataQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};
