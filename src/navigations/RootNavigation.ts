import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList, StackNavigationProps } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
	name: T,
	params: StackNavigationProps<T>["route"]["params"],
) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(CommonActions.navigate(name, params));
	}
}
