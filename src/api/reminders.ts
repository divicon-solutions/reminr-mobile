/**
 * Generated by orval v6.24.0 🍺
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
	CreateReminderDto,
	ReminderDto,
	RemindersControllerCreate201,
	RemindersControllerUpdate200,
	SuccessResponseDto,
	UpdateReminderDto,
} from "./models";
import { mutator } from "./mutators/index";
import type { ErrorType } from "./mutators/index";

export const remindersControllerCreate = (createReminderDto: CreateReminderDto) => {
	return mutator<RemindersControllerCreate201>({
		url: `/api/v1/reminders`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createReminderDto,
	});
};

export const getRemindersControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerCreate>>,
		TError,
		{ data: CreateReminderDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof remindersControllerCreate>>,
	TError,
	{ data: CreateReminderDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof remindersControllerCreate>>,
		{ data: CreateReminderDto }
	> = (props) => {
		const { data } = props ?? {};

		return remindersControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type RemindersControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof remindersControllerCreate>>
>;
export type RemindersControllerCreateMutationBody = CreateReminderDto;
export type RemindersControllerCreateMutationError = ErrorType<unknown>;

export const useRemindersControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerCreate>>,
		TError,
		{ data: CreateReminderDto },
		TContext
	>;
}) => {
	const mutationOptions = getRemindersControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const remindersControllerFindAll = (signal?: AbortSignal) => {
	return mutator<ReminderDto[]>({ url: `/api/v1/reminders`, method: "GET", signal });
};

export const getRemindersControllerFindAllQueryKey = () => {
	return [`/api/v1/reminders`] as const;
};

export const getRemindersControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof remindersControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof remindersControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getRemindersControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof remindersControllerFindAll>>> = ({
		signal,
	}) => remindersControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof remindersControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type RemindersControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof remindersControllerFindAll>>
>;
export type RemindersControllerFindAllQueryError = ErrorType<unknown>;

export const useRemindersControllerFindAll = <
	TData = Awaited<ReturnType<typeof remindersControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof remindersControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getRemindersControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const remindersControllerFindOne = (id: string, signal?: AbortSignal) => {
	return mutator<ReminderDto>({ url: `/api/v1/reminders/${id}`, method: "GET", signal });
};

export const getRemindersControllerFindOneQueryKey = (id: string) => {
	return [`/api/v1/reminders/${id}`] as const;
};

export const getRemindersControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof remindersControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof remindersControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getRemindersControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof remindersControllerFindOne>>> = ({
		signal,
	}) => remindersControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof remindersControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type RemindersControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof remindersControllerFindOne>>
>;
export type RemindersControllerFindOneQueryError = ErrorType<unknown>;

export const useRemindersControllerFindOne = <
	TData = Awaited<ReturnType<typeof remindersControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof remindersControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getRemindersControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const remindersControllerUpdate = (id: string, updateReminderDto: UpdateReminderDto) => {
	return mutator<RemindersControllerUpdate200>({
		url: `/api/v1/reminders/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateReminderDto,
	});
};

export const getRemindersControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerUpdate>>,
		TError,
		{ id: string; data: UpdateReminderDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof remindersControllerUpdate>>,
	TError,
	{ id: string; data: UpdateReminderDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof remindersControllerUpdate>>,
		{ id: string; data: UpdateReminderDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return remindersControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type RemindersControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof remindersControllerUpdate>>
>;
export type RemindersControllerUpdateMutationBody = UpdateReminderDto;
export type RemindersControllerUpdateMutationError = ErrorType<unknown>;

export const useRemindersControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerUpdate>>,
		TError,
		{ id: string; data: UpdateReminderDto },
		TContext
	>;
}) => {
	const mutationOptions = getRemindersControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const remindersControllerRemove = (id: string) => {
	return mutator<SuccessResponseDto>({ url: `/api/v1/reminders/${id}`, method: "DELETE" });
};

export const getRemindersControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof remindersControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof remindersControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return remindersControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type RemindersControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof remindersControllerRemove>>
>;

export type RemindersControllerRemoveMutationError = ErrorType<unknown>;

export const useRemindersControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof remindersControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}) => {
	const mutationOptions = getRemindersControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};
