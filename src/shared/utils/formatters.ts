import moment from "moment";

export const getCurrentUtcTimestamp = () => {
	const now = moment().format("YYYY-MM-DD");
	return now + "T00:00:00.000Z";
};
