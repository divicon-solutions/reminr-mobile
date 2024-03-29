import {
	useCallbackRequestControllerCreate,
	useUsersControllerFindOne,
	useUsersControllerUpdate,
} from "@api";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActionSheetIOS, Linking, Platform, SectionList } from "react-native";
import { Button, Card, List, Switch, Text } from "react-native-paper";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { makeStyles } from "@hooks/makeStyles";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import crashlytics from "@react-native-firebase/crashlytics";
import { Constants } from "@utils/constants";

type Item = {
	id:
		| "account"
		| "stickyReminder"
		| "contact"
		| "about"
		| "terms"
		| "privacy"
		| "changePassword"
		| "crashlytics"
		| "logout";
	name: string;
	icon: string;
};

const accountItems: Item[] = [
	{ id: "account", name: "Account", icon: "manage-accounts" },
	{ id: "stickyReminder", name: "Sticky Reminder", icon: "sticky-note-2" },
	{ id: "contact", name: "Contact", icon: "contact-support" },
];

const otherItems: Item[] = [
	{ id: "about", name: "About", icon: "info" },
	{ id: "terms", name: "Terms and Conditions", icon: "description" },
	{ id: "privacy", name: "Privacy Policy", icon: "privacy-tip" },
];

const authItems: Item[] = [
	{ id: "crashlytics", name: "Send bug reports", icon: "bug-report" },
	{ id: "changePassword", name: "Change Password", icon: "password" },
	{ id: "logout", name: "Logout", icon: "logout" },
];

type SettingsProps = StackNavigationProps<"Settings">;

const Settings = ({ navigation }: SettingsProps) => {
	const styles = useStyles();
	const { signOut, user } = useAuth();
	const { mutateAsync } = useUsersControllerUpdate();
	const { mutateAsync: callBackReqMutateAsync } = useCallbackRequestControllerCreate();
	const actionSheetRef = useRef<ActionSheetRef>(null);

	const { data, refetch } = useUsersControllerFindOne(user?.uid ?? "", {
		query: {
			enabled: !!user?.uid,
		},
	});
	const [isEnabled, setIsEnabled] = useState(data?.stickyReminder || false);
	const [isCrashlyticsEnabled, setIsCrashlyticsEnabled] = useState(
		crashlytics().isCrashlyticsCollectionEnabled,
	);

	const toggleSwitch = useCallback(() => {
		setIsEnabled((previousState) => {
			mutateAsync({
				id: user?.uid ?? "",
				data: {
					stickyReminder: !previousState,
				},
			});
			return !previousState;
		});
	}, [mutateAsync, user?.uid]);

	useEffect(() => {
		return () => {
			refetch();
		};
	}, [refetch]);

	const ListItem = useCallback(
		({ item, onPress }: { item: Item; onPress: (item: Item) => void }) => (
			<Card mode="contained" style={styles.cardItem} onPress={() => onPress(item)}>
				<List.Item
					title={<Text style={{ color: item.id === "logout" ? "red" : "black" }}>{item.name}</Text>}
					left={() => {
						return (
							<MIcon
								name={item.icon}
								size={20}
								style={{ paddingLeft: 10 }}
								color={item.id === "logout" ? "red" : "black"}
							/>
						);
					}}
					right={() => {
						if (item.id === "account" || item.id === "changePassword" || item.id === "contact") {
							return <MIcon name="keyboard-arrow-right" size={20} style={{ paddingRight: 10 }} />;
						} else if (item.id === "stickyReminder") {
							return (
								<Switch value={isEnabled} onValueChange={toggleSwitch} style={styles.switch} />
							);
						} else if (item.id === "crashlytics") {
							return (
								<Switch
									value={isCrashlyticsEnabled}
									onValueChange={async () => {
										await crashlytics().setCrashlyticsCollectionEnabled(!isCrashlyticsEnabled);
										setIsCrashlyticsEnabled((prev) => !prev);
									}}
									style={styles.switch}
								/>
							);
						}
					}}
				/>
			</Card>
		),
		[isEnabled, styles.cardItem, styles.switch, toggleSwitch, isCrashlyticsEnabled],
	);

	const handlePress = useCallback(
		(item: Item) => {
			switch (item.id) {
				case "account":
					navigation.navigate("Account");
					break;
				case "stickyReminder":
					break;
				case "contact": {
					if (Platform.OS === "ios") {
						ActionSheetIOS.showActionSheetWithOptions(
							{
								options: ["Cancel", "Request a Callback", "Send an Email"],
								cancelButtonIndex: 0,
								userInterfaceStyle: "light",
							},
							async (buttonIndex) => {
								if (buttonIndex === 1) {
									await callBackReqMutateAsync({
										data: {
											isResolved: false,
											userId: user?.uid ?? "",
										},
									});
								} else if (buttonIndex === 2) {
									Linking.openURL(`mailto:${Constants.supportEmail}`);
								}
							},
						);
					} else if (Platform.OS === "android") {
						actionSheetRef.current?.show();
					}
					break;
				}
				case "about":
					crashlytics().crash();
					break;
				case "terms":
					Linking.openURL(Constants.termsAndConditionsUrl);
					break;
				case "privacy":
					Linking.openURL(Constants.privacyPolicyUrl);
					break;
				case "changePassword":
					navigation.navigate("ChangePassword");
					break;
				case "logout":
					signOut();
					break;

				default:
					break;
			}
		},
		[actionSheetRef, callBackReqMutateAsync, navigation, signOut, user?.uid],
	);

	const handleAction = async (action: "Callback" | "Email") => {
		if (action === "Callback") {
			await callBackReqMutateAsync({
				data: {
					isResolved: false,
					userId: user?.uid ?? "",
				},
			});
		} else if (action === "Email") {
			Linking.openURL(`mailto:${Constants.supportEmail}`);
		}
		actionSheetRef.current?.setModalVisible(false);
	};

	return (
		<>
			<SectionList
				sections={[
					{ title: "Account", data: accountItems },
					{ title: "Other", data: otherItems },
					{ title: "Authentication", data: authItems },
				]}
				renderItem={({ item }) => <ListItem item={item} onPress={handlePress} />}
				SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
				keyExtractor={(item) => item.id}
			/>
			<ActionSheet ref={actionSheetRef} containerStyle={{ padding: 10 }}>
				<Button onPress={() => handleAction("Callback")}>
					<Text style={styles.actionSheetText}>Request a Callback</Text>
				</Button>
				<Button onPress={() => handleAction("Email")}>
					<Text style={styles.actionSheetText}>Send an Email</Text>
				</Button>
				<Button onPress={() => actionSheetRef.current?.setModalVisible(false)}>
					<Text style={styles.actionSheetCancel}>Cancel</Text>
				</Button>
			</ActionSheet>
		</>
	);
};

export default Settings;

const useStyles = makeStyles((theme) => ({
	cardItem: {
		backgroundColor: theme.colors.onPrimary,
		borderBottomColor: "rgb(228, 225, 230)",
		borderBottomWidth: 0.5,
	},
	switch: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
	actionSheetText: {
		fontSize: 16,
	},
	actionSheetCancel: {
		fontSize: 16,
		color: theme.colors.error,
	},
}));
