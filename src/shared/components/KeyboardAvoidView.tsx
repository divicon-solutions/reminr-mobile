import React from "react";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface KeyboardAvoidViewProps extends React.ComponentProps<typeof KeyboardAwareScrollView> {
	children: React.ReactNode;
}

export default function KeyboardAvoidView({
	children,
	...props
}: Readonly<KeyboardAvoidViewProps>) {
	return (
		<KeyboardAwareScrollView
			bounces={false}
			showsVerticalScrollIndicator={false}
			enableOnAndroid={true}
			scrollEnabled={true}
			extraScrollHeight={Platform.OS === "ios" ? 70 : undefined}
			keyboardShouldPersistTaps="handled"
			scrollToOverflowEnabled={true}
			enableAutomaticScroll={true}
			{...props}
		>
			{children}
		</KeyboardAwareScrollView>
	);
}
