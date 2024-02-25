/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	MutationFunction,
	QueryFunction,
	QueryKey,
	UseMutationOptions,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import type {
	CreateWellnessScoreDto,
	SuccessResponseDto,
	UpdateWellnessScoreDto,
	WellnessScoreDto,
	WellnessScoresControllerCreate201,
	WellnessScoresControllerUpdate200,
} from "./models";
import { mutator } from "./mutators/index";
import type { ErrorType } from "./mutators/index";

export const wellnessScoresControllerCreate = (createWellnessScoreDto: CreateWellnessScoreDto) => {
	return mutator<WellnessScoresControllerCreate201>({
		url: `/api/v1/wellness-scores`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createWellnessScoreDto,
	});
};

export const getWellnessScoresControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerCreate>>,
		TError,
		{ data: CreateWellnessScoreDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof wellnessScoresControllerCreate>>,
	TError,
	{ data: CreateWellnessScoreDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof wellnessScoresControllerCreate>>,
		{ data: CreateWellnessScoreDto }
	> = (props) => {
		const { data } = props ?? {};

		return wellnessScoresControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type WellnessScoresControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof wellnessScoresControllerCreate>>
>;
export type WellnessScoresControllerCreateMutationBody = CreateWellnessScoreDto;
export type WellnessScoresControllerCreateMutationError = ErrorType<unknown>;

export const useWellnessScoresControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerCreate>>,
		TError,
		{ data: CreateWellnessScoreDto },
		TContext
	>;
}) => {
	const mutationOptions = getWellnessScoresControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const wellnessScoresControllerFindAll = (signal?: AbortSignal) => {
	return mutator<WellnessScoreDto[]>({ url: `/api/v1/wellness-scores`, method: "GET", signal });
};

export const getWellnessScoresControllerFindAllQueryKey = () => {
	return [`/api/v1/wellness-scores`] as const;
};

export const getWellnessScoresControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getWellnessScoresControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>> = ({
		signal,
	}) => wellnessScoresControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type WellnessScoresControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>
>;
export type WellnessScoresControllerFindAllQueryError = ErrorType<unknown>;

export const useWellnessScoresControllerFindAll = <
	TData = Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof wellnessScoresControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getWellnessScoresControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const wellnessScoresControllerFindOne = (id: string, signal?: AbortSignal) => {
	return mutator<WellnessScoreDto>({ url: `/api/v1/wellness-scores/${id}`, method: "GET", signal });
};

export const getWellnessScoresControllerFindOneQueryKey = (id: string) => {
	return [`/api/v1/wellness-scores/${id}`] as const;
};

export const getWellnessScoresControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getWellnessScoresControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>> = ({
		signal,
	}) => wellnessScoresControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type WellnessScoresControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>
>;
export type WellnessScoresControllerFindOneQueryError = ErrorType<unknown>;

export const useWellnessScoresControllerFindOne = <
	TData = Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof wellnessScoresControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getWellnessScoresControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const wellnessScoresControllerUpdate = (
	id: string,
	updateWellnessScoreDto: UpdateWellnessScoreDto,
) => {
	return mutator<WellnessScoresControllerUpdate200>({
		url: `/api/v1/wellness-scores/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateWellnessScoreDto,
	});
};

export const getWellnessScoresControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerUpdate>>,
		TError,
		{ id: string; data: UpdateWellnessScoreDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof wellnessScoresControllerUpdate>>,
	TError,
	{ id: string; data: UpdateWellnessScoreDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof wellnessScoresControllerUpdate>>,
		{ id: string; data: UpdateWellnessScoreDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return wellnessScoresControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type WellnessScoresControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof wellnessScoresControllerUpdate>>
>;
export type WellnessScoresControllerUpdateMutationBody = UpdateWellnessScoreDto;
export type WellnessScoresControllerUpdateMutationError = ErrorType<unknown>;

export const useWellnessScoresControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerUpdate>>,
		TError,
		{ id: string; data: UpdateWellnessScoreDto },
		TContext
	>;
}) => {
	const mutationOptions = getWellnessScoresControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const wellnessScoresControllerRemove = (id: string) => {
	return mutator<SuccessResponseDto>({ url: `/api/v1/wellness-scores/${id}`, method: "DELETE" });
};

export const getWellnessScoresControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof wellnessScoresControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof wellnessScoresControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return wellnessScoresControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type WellnessScoresControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof wellnessScoresControllerRemove>>
>;

export type WellnessScoresControllerRemoveMutationError = ErrorType<unknown>;

export const useWellnessScoresControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof wellnessScoresControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}) => {
	const mutationOptions = getWellnessScoresControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
