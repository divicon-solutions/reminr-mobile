import React from "react";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { ScrollView, View } from "react-native";

class AxesExample extends React.PureComponent {
	render() {
		const data = Array.from({ length: 100 }, () => Math.random() * (2.7 - 1.6) + 1.6);

		const axesSvg = { fontSize: 10, fill: "grey" };
		const verticalContentInset = { top: 10, bottom: 10 };
		const xAxisHeight = 30;

		// Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
		// All react-native-svg-charts components support full flexbox and therefore all
		// layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
		// In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
		// and then displace the other axis with just as many pixels. Simple but manual.

		return (
			<View style={{ height: 200, padding: 20, flexDirection: "row" }}>
				<YAxis
					data={data}
					style={{ marginBottom: xAxisHeight }}
					contentInset={verticalContentInset}
					svg={axesSvg}
				/>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal>
					<LineChart
						style={{ flex: 1, width: data.length * 10 }}
						data={data}
						contentInset={verticalContentInset}
						svg={{ stroke: "rgb(134, 65, 244)" }}
					>
						<Grid />
					</LineChart>
					<XAxis
						style={{ marginHorizontal: -10, height: xAxisHeight }}
						data={data}
						formatLabel={(_value: any, index: number) => index}
						contentInset={{ left: 10, right: 10 }}
						svg={axesSvg}
					/>
				</ScrollView>
			</View>
		);
	}
}

export default AxesExample;
