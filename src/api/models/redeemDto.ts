/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import type { RedeemDtoGiftCardType } from "./redeemDtoGiftCardType";
import type { RedeemDtoMethod } from "./redeemDtoMethod";

export interface RedeemDto {
	amount: number;
	createdAt: string;
	deletedAt: string | null;
	giftCardCode: string | null;
	giftCardType: RedeemDtoGiftCardType;
	id: string;
	method: RedeemDtoMethod;
	processedAt: string | null;
	updatedAt: string;
}
