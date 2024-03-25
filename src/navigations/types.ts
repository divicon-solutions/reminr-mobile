import { InrTestDto, MedicationDto, RedeemDto } from "@api";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationOptions, StackScreenProps } from "@react-navigation/stack";

export type AppBottomNavigatorParamList = {
	Today: undefined;
	Dashboard: undefined;
	Medications: undefined;
	InrTest: undefined;
};

export type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	Home: NavigatorScreenParams<AppBottomNavigatorParamList>;
	AddInrValue: undefined;
	EditInrValue: { inrTest: InrTestDto };
	AddMedication: undefined;
	EditMedication: { medication: MedicationDto };
	IncentivesOverview: { accountBalance: number };
	RedeemAmount: { accountBalance: number };
	RedeemHistory: undefined;
	RedeemDetails: { redeemTransaction: RedeemDto };
	Settings: undefined;
	Account: undefined;
	ChangePassword: undefined;
	ForgotPassword: undefined;
};

export type Navigation = {
	name: keyof RootStackParamList;
	Component: React.ComponentType<any>; // TODO: Fix any
	options?: StackNavigationOptions;
};

export type StackNavigationProps<T extends keyof RootStackParamList> = Readonly<
	StackScreenProps<RootStackParamList, T>
>;

export type BottomTabNavigationProps<T extends keyof AppBottomNavigatorParamList> = Readonly<
	CompositeScreenProps<
		BottomTabScreenProps<AppBottomNavigatorParamList, T>,
		StackScreenProps<RootStackParamList>
	>
>;
