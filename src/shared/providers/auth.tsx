import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CreateUserDto, usersControllerCreate } from "@api";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface AuthContext {
	user: FirebaseAuthTypes.User | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	signUp: (payload: CreateUserDto & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const onAuthStateChanged = useCallback(async (authUser: FirebaseAuthTypes.User | null) => {
		if (authUser) {
			setUser(authUser);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, [onAuthStateChanged]);

	const signIn = useCallback(async (email: string, password: string) => {
		await auth().signInWithEmailAndPassword(email, password);
	}, []);

	const signOut = useCallback(async () => {
		await auth().signOut();
		setUser(null);
	}, []);

	const signUp = useCallback(
		async ({ password, ...rest }: CreateUserDto & { password: string }) => {
			const userCredential = await auth().createUserWithEmailAndPassword(rest.email, password);
			const { result } = await usersControllerCreate({ ...rest, id: userCredential.user.uid });
			if (!result) {
				auth().currentUser?.delete();
				throw new Error("Error creating user");
			}
		},
		[],
	);

	const value = useMemo(
		() => ({ user, isLoading, signIn, signOut, signUp }),
		[user, isLoading, signIn, signOut, signUp],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
