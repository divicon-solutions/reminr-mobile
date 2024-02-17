import { AlertProps, useAlertStore } from "@store/alert";

export class AlertService {
	private static showAlert(message: string, severity: AlertProps["severity"]): void {
		useAlertStore.getState().setAlert(true, message, severity);
	}

	static successMessage(message: string): void {
		this.showAlert(message, "success");
	}

	static errorMessage(message: string): void {
		this.showAlert(message, "error");
	}

	static infoMessage(message: string): void {
		this.showAlert(message, "info");
	}

	static warningMessage(message: string): void {
		this.showAlert(message, "warning");
	}
}
