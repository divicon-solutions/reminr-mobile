import { Navigation } from "./types";
import Login from "@features/Authentication/Login";
import SignUp from "@features/Authentication/SignUp";
import AddMedicationScreen from "@features/Medication/AddMedication";
import EditMedicationScreen from "@features/Medication/EditMedication";
import ViewReminderScreen from "@features/Medication/ViewReminder";

export const unprotectedScreens: Navigation[] = [
	{ name: "Login", Component: Login, options: { headerShown: false } },
	{ name: "SignUp", Component: SignUp, options: { headerShown: false } },
];

export const protectedScreens: Navigation[] = [
	{ name: "AddMedication", Component: AddMedicationScreen },
	{ name: "ViewReminderScreen", Component: ViewReminderScreen },
	{ name: "EditMedicationScreen", Component: EditMedicationScreen },
];
