/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import type { MedicationFrequency } from "./medicationFrequency";
import type { MedicationIntervalUnit } from "./medicationIntervalUnit";
import type { MedicationSpecificDays } from "./medicationSpecificDays";
import type { User } from "./user";

export interface Medication {
	createdAt: string;
	deletedAt: string | null;
	dosage: string | null;
	frequency: MedicationFrequency;
	id: string;
	intervalCount: number | null;
	intervalUnit: MedicationIntervalUnit;
	name: string;
	noOfPills: number;
	specificDays: MedicationSpecificDays;
	startDate: string;
	time: string;
	updatedAt: string;
	user?: User;
	userId: string;
}
