import { useCallback, useState } from "react";

export const useDialog = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	return {
		open,
		handleClickOpen,
		handleClose,
	};
};
