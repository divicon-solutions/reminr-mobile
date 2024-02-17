export interface ListDto {
	value: string | number | boolean;
	label: string;
}

export const stringToListDto = (value: string): ListDto => {
	return {
		value,
		label: value,
	};
};

export class Constants {}
