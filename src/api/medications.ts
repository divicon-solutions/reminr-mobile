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
	CreateMedicationDto,
	MedicationDto,
	MedicationsControllerCreate201,
	MedicationsControllerFindAllParams,
	MedicationsControllerUpdate200,
	SuccessResponseDto,
	UpdateMedicationDto,
} from "./models";
import { mutator } from "./mutators/index";
import type { ErrorType } from "./mutators/index";

export const medicationsControllerCreate = (createMedicationDto: CreateMedicationDto) => {
	return mutator<MedicationsControllerCreate201>({
		url: `/api/v1/medications`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createMedicationDto,
	});
};

export const getMedicationsControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerCreate>>,
		TError,
		{ data: CreateMedicationDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof medicationsControllerCreate>>,
	TError,
	{ data: CreateMedicationDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof medicationsControllerCreate>>,
		{ data: CreateMedicationDto }
	> = (props) => {
		const { data } = props ?? {};

		return medicationsControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MedicationsControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof medicationsControllerCreate>>
>;
export type MedicationsControllerCreateMutationBody = CreateMedicationDto;
export type MedicationsControllerCreateMutationError = ErrorType<unknown>;

export const useMedicationsControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerCreate>>,
		TError,
		{ data: CreateMedicationDto },
		TContext
	>;
}) => {
	const mutationOptions = getMedicationsControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const medicationsControllerFindAll = (
	params?: MedicationsControllerFindAllParams,
	signal?: AbortSignal,
) => {
	return mutator<MedicationDto[]>({ url: `/api/v1/medications`, method: "GET", params, signal });
};

export const getMedicationsControllerFindAllQueryKey = (
	params?: MedicationsControllerFindAllParams,
) => {
	return [`/api/v1/medications`, ...(params ? [params] : [])] as const;
};

export const getMedicationsControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof medicationsControllerFindAll>>,
	TError = ErrorType<unknown>,
>(
	params?: MedicationsControllerFindAllParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof medicationsControllerFindAll>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMedicationsControllerFindAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof medicationsControllerFindAll>>> = ({
		signal,
	}) => medicationsControllerFindAll(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof medicationsControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MedicationsControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof medicationsControllerFindAll>>
>;
export type MedicationsControllerFindAllQueryError = ErrorType<unknown>;

export const useMedicationsControllerFindAll = <
	TData = Awaited<ReturnType<typeof medicationsControllerFindAll>>,
	TError = ErrorType<unknown>,
>(
	params?: MedicationsControllerFindAllParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof medicationsControllerFindAll>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getMedicationsControllerFindAllQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const medicationsControllerFindOne = (id: string, signal?: AbortSignal) => {
	return mutator<MedicationDto>({ url: `/api/v1/medications/${id}`, method: "GET", signal });
};

export const getMedicationsControllerFindOneQueryKey = (id: string) => {
	return [`/api/v1/medications/${id}`] as const;
};

export const getMedicationsControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof medicationsControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof medicationsControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMedicationsControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof medicationsControllerFindOne>>> = ({
		signal,
	}) => medicationsControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof medicationsControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MedicationsControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof medicationsControllerFindOne>>
>;
export type MedicationsControllerFindOneQueryError = ErrorType<unknown>;

export const useMedicationsControllerFindOne = <
	TData = Awaited<ReturnType<typeof medicationsControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof medicationsControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getMedicationsControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const medicationsControllerUpdate = (
	id: string,
	updateMedicationDto: UpdateMedicationDto,
) => {
	return mutator<MedicationsControllerUpdate200>({
		url: `/api/v1/medications/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateMedicationDto,
	});
};

export const getMedicationsControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerUpdate>>,
		TError,
		{ id: string; data: UpdateMedicationDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof medicationsControllerUpdate>>,
	TError,
	{ id: string; data: UpdateMedicationDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof medicationsControllerUpdate>>,
		{ id: string; data: UpdateMedicationDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return medicationsControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MedicationsControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof medicationsControllerUpdate>>
>;
export type MedicationsControllerUpdateMutationBody = UpdateMedicationDto;
export type MedicationsControllerUpdateMutationError = ErrorType<unknown>;

export const useMedicationsControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerUpdate>>,
		TError,
		{ id: string; data: UpdateMedicationDto },
		TContext
	>;
}) => {
	const mutationOptions = getMedicationsControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const medicationsControllerRemove = (id: string) => {
	return mutator<SuccessResponseDto>({ url: `/api/v1/medications/${id}`, method: "DELETE" });
};

export const getMedicationsControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof medicationsControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof medicationsControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return medicationsControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type MedicationsControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof medicationsControllerRemove>>
>;

export type MedicationsControllerRemoveMutationError = ErrorType<unknown>;

export const useMedicationsControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof medicationsControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}) => {
	const mutationOptions = getMedicationsControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
