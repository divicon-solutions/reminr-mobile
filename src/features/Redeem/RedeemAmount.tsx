import { View, SafeAreaView, Dimensions } from "react-native";
import React, { useMemo } from "react";
import KeyboardAvoidView from "@components/KeyboardAvoidView";
import { Formik } from "formik";
import { SelectFormField } from "@components/FormFields/SelectFormField";
import { Button } from "react-native-paper";
import { makeStyles } from "@hooks/makeStyles";
import {
	CreateRedeemDto,
	useGiftCardTypeControllerFindAll,
	useRedeemsControllerCreate,
} from "@api";
import { StackNavigationProps } from "@navigations/types";
import { useAuth } from "@providers/auth";

type RedeemAmountProps = StackNavigationProps<"RedeemAmount">;

export default function RedeemAmount({ route, navigation }: RedeemAmountProps) {
	const { accountBalance } = route.params;
	const { user } = useAuth();
	const styles = useStyles();
	const { data } = useGiftCardTypeControllerFindAll();

	const initialValues: CreateRedeemDto = {
		amount: 0,
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

	const amounts = useMemo(() => {
		const result: { value: number }[] = [];
		for (let i = 5; i <= accountBalance; i += 5) {
			result.push({ value: i });
		}
		return result;
	}, [accountBalance]);

	const giftCardOptions = useMemo(() => {
		return data?.map((item) => ({ value: item.id, label: item.name })) ?? [];
	}, [data]);

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
