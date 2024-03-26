import { View, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useMemo } from "react";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import { Button } from "react-native-paper";
import { makeStyles } from "@hooks/makeStyles";
import { CreateRedeemDto, useRedeemsControllerCreate } from "@api";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";

const giftCardOptions = [
	{ label: "Amazon", value: "amazon" },
	{ label: "Flipkart", value: "flipkart" },
	{ label: "Myntra", value: "myntra" },
];

type RedeemAmountProps = StackNavigationProps<"RedeemAmount">;

export default function RedeemAmount({ route, navigation }: RedeemAmountProps) {
	const { accountBalance } = route.params;
	const { user } = useAuth();
	const amounts: { value: number }[] = useMemo(() => [], []);
	const styles = useStyles();

	const initialValues: CreateRedeemDto = {
		amount: 0,
		giftCardType: null,
		processedAt: null,
		method: "GIFTCARD",
		giftCardCode: null,
		userId: user?.uid ?? "",
	};

	const { mutateAsync } = useRedeemsControllerCreate();

	const onSubmit = async (values: CreateRedeemDto) => {
		await mutateAsync({ data: { ...values, amount: Number(values.amount) } });
		navigation.goBack();
	};

	useEffect(() => {
		for (let i = 5; i <= accountBalance; i += 5) {
			amounts.push({ value: i });
		}
	}, [accountBalance, amounts]);

	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues}>
			{({ values, isValid, isSubmitting }) => (
				<KeyboardAvoidView style={styles.container} contentContainerStyle={styles.containerStyle}>
					<View style={styles.form}>
						<SelectFormField name="giftCard" label="Select Gift Card" items={giftCardOptions} />
						<SelectFormField
							name="amount"
							label="Amount"
							items={amounts.map((item) => ({ value: item.value, label: item.value.toString() }))}
						/>
					</View>
					<SafeAreaView>
						<Button
							mode="contained"
							onPress={() => onSubmit(values)}
							disabled={!isValid || isSubmitting}
							loading={isSubmitting}
							style={styles.redeemButton}
						>
							Redeem
						</Button>
					</SafeAreaView>
				</KeyboardAvoidView>
			)}
		</Formik>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		padding: 15,
		backgroundColor: theme.colors.background,
	},
	containerStyle: {
		flexGrow: 1,
		justifyContent: "space-between",
	},
	redeemButton: {
		borderRadius: 0,
		alignSelf: "center",
		width: Dimensions.get("window").width / 2,
	},
	form: {
		gap: 10,
	},
}));
