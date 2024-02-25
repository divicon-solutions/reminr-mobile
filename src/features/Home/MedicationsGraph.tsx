import React from "react";
import { AreaChart, Grid, YAxis } from "react-native-svg-charts";
import { Circle, Path } from "react-native-svg";
import { View } from "react-native";

class DecoratorExample extends React.PureComponent {
	render() {
		const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

		const Decorator = ({
			x,
			y,
			data,
		}: {
			x: (index: number) => number;
			y: (value: number) => number;
			data: number[];
		}) => {
			return data.map((value: any, index: number) => (
				<Circle
					key={index}
					cx={x(index)}
					cy={y(value)}
					r={4}
					stroke={"rgb(134, 65, 244)"}
					fill={"white"}
				/>
			));
		};

		const Line = ({ line }: { line?: string }) => (
			<Path d={line} stroke={"rgba(134, 65, 244)"} fill={"none"} />
		);
		const axesSvg = { fontSize: 10, fill: "grey" };
		const verticalContentInset = { top: 10, bottom: 10 };
		const xAxisHeight = 30;
		return (
			<View>
				<YAxis
					data={data}
					style={{ marginBottom: xAxisHeight }}
					contentInset={verticalContentInset}
					svg={axesSvg}
				/>
				<AreaChart
					style={{ height: 200 }}
					data={data}
					svg={{ fill: "rgba(134, 65, 244, 0.2)" }}
					contentInset={{ top: 20, bottom: 30 }}
				>
					<Grid />
					<Line line={undefined} />
					<Decorator
						x={function (): number {
							throw new Error("Function not implemented.");
						}}
						y={function (): number {
							throw new Error("Function not implemented.");
						}}
						data={[]}
					/>
				</AreaChart>
			</View>
		);
	}
}

export default DecoratorExample;
