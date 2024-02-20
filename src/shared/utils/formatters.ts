import moment from "moment";

export const getCurrentUtcTimestamp = () => {
	const now = moment().format("YYYY-MM-DD");
	return now + "T00:00:00.000Z";
};

export const parseDateToFormat = (date: string, format?: string) => {
	if (!format) {
		format = "MM/DD/YYYY";
	}
	if (date.endsWith("000Z")) {
		// UTC
		return moment(date).utc().format(format);
	}
	return moment(date).format(format);
};
