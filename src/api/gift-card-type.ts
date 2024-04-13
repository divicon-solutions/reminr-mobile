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
	CreateGiftCardTypeDto,
	GiftCardTypeControllerCreate201,
	GiftCardTypeControllerUpdate200,
	GiftCardTypeDto,
	SuccessResponseDto,
	UpdateGiftCardTypeDto,
} from "./models";
import { mutator } from "./mutators/index";
import type { ErrorType } from "./mutators/index";

export const giftCardTypeControllerCreate = (createGiftCardTypeDto: CreateGiftCardTypeDto) => {
	return mutator<GiftCardTypeControllerCreate201>({
		url: `/v1/gift-card-type`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createGiftCardTypeDto,
	});
};

export const getGiftCardTypeControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerCreate>>,
		TError,
		{ data: CreateGiftCardTypeDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof giftCardTypeControllerCreate>>,
	TError,
	{ data: CreateGiftCardTypeDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof giftCardTypeControllerCreate>>,
		{ data: CreateGiftCardTypeDto }
	> = (props) => {
		const { data } = props ?? {};

		return giftCardTypeControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type GiftCardTypeControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof giftCardTypeControllerCreate>>
>;
export type GiftCardTypeControllerCreateMutationBody = CreateGiftCardTypeDto;
export type GiftCardTypeControllerCreateMutationError = ErrorType<unknown>;

export const useGiftCardTypeControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerCreate>>,
		TError,
		{ data: CreateGiftCardTypeDto },
		TContext
	>;
}) => {
	const mutationOptions = getGiftCardTypeControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const giftCardTypeControllerFindAll = (signal?: AbortSignal) => {
	return mutator<GiftCardTypeDto[]>({ url: `/v1/gift-card-type`, method: "GET", signal });
};

export const getGiftCardTypeControllerFindAllQueryKey = () => {
	return [`/v1/gift-card-type`] as const;
};

export const getGiftCardTypeControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGiftCardTypeControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>> = ({
		signal,
	}) => giftCardTypeControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type GiftCardTypeControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>
>;
export type GiftCardTypeControllerFindAllQueryError = ErrorType<unknown>;

export const useGiftCardTypeControllerFindAll = <
	TData = Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof giftCardTypeControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getGiftCardTypeControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const giftCardTypeControllerFindOne = (id: string, signal?: AbortSignal) => {
	return mutator<GiftCardTypeDto>({ url: `/v1/gift-card-type/${id}`, method: "GET", signal });
};

export const getGiftCardTypeControllerFindOneQueryKey = (id: string) => {
	return [`/v1/gift-card-type/${id}`] as const;
};

export const getGiftCardTypeControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGiftCardTypeControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>> = ({
		signal,
	}) => giftCardTypeControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type GiftCardTypeControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>
>;
export type GiftCardTypeControllerFindOneQueryError = ErrorType<unknown>;

export const useGiftCardTypeControllerFindOne = <
	TData = Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof giftCardTypeControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getGiftCardTypeControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const giftCardTypeControllerUpdate = (
	id: string,
	updateGiftCardTypeDto: UpdateGiftCardTypeDto,
) => {
	return mutator<GiftCardTypeControllerUpdate200>({
		url: `/v1/gift-card-type/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateGiftCardTypeDto,
	});
};

export const getGiftCardTypeControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerUpdate>>,
		TError,
		{ id: string; data: UpdateGiftCardTypeDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof giftCardTypeControllerUpdate>>,
	TError,
	{ id: string; data: UpdateGiftCardTypeDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof giftCardTypeControllerUpdate>>,
		{ id: string; data: UpdateGiftCardTypeDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return giftCardTypeControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type GiftCardTypeControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof giftCardTypeControllerUpdate>>
>;
export type GiftCardTypeControllerUpdateMutationBody = UpdateGiftCardTypeDto;
export type GiftCardTypeControllerUpdateMutationError = ErrorType<unknown>;

export const useGiftCardTypeControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerUpdate>>,
		TError,
		{ id: string; data: UpdateGiftCardTypeDto },
		TContext
	>;
}) => {
	const mutationOptions = getGiftCardTypeControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const giftCardTypeControllerRemove = (id: string) => {
	return mutator<SuccessResponseDto>({ url: `/v1/gift-card-type/${id}`, method: "DELETE" });
};

export const getGiftCardTypeControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof giftCardTypeControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof giftCardTypeControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return giftCardTypeControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type GiftCardTypeControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof giftCardTypeControllerRemove>>
>;

export type GiftCardTypeControllerRemoveMutationError = ErrorType<unknown>;

export const useGiftCardTypeControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof giftCardTypeControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}) => {
	const mutationOptions = getGiftCardTypeControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
