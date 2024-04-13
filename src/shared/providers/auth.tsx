import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CreateUserDto, pushTokensControllerUnsubscribe, usersControllerCreate } from "@api";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { pushNotificationsService } from "@services/PushNotificationsService";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { storageService } from "@services/StorageService";
import crashlytics from "@react-native-firebase/crashlytics";
import { backgroundService } from "@services/BackgroundService";

interface AuthContext {
	user: FirebaseAuthTypes.User | null;
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	signUp: (payload: CreateUserDto & { password: string }) => Promise<void>;
	changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
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
			const metaData = remoteMessage.data?.metaData;
			if (typeof metaData === "string") {
				try {
					const data = JSON.parse(metaData);
					if (data.type === "SCHEDULE_REMINDERS") {
						backgroundService.scheduleReminders();
					}
				} catch (error) {
					console.error(
						"[PushNotificationsService] [setUpFirebaseMessagingBackgroundHandler]",
						error,
					);
				}
			}
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
			crashlytics().setUserId(authUser.uid);
			setUser(authUser);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, [onAuthStateChanged]);

	const signIn = useCallback(async (email: string, password: string) => {
		try {
			await auth().signInWithEmailAndPassword(email, password);
		} catch (error: any) {
			console.error(error);
			crashlytics().recordError(error);
			if (error.code === "auth/user-disabled") {
				throw new Error("Your account has been disabled, please contact support");
			}
			if (error.code === "auth/user-not-found") {
				throw new Error("Please check your email");
			}
			if (error.code === "auth/wrong-password") {
				throw new Error("Please check your password");
			}
			if (error.code === "auth/too-many-requests") {
				throw new Error("Too many requests, please try again later");
			}
			if (error.code === "auth/invalid-credential") {
				throw new Error("Please check your email and password");
			}
			throw new Error("Error signing in");
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			const token = await storageService.getFcmToken();
			if (token) {
				await pushTokensControllerUnsubscribe({ token });
				storageService.setFcmToken(null);
			}
			await auth()
				.signOut()
				.then(() => setUser(null));
		} catch (error: any) {
			crashlytics().recordError(error);
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
			} catch (error: any) {
				const authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
				console.error(authError);
				crashlytics().recordError(error);
				if (authError.code === "auth/invalid-credential") {
					throw new Error("Please check your current password");
				}
				throw new Error("Error changing password");
			}
		}
	}, []);

	const forgotPassword = useCallback(async (email: string) => {
		try {
			await auth().sendPasswordResetEmail(email);
		} catch (error: any) {
			console.log(error);
			crashlytics().recordError(error);
			if (error.code === "auth/invalid-email") {
				throw new Error("Please check your email");
			}
			if (error.code === "auth/user-not-found") {
				throw new Error("No user found with this email");
			}
			throw new Error("An error occurred while sending the reset password email");
		}
	}, []);

	const value = useMemo(
		() => ({ user, isLoading, signIn, signOut, signUp, changePassword, forgotPassword }),
		[user, isLoading, signIn, signOut, signUp, changePassword, forgotPassword],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
