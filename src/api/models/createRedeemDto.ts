/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import type { CreateRedeemDtoGiftCardType } from "./createRedeemDtoGiftCardType";
import type { CreateRedeemDtoMethod } from "./createRedeemDtoMethod";

export interface CreateRedeemDto {
	amount: number;
	giftCardCode?: string | null;
	giftCardType?: CreateRedeemDtoGiftCardType;
	method: CreateRedeemDtoMethod;
	processedAt?: string | null;
}
