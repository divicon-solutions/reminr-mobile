/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * RemInr Api
 * OpenAPI spec version: 1.0
 */
import type { CreateUserDtoRole } from "./createUserDtoRole";

export interface CreateUserDto {
	email: string;
	fullName: string;
	id?: string;
	phoneNumber?: string | null;
	role?: CreateUserDtoRole;
	stickyReminder?: boolean;
}
