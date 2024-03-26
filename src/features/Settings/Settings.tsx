import {
	CreateCallbackRequestDto,
	useCallbackRequestControllerCreate,
	useUsersControllerFindOne,
	useUsersControllerUpdate,
} from "@api";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ActionSheetIOS, Alert, Linking, Platform, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, List, Switch, Text } from "react-native-paper";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { makeStyles } from "@hooks/makeStyles";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const accountItems = [
	{ id: "0", name: "Account", icon: "manage-accounts" },
	{ id: "1", name: "Sticky Reminder", icon: "sticky-note-2" },
	{ id: "2", name: "Contact", icon: "contact-support" },
];

const otherItems = [
	{ id: "3", name: "About", icon: "info" },
	{ id: "4", name: "Terms and Conditions", icon: "description" },
	{ id: "5", name: "Privacy Policy", icon: "privacy-tip" },
];

const authItems = [
	{ id: "6", name: "Change Password", icon: "password" },
	{ id: "7", name: "Logout", icon: "logout" },
];

type SettingsProps = StackNavigationProps<"Settings">;

const Settings = ({ navigation }: SettingsProps) => {
	const styles = useStyles();
	const { signOut, user } = useAuth();
	const { mutateAsync } = useUsersControllerUpdate();
	const { mutateAsync: callBackReqMutateAsync } = useCallbackRequestControllerCreate();
	const actionSheetRef = useRef<ActionSheetRef>(null);

	const { data, refetch } = useUsersControllerFindOne(user?.uid || "", {
		query: {
			enabled: !!user?.uid,
		},
	});
	const [isEnabled, setIsEnabled] = useState(data?.stickyReminder || false);

	const toggleSwitch = () => {
		setIsEnabled((previousState) => {
			mutateAsync({
				id: user?.uid || "",
				data: {
					stickyReminder: !previousState,
				},
			});
			return !previousState;
		});
	};

	useEffect(() => {
		return () => {
			refetch();
		};
	}, [refetch]);

	const ListItem = ({ item, onPress }) => (
		<Card mode="contained" style={styles.cardItem} onPress={() => onPress(item)}>
			<List.Item
				title={() => {
					return (
						<Text style={{ color: item.name === "Logout" ? "red" : "black" }}>{item.name}</Text>
					);
				}}
				left={() => {
					return (
						<MIcon
							name={item.icon}
							size={20}
							style={{ paddingLeft: 10 }}
							color={item.name === "Logout" ? "red" : "black"}
						/>
					);
				}}
				right={() => {
					if (
						item.name === "Account" ||
						item.name === "Change Password" ||
						item.name === "Contact"
					) {
						return <MIcon name="keyboard-arrow-right" size={20} style={{ paddingRight: 10 }} />;
					} else if (item.name === "Sticky Reminder") {
						return <Switch value={isEnabled} onValueChange={toggleSwitch} style={styles.switch} />;
					}
				}}
			/>
		</Card>
	);

	const Listing = ({ data, onPress }) => (
		<FlatList
			data={data}
			renderItem={({ item }) => <ListItem item={item} onPress={onPress} />}
			keyExtractor={(item) => item.id}
			style={{ marginBottom: 15 }}
		/>
	);

	const handlePress = (item) => {
		console.log("Item Pressed:", item);
		if (item.name === "Logout") {
			console.log("Signing out");

			signOut();
		} else if (item.name === "Sticky Reminder") {
		} else if (item.name === "Change Password") {
			navigation.navigate("ChangePassword");
		} else if (item.name === "Account") {
			navigation.navigate("Account");
		} else if (item.name === "Contact") {
			if (Platform.OS === "ios") {
				ActionSheetIOS.showActionSheetWithOptions(
					{
						options: ["Cancel", "Request a Callback", "Send an Email"],
						cancelButtonIndex: 0,
						userInterfaceStyle: "light",
					},
					async (buttonIndex) => {
						if (buttonIndex === 0) {
						} else if (buttonIndex === 1) {
							await callBackReqMutateAsync({
								data: {
									isResolved: false,
								},
							});
							Alert.alert("Callback Requested", "We will call you back shortly");
						} else if (buttonIndex === 2) {
							Linking.openURL("mailto:support@reminr.com");
						}
					},
				);
			} else if (Platform.OS === "android") {
				actionSheetRef.current?.show();
			}
		} else if (item.name === "About") {
		}
	};

	const handleAction = async (action) => {
		if (action === "Callback") {
			await callBackReqMutateAsync({
				data: {
					isResolved: false,
					userId: user?.uid,
				},
			});
			Alert.alert("Callback Requested", "We will call you back shortly");
		} else if (action === "Email") {
			Linking.openURL("mailto:support@reminr.com");
		}
		actionSheetRef.current?.setModalVisible(false);
	};

	return (
		<Fragment>
			<SafeAreaView style={{ marginTop: 15 }}>
				<Listing data={accountItems} onPress={handlePress} />
				<Listing data={otherItems} onPress={handlePress} />
				<Listing data={authItems} onPress={handlePress} />
			</SafeAreaView>
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
		</Fragment>
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
