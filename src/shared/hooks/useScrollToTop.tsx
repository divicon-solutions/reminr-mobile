import { useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useScrollToTop = () => {
	const flatListRef = useRef<FlatList | null>(null);

	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

	const scrollToTop = () => {
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
	};

	const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetY = nativeEvent.contentOffset.y;
		setShowScrollToTopButton(offsetY > 100);
	};

	return { flatListRef, showScrollToTopButton, onScroll, scrollToTop };
};
