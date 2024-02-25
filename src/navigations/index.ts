import { Navigation } from "./types";
import Login from "@features/Authentication/Login";
import SignUp from "@features/Authentication/SignUp";
import AddInrValue from "@features/InrTest/AddInrValue";
import EditInrValue from "@features/InrTest/EditInrValue";
import AddMedication from "@features/Medication/AddMedication";
import EditMedication from "@features/Medication/EditMedication";

export const unprotectedScreens: Navigation[] = [
	{ name: "Login", Component: Login, options: { headerShown: false } },
	{ name: "SignUp", Component: SignUp, options: { headerShown: false } },
];

export const protectedScreens: Navigation[] = [
	{ name: "AddInrValue", Component: AddInrValue, options: { headerTitle: "Add INR Value" } },
	{ name: "EditInrValue", Component: EditInrValue, options: { headerTitle: "Edit INR Value" } },
	{ name: "AddMedication", Component: AddMedication, options: { headerTitle: "Add Medication" } },
	{
		name: "EditMedication",
		Component: EditMedication,
		options: { headerTitle: "Edit Medication" },
	},
];
