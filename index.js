/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import Main from "./src/main";
import { name as appName } from "./app.json";
import { setUpBackgroundNotifications } from "./src/shared/services/PushNotificationsService";

setUpBackgroundNotifications();

function HeadlessCheck({ isHeadless }) {
	if (isHeadless) {
		return null;
	}
	return <Main />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
