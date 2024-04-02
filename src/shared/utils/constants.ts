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

export class Constants {
	static readonly supportEmail = "support@reminr.com";
	static readonly termsAndConditionsUrl = "https://reminrapp.com/terms-conditions";
	static readonly privacyPolicyUrl = "https://reminrapp.com/privacy-policy";
}
