import { Navigation } from "./types";
import Login from "@features/Authentication/Login";
import SignUp from "@features/Authentication/SignUp";

export const unprotectedScreens: Navigation[] = [
	{ name: "Login", Component: Login, options: { headerShown: false } },
	{ name: "SignUp", Component: SignUp, options: { headerShown: false } },
];

export const protectedScreens: Navigation[] = [];
