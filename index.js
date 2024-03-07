/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import Main from "./src/main";
import { name as appName } from "./app.json";
import { setUpLocalNotificationsBackgroundHandler } from "./src/shared/services/LocalNotificationsService";
import { setUpFirebaseMessagingBackgroundHandler } from "./src/shared/services/PushNotificationsService";

setUpFirebaseMessagingBackgroundHandler();
setUpLocalNotificationsBackgroundHandler();

function HeadlessCheck({ isHeadless }) {
	if (isHeadless) {
		return null;
	}
	return <Main />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
