import moment from "moment";

export const getCurrentUtcTimestamp = () => {
	const now = moment().format("YYYY-MM-DD");
	return now + "T00:00:00.000Z";
};

export const getCurrentUtcTimestampWithTimeOnly = () => {
	const now = moment().format("HH:mm");
	return "1970-01-01T" + now + ":00.000Z";
};

export const parseDateToFormat = (date: string, format?: string) => {
	if (!date) {
		return "";
	}
	if (!format) {
		format = "MM/DD/YYYY";
	}
	if (date.endsWith("000Z")) {
		// UTC
		return moment(date).utc().format(format);
	}
	return moment(date).format(format);
};

export const snakeCaseToUpperCamelCase = (str: string) => {
	// replace - and _ with space
	// Make first letter of each word uppercase by splitting the string into words
	// and then combining the words back together
	const splittedWords = str.replace(/-|_/g, " ").split(" ");
	if (splittedWords.length === 1) {
		if (splittedWords[0].length === 0) {
			return "";
		}
		return splittedWords[0][0].toUpperCase() + splittedWords[0].slice(1).toLowerCase();
	}
	return splittedWords.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
};
