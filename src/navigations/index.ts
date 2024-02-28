import ChangePassword from "@features/Authentication/ChangePassword";
import { Navigation } from "./types";
import Login from "@features/Authentication/Login";
import SignUp from "@features/Authentication/SignUp";
import IncentivesOverview from "@features/Incentives/IncentivesOverview";
import AddInrValue from "@features/InrTest/AddInrValue";
import EditInrValue from "@features/InrTest/EditInrValue";
import AddMedication from "@features/Medication/AddMedication";
import EditMedication from "@features/Medication/EditMedication";
import RedeemAmount from "@features/Redeem/RedeemAmount";
import RedeemHistory from "@features/Redeem/RedeemHistory";
import Account from "@features/Settings/Account";
import Settings from "@features/Settings/Settings";
import RedeemDetails from "@features/Redeem/RedeemDetails";

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
	{
		name: "IncentivesOverview",
		Component: IncentivesOverview,
		options: { headerTitle: "Incentives" },
	},
	{
		name: "RedeemAmount",
		Component: RedeemAmount,
		options: { headerTitle: "Redeem Amount" },
	},
	{ name: "RedeemHistory", Component: RedeemHistory, options: { headerTitle: "Redeem History" } },
	{ name: "Settings", Component: Settings, options: { headerTitle: "Settings" } },
	{ name: "Account", Component: Account, options: { headerTitle: "Account" } },
	{
		name: "ChangePassword",
		Component: ChangePassword,
		options: { headerTitle: "Change Password" },
	},
	{
		name: "RedeemDetails",
		Component: RedeemDetails,
		options: { headerTitle: "Redeemed Card Details" },
	},
];
