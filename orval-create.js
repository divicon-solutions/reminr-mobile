const fs = require("fs");

const commonOutputOptions = {
	mode: "tags",
	client: "react-query",
	mock: false,
};

const commonInputOptions = {};

const commonHooks = {
	afterAllFilesWrite: "yarn format",
};

const baseUrl = "https://api-dev.reminrapp.com/v1";

const instanceTemplate = `import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { http } from "@services/InterceptorService";

export const CUSTOM_INSTANCE = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = http({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export default CUSTOM_INSTANCE;

export interface ErrorType<Error> extends AxiosError<Error> {}
`;

// Create Instances folder
fs.mkdirSync(`./src/api/mutators`, { recursive: true });
let newTemplate = instanceTemplate.replace(/BASE_URL/g, "environment.baseUrl");
newTemplate = newTemplate.replace(/CUSTOM_INSTANCE/g, `mutator`);
fs.writeFileSync(`./src/api/mutators/index.ts`, newTemplate);
fs.rmSync(`./src/api/models`, {
	force: true,
	recursive: true,
});

const oravalConfig = {
	reminr: {
		output: {
			...commonOutputOptions,
			workspace: "src/api",
			target: "index.ts",
			schemas: "models",
			override: {
				mutator: {
					path: `mutators/index.ts`,
					name: `mutator`,
				},
			},
		},
		input: {
			...commonInputOptions,
			target: `${baseUrl}/docs/swagger.json`,
		},
		hooks: {
			...commonHooks,
		},
	},
};

fs.writeFileSync("./orval.config.js", `module.exports = ${JSON.stringify(oravalConfig, null, 2)}`);
