import React, { useMemo } from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { ScrollView, View } from "react-native";
import { Circle } from "react-native-svg";
import { makeStyles, useAppTheme } from "@hooks/makeStyles";
import { CompletedInrTest } from "@api";
import { parseDateToFormat } from "@utils/formatters";
import { Text } from "react-native-paper";

function Decorator({ x, y, data }: { x: any; y: any; data: any }) {
	const { colors } = useAppTheme();

	return data.map((value: any, index: number) => (
		<Circle
			key={index}
			cx={x(index)}
			cy={y(value)}
			r={4}
			stroke={colors.primary}
			fill={colors.onPrimary}
		/>
	));
}

type InrTestsGraphProps = Readonly<{
	data: CompletedInrTest[];
}>;
function InrTestsGraph({ data }: InrTestsGraphProps) {
	const { colors } = useAppTheme();
	const scrollViewRef = React.useRef<ScrollView>(null);

	const yAxisData = useMemo(() => data.map((test) => test.inrValue), [data]);
	const xAxisData = useMemo(() => data.map((test) => parseDateToFormat(test.date)), [data]);

	const axesSvg = { fontSize: 10, fill: "grey" };
	const verticalContentInset = { top: 10, bottom: 10 };
	const horizontalContentInset = { left: 30, right: 30 };
	const xAxisHeight = 30;

	const styles = useStyles();

	if (data.length === 0) {
		return (
			<View style={styles.emptyGraph}>
				<Text variant="titleMedium">No inr tests taken</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<YAxis
				data={yAxisData}
				style={{ marginBottom: xAxisHeight }}
				contentInset={verticalContentInset}
				svg={axesSvg}
			/>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.scrollViewContent}
				horizontal
				showsHorizontalScrollIndicator={false}
				onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
			>
				<View style={[styles.scrollContainer, { width: data.length * 100 }]}>
					<LineChart
						style={styles.lineChart}
						data={yAxisData}
						contentInset={verticalContentInset}
						svg={{ stroke: colors.primary }}
					>
						<Grid />
						<Decorator x={(x: any) => x} y={(y: any) => y} data={(data: any) => data} />
					</LineChart>
					<XAxis
						style={styles.xAxis}
						data={xAxisData.map((_, index) => index)}
						formatLabel={(index) => xAxisData[index]}
						contentInset={horizontalContentInset}
						svg={axesSvg}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

export default React.memo(InrTestsGraph);

const useStyles = makeStyles(() => ({
	container: {
		height: 250,
		padding: 20,
		flexDirection: "row",
	},
	scrollContainer: {
		flex: 1,
		marginHorizontal: 10,
		height: 400,
	},
	yAxis: {
		marginBottom: 30,
	},
	xAxis: {
		flex: 1,
	},
	lineChart: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
	},
	emptyGraph: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 250,
	},
}));
