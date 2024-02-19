import { MedicationDto, ReminderDto } from "@api";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationOptions, StackScreenProps } from "@react-navigation/stack";

export type AppBottomNavigatorParamList = {
	Today: undefined;
	Dashboard: undefined;
	Medications: undefined;
};

export type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	Home: NavigatorScreenParams<AppBottomNavigatorParamList>;
	AddMedication: undefined;
	ViewReminderScreen: { item: ReminderDto };
	EditMedicationScreen: { item: MedicationDto };
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
