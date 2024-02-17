import { useLoaderStore } from "@store/loader";

export class LoaderService {
	static showLoader(): void {
		useLoaderStore.getState().setLoader(true);
	}

	static hideLoader(): void {
		useLoaderStore.getState().setLoader(false);
	}
}
