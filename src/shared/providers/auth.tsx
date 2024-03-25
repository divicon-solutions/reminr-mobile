import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CreateUserDto, pushTokensControllerUnsubscribe, usersControllerCreate } from "@api";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { pushNotificationsService } from "@services/PushNotificationsService";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { storageService } from "@services/StorageService";
import { localNotificationsService } from "@services/LocalNotificationsService";

interface AuthContext {
	user: FirebaseAuthTypes.User | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	signUp: (payload: CreateUserDto & { password: string }) => Promise<void>;
	changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
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

	useEffect(() => {
		if (!user) {
			return;
		}

		notifee.onForegroundEvent(({ type, detail }) => {
			console.log("[FCM] [onForegroundEvent] type", type, "detail", detail);
			if (type === EventType.PRESS) {
				pushNotificationsService.onSelectNotification(detail.notification);
			} else {
				// auto snooze notification after 5 min
				// localNotificationsService.snoozeNotification({
				// 	id: detail?.notification?.id ?? "",
				// 	snooze: 5,
				// });
			}
		});

		notifee.getInitialNotification().then((initialNotification) => {
			console.log("[FCM] [getInitialNotification] initialNotification", initialNotification);
			pushNotificationsService.onInitialNotification(initialNotification);
		});

		const unsubscribeOnMessage = messaging().onMessage((remoteMessage) => {
			console.log("[FCM] [onMessage] Message received", remoteMessage);
			pushNotificationsService.displayNotification(remoteMessage);
		});

		const unsubscribeOnNotification = messaging().onNotificationOpenedApp((remoteMessage) => {
			console.log(
				"[FCM] [onNotificationOpenedApp] Notification caused app to open from background state:",
				remoteMessage,
			);
			pushNotificationsService.onSelectedRemoteMessage(remoteMessage);
		});

		return () => {
			unsubscribeOnMessage();
			unsubscribeOnNotification();
		};
	}, [user]);

	const onAuthStateChanged = useCallback(async (authUser: FirebaseAuthTypes.User | null) => {
		if (authUser) {
			pushNotificationsService.init(authUser.uid);
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
		try {
			const token = await storageService.getFcmToken();
			if (token) {
				await pushTokensControllerUnsubscribe({ token });
				storageService.setFcmToken(null);
			}
			await auth().signOut();
			setUser(null);
		} catch (error) {
			console.error(error);
		}
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

	const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
		const user = auth().currentUser;
		if (user) {
			try {
				const email = user.email || "";
				await user.reauthenticateWithCredential(
					auth.EmailAuthProvider.credential(email, oldPassword), // Pass the email and old password
				);
				await user.updatePassword(newPassword);
			} catch (error) {
				const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
				console.error(authError);

				if (authError.code === "auth/invalid-credential") {
					throw new Error("Invalid old password");
				}
				throw new Error("Error changing password");
			}
		}
	}, []);

	const value = useMemo(
		() => ({ user, isLoading, signIn, signOut, signUp, changePassword }),
		[user, isLoading, signIn, signOut, signUp, changePassword],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
