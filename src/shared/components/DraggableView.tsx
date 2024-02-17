import React from "react";
import { Dimensions, LayoutChangeEvent, ViewStyle } from "react-native";
import { PanGestureHandlerGestureEvent, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
	AnimatedStyle,
	clamp,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

type ContextType = {
	x: number;
	y: number;
};

type DraggableViewProps = Readonly<{
	children: React.ReactNode;
	style?: AnimatedStyle<ViewStyle>;
	context?: ContextType;
}>;

export default function DraggableView(props: DraggableViewProps) {
	const x = useSharedValue(props.context?.x ?? 0);
	const y = useSharedValue(props.context?.y ?? 0);
	const [childDimensions, setChildDimensions] = React.useState({ width: 0, height: 0 });

	const { width, height } = Dimensions.get("window");

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width: childWidth, height: childHeight } = event.nativeEvent.layout;
		setChildDimensions({ width: childWidth, height: childHeight });
	};

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
		onStart: (_, context) => {
			context.x = x.value;
			context.y = y.value;
		},
		onActive: (event, context) => {
			x.value = clamp(event.translationX + context.x, 0, width - childDimensions.width);
			y.value = clamp(event.translationY + context.y, 0, height - childDimensions.height);
		},
	});

	const panStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(x.value, { damping: 20, stiffness: 100 }),
				},
				{
					translateY: withSpring(y.value, { damping: 20, stiffness: 100 }),
				},
			],
		};
	}, [x, y]);

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View onLayout={handleLayout} style={[panStyle, { ...props.style }]}>
				{props.children}
			</Animated.View>
		</PanGestureHandler>
	);
}
