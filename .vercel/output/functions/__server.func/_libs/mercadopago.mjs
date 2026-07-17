import { i as __require, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/mercadopago/dist/mercadoPagoConfig.js
var require_mercadoPagoConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* SDK configuration module.
	*
	* Holds the {@link MercadoPagoConfig} class, which every API client
	* requires as its constructor argument. It stores the OAuth access token
	* and optional request-level settings (timeout, idempotency, platform IDs, etc.).
	*
	* @module mercadoPagoConfig
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MercadoPagoConfig = void 0;
	/**
	* Central configuration object for the MercadoPago Node.js SDK.
	*
	* Every API client (Payment, Order, Customer, etc.) receives an instance
	* of this class and reads the access token and request options from it.
	*
	* ```ts
	* const config = new MercadoPagoConfig({
	*   accessToken: 'APP_USR-...',
	*   options: { timeout: 5000, idempotencyKey: 'unique-key' },
	* });
	* const payment = new Payment(config);
	* ```
	*
	* @see {@link https://github.com/mercadopago/sdk-nodejs Documentation}
	*/
	var MercadoPagoConfig = class {
		/**
		* Creates a new SDK configuration.
		*
		* @param config - Access token and optional global request settings.
		*/
		constructor(config) {
			this.accessToken = config.accessToken;
			this.options = config.options;
		}
	};
	exports.MercadoPagoConfig = MercadoPagoConfig;
}));
//#endregion
//#region node_modules/mercadopago/dist/utils/config/index.js
var require_config = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* SDK-wide application configuration and HTTP header constants.
	*
	* Centralises every hard-coded value the SDK needs at runtime:
	* base URL, timeouts, retry policy, product/tracking identifiers,
	* and the standard header names required by the MercadoPago API.
	*
	* @module utils/config
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AppConfig = void 0;
	/**
	* Static configuration class consumed by {@link RestClient}.
	*
	* All members are static because the SDK is stateless — there is no
	* per-instance runtime that needs its own copy of these values.
	*/
	var AppConfig = class {
		/** Returns the running Node.js version (e.g. `v18.17.0`). */
		static getNodeVersion() {
			return process.version;
		}
		/** Returns the CPU architecture (e.g. `x64`, `arm64`). */
		static getNodeArchitecture() {
			return process.arch;
		}
		/** Returns the operating system platform (e.g. `darwin`, `linux`). */
		static getNodePlatform() {
			return process.platform;
		}
		/**
		* Builds the `X-Tracking-Id` header value.
		*
		* Encodes the Node.js major version, full version, and SDK version
		* so the API team can correlate requests with specific environments.
		*/
		static getTrackingId() {
			return "platform:" + this.getNodeVersion().substring(0, this.getNodeVersion().indexOf(".")) + "|" + this.getNodeVersion() + ",type:SDK" + this.SDK_VERSION + ",so;";
		}
		/**
		* Builds the `User-Agent` header value.
		*
		* Follows the pattern:
		* `MercadoPago Node.js SDK v{SDK_VERSION} (node {version}-{arch}-{platform})`
		*/
		static getUserAgent() {
			return "MercadoPago Node.js SDK v" + this.SDK_VERSION + " (node " + this.getNodeVersion() + "-" + this.getNodeArchitecture() + "-" + this.getNodePlatform() + ")";
		}
	};
	exports.AppConfig = AppConfig;
	/** Default HTTP timeout in milliseconds applied when no override is provided. */
	AppConfig.DEFAULT_TIMEOUT = 1e4;
	/** Default number of retry attempts for server errors (HTTP 5xx). */
	AppConfig.DEFAULT_RETRIES = 2;
	/** Base delay in milliseconds for exponential back-off between retries. */
	AppConfig.BASE_DELAY_MS = 1e3;
	/** Root URL for all MercadoPago REST API calls. */
	AppConfig.BASE_URL = "https://api.mercadopago.com";
	/** Internal MercadoPago product identifier used for telemetry. */
	AppConfig.PRODUCT_ID = "bc32b6ntrpp001u8nhkg";
	/**
	* Current SDK version string.
	*
	* Embedded into the `User-Agent` and `X-Tracking-Id` headers so the
	* API can attribute traffic to a specific SDK release.
	*/
	AppConfig.SDK_VERSION = "3.2.0";
	/**
	* Canonical HTTP header names used in every request to the MercadoPago API.
	*
	* Keeping them in one place prevents typos and makes it easy to audit
	* which custom headers the SDK sends.
	*/
	AppConfig.Headers = {
		AUTHORIZATION: "Authorization",
		CONTENT_TYPE: "Content-Type",
		USER_AGENT: "User-Agent",
		/** Ensures write operations are executed at most once. */
		IDEMPOTENCY_KEY: "X-Idempotency-Key",
		/** Internal MercadoPago product identifier for telemetry. */
		PRODUCT_ID: "X-Product-Id",
		/** SDK + Node.js version string for server-side analytics. */
		TRACKING_ID: "X-Tracking-Id",
		/** Corporation identifier for multi-account setups. */
		CORPORATION_ID: "X-Corporation-Id",
		/** Certified integrator identifier. */
		INTEGRATOR_ID: "X-Integrator-Id",
		/** Platform identifier assigned by MercadoPago. */
		PLATFORM_ID: "X-Platform-Id",
		/** MELI session identifier for session-level tracking. */
		MELI_SESSION_ID: "X-Meli-Session-Id",
		/** Comma-separated response nodes to expand. */
		EXPAND_RESPONDE_NODES: "X-Expand-Responde-Nodes",
		/** Card validation mode header. */
		CARD_VALIDATION: "X-Card-Validation",
		/** Signals the API to treat the request as a test transaction. */
		TEST_TOKEN: "X-Test-Token"
	};
}));
//#endregion
//#region node_modules/mercadopago/dist/utils/restClient/index.js
var require_restClient = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __rest = exports && exports.__rest || function(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RestClient = void 0;
	var config_1 = require_config();
	var crypto_1 = __require("crypto");
	/** HTTP 204 — the server processed the request but returns no body. */
	var NO_CONTENT = 204;
	function headersToRecord(headers) {
		const out = {};
		headers.forEach((value, key) => {
			if (!out[key]) out[key] = [];
			out[key].push(value);
		});
		return out;
	}
	exports.RestClient = class RestClient {
		/** Generates a UUID v4 idempotency key for write operations. */
		static generateIdempotencyKey() {
			return (0, crypto_1.randomUUID)();
		}
		/**
		* Appends query-string parameters to a URL.
		*
		* Skips `undefined` values so callers don't need to pre-filter.
		* Handles URLs that already contain a `?` by appending with `&`.
		*
		* @param url - Base URL (may already include a query string).
		* @param queryParams - Key-value pairs to append.
		* @returns The URL with the encoded query string.
		*/
		static appendQueryParamsToUrl(url, queryParams) {
			if (!queryParams) return url;
			const searchParams = new URLSearchParams();
			for (const key in queryParams) if (Object.prototype.hasOwnProperty.call(queryParams, key) && typeof queryParams[key] !== "undefined") searchParams.append(key, queryParams[key].toString());
			return url.includes("?") ? `${url}&${searchParams.toString()}` : `${url}?${searchParams.toString()}`;
		}
		/**
		* Executes a function with exponential back-off on failure.
		*
		* Retries only when the error has an HTTP status >= 500 (server error).
		* Client errors (4xx) are thrown immediately.
		* The delay doubles on each attempt: `BASE_DELAY_MS * 2^attempt`.
		*
		* @typeParam T - Return type of the wrapped function.
		* @param fn - The async operation to execute and potentially retry.
		* @param retries - Maximum number of attempts before giving up.
		*/
		static async retryWithExponentialBackoff(fn, retries) {
			let attempt = 1;
			const execute = async () => {
				try {
					return await fn();
				} catch (error) {
					if (attempt >= retries || error.status < 500) throw error;
					const delayMs = config_1.AppConfig.BASE_DELAY_MS * 2 ** attempt;
					await new Promise((resolve) => setTimeout(resolve, delayMs));
					attempt++;
					return execute();
				}
			};
			return execute();
		}
		/**
		* Performs an HTTP request against the MercadoPago API.
		*
		* This is the single exit point for all network I/O in the SDK.
		* It merges SDK defaults with caller-provided overrides, injects
		* required headers, and normalises the JSON response.
		*
		* - **204 No Content** → returns `{ api_response }` with no body.
		* - **2xx with body** → returns the parsed JSON with `api_response` appended.
		* - **Non-2xx** → throws the parsed error body.
		*
		* @typeParam T - Expected shape of the parsed JSON response.
		* @param endpoint - API path relative to the base URL (e.g. `/v1/payments`).
		* @param config - Merged request settings (headers, body, method, options, etc.).
		* @returns Parsed API response with an `api_response` envelope.
		*/
		static async fetch(endpoint, config) {
			const _a = config || {}, { timeout = config_1.AppConfig.DEFAULT_TIMEOUT, idempotencyKey = RestClient.generateIdempotencyKey(), queryParams, method = "GET", retries = config_1.AppConfig.DEFAULT_RETRIES, corporationId, integratorId, platformId, meliSessionId, expandResponseNodes, cardValidation, testToken } = _a, customConfig = __rest(_a, [
				"timeout",
				"idempotencyKey",
				"queryParams",
				"method",
				"retries",
				"corporationId",
				"integratorId",
				"platformId",
				"meliSessionId",
				"expandResponseNodes",
				"cardValidation",
				"testToken"
			]);
			const url = RestClient.appendQueryParamsToUrl(`${config_1.AppConfig.BASE_URL}${endpoint}`, queryParams);
			customConfig.headers = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, customConfig.headers), {
				[config_1.AppConfig.Headers.CONTENT_TYPE]: "application/json",
				[config_1.AppConfig.Headers.PRODUCT_ID]: config_1.AppConfig.PRODUCT_ID,
				[config_1.AppConfig.Headers.TRACKING_ID]: config_1.AppConfig.getTrackingId(),
				[config_1.AppConfig.Headers.USER_AGENT]: config_1.AppConfig.getUserAgent()
			}), corporationId ? { [config_1.AppConfig.Headers.CORPORATION_ID]: corporationId } : {}), integratorId ? { [config_1.AppConfig.Headers.INTEGRATOR_ID]: integratorId } : {}), platformId ? { [config_1.AppConfig.Headers.PLATFORM_ID]: platformId } : {}), meliSessionId ? { [config_1.AppConfig.Headers.MELI_SESSION_ID]: meliSessionId } : {}), expandResponseNodes ? { [config_1.AppConfig.Headers.EXPAND_RESPONDE_NODES]: expandResponseNodes } : {}), cardValidation ? { [config_1.AppConfig.Headers.CARD_VALIDATION]: cardValidation } : {}), testToken ? { [config_1.AppConfig.Headers.TEST_TOKEN]: testToken.toString() } : {});
			if (method && method !== "GET") customConfig.headers = Object.assign(Object.assign({}, customConfig.headers), { [config_1.AppConfig.Headers.IDEMPOTENCY_KEY]: idempotencyKey });
			let response;
			const fetchFn = async () => {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), timeout);
				try {
					response = await fetch(url, Object.assign(Object.assign({}, customConfig), {
						method,
						signal: controller.signal
					}));
				} finally {
					clearTimeout(timeoutId);
				}
				if (response.ok) {
					if (response.status === NO_CONTENT) return { api_response: {
						status: response.status,
						headers: headersToRecord(response.headers)
					} };
					const data = await response.json();
					data.api_response = {
						status: response.status,
						headers: headersToRecord(response.headers)
					};
					return data;
				} else throw await response.json();
			};
			return await RestClient.retryWithExponentialBackoff(fetchFn, retries);
		}
	};
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/cardToken/create/index.js
var require_create$13 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the create-card-token operation.
	*
	* Sends a `POST /v1/card_tokens` request to tokenize card data and
	* return a single-use token for PCI-compliant payment creation.
	*
	* @module cardToken/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a card token via `POST /v1/card_tokens`.
	*
	* @returns The card token response containing the token ID and card metadata.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/v1/card_tokens", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "POST"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/cardToken/index.js
var require_cardToken = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Card Token client for the MercadoPago API.
	*
	* Provides a method to tokenize card data, replacing sensitive card
	* numbers and security codes with a single-use token that can be safely
	* transmitted and used to create payments without handling raw PAN data.
	*
	* @module cardToken
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CardToken = void 0;
	var create_1 = __importDefault(require_create$13());
	/**
	* Client facade for MercadoPago card tokenization operations.
	*
	* Use this class to create a temporary, single-use token from card
	* details or a previously saved card ID, ensuring PCI DSS compliance
	* by avoiding direct handling of full card numbers on the server side.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var CardToken = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a card token from card details or a saved card ID.
		*
		* The returned token ID should be used in the `token` field when
		* creating a payment.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/cardtoken/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
	};
	exports.CardToken = CardToken;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/get/index.js
var require_get$13 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer card retrieval operation.
	*
	* Sends a GET request to `/v1/customers/:id/cards/:card_id` to fetch
	* a single saved card belonging to a customer.
	*
	* @module clients/customerCard/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a specific saved card for a customer.
	*
	* @returns The card record matching the given customer and card IDs.
	*/
	function get({ customerId, cardId, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/create/index.js
var require_create$12 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer card creation operation.
	*
	* Sends a POST request to `/v1/customers/:id/cards` to save a new
	* payment card for a customer using a previously generated card token.
	*
	* @module clients/customerCard/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Save a new payment card for a customer.
	*
	* @returns The newly created card record.
	*/
	function create({ customerId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "POST"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/remove/index.js
var require_remove$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer card removal operation.
	*
	* Sends a DELETE request to `/v1/customers/:id/cards/:card_id` to
	* remove a saved payment card from a customer's wallet.
	*
	* @module clients/customerCard/remove
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = remove;
	var restClient_1 = require_restClient();
	/**
	* Remove a saved card from a customer's wallet.
	*
	* @returns The card record that was deleted.
	*/
	function remove({ customerId, cardId, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			method: "DELETE"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/update/index.js
var require_update$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer card update operation.
	*
	* Sends a PUT request to `/v1/customers/:id/cards/:card_id` to modify
	* an existing saved card (e.g. expiration date or cardholder details).
	*
	* @module clients/customerCard/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing saved card for a customer.
	*
	* @returns The updated card record.
	*/
	function update({ customerId, cardId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards/${cardId}`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "PUT"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/list/index.js
var require_list$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer card list operation.
	*
	* Sends a GET request to `/v1/customers/:id/cards` to retrieve all
	* saved payment cards for a customer.
	*
	* @module clients/customerCard/list
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = list;
	var restClient_1 = require_restClient();
	/**
	* List all saved payment cards for a customer.
	*
	* @returns An array of card records belonging to the customer.
	*/
	function list({ customerId, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}/cards`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customerCard/index.js
var require_customerCard = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* CustomerCard API client for the MercadoPago Node.js SDK.
	*
	* Provides a high-level facade for managing the saved payment cards
	* associated with a customer through the
	* `/v1/customers/:customer_id/cards` resource.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/cards/save-card/post MercadoPago Customer Cards API reference}
	* @module clients/customerCard
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CustomerCard = void 0;
	var get_1 = __importDefault(require_get$13());
	var create_1 = __importDefault(require_create$12());
	var remove_1 = __importDefault(require_remove$1());
	var update_1 = __importDefault(require_update$7());
	var list_1 = __importDefault(require_list$2());
	/**
	* Client for the MercadoPago Customer Cards API.
	*
	* Exposes CRUD and list operations on the saved payment cards that
	* belong to a specific customer.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/cards/save-card/post API reference}
	*/
	var CustomerCard = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Save a new payment card for a customer using a card token.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
		*/
		create({ customerId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				customerId,
				body,
				config: this.config
			});
		}
		/**
		* Retrieve a specific saved card for a customer.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
		*/
		get({ customerId, cardId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				customerId,
				cardId,
				config: this.config
			});
		}
		/**
		* Remove a saved card from a customer's wallet.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
		*/
		remove({ customerId, cardId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, remove_1.default)({
				customerId,
				cardId,
				config: this.config
			});
		}
		/**
		* Update the details of an existing saved card (e.g. expiration date or cardholder info).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
		*/
		update({ customerId, cardId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				customerId,
				cardId,
				body,
				config: this.config
			});
		}
		/**
		* List all saved payment cards for a customer.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/list.ts Usage Example  }.
		*/
		list({ customerId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, list_1.default)({
				customerId,
				config: this.config
			});
		}
	};
	exports.CustomerCard = CustomerCard;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/get/index.js
var require_get$12 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer retrieval operation.
	*
	* Sends a GET request to `/v1/customers/:id` to fetch a single
	* customer record from MercadoPago.
	*
	* @module clients/customer/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a customer by its unique identifier.
	*
	* @returns The customer record matching the given ID.
	*/
	function get({ customerId, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/create/index.js
var require_create$11 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer creation operation.
	*
	* Sends a POST request to `/v1/customers` to register a new customer
	* in MercadoPago.
	*
	* @module clients/customer/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new customer via the MercadoPago API.
	*
	* @returns The newly created customer record.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/v1/customers", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "POST"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/remove/index.js
var require_remove = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer removal operation.
	*
	* Sends a DELETE request to `/v1/customers/:id` to remove an existing
	* customer from MercadoPago.
	*
	* @module clients/customer/remove
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = remove;
	var restClient_1 = require_restClient();
	/**
	* Remove a customer by its unique identifier.
	*
	* @returns The customer record that was deleted.
	*/
	function remove({ customerId, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			method: "DELETE"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/update/index.js
var require_update$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer update operation.
	*
	* Sends a PUT request to `/v1/customers/:id` to modify an existing
	* customer record in MercadoPago.
	*
	* @module clients/customer/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing customer's information.
	*
	* @returns The updated customer record.
	*/
	function update({ customerId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/customers/${customerId}`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "PUT"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/search/index.js
var require_search$9 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the customer search operation.
	*
	* Sends a GET request to `/v1/customers/search` with optional query
	* parameters to find customers matching the given filters.
	*
	* @module clients/customer/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search for customers using optional filters and pagination.
	*
	* @returns A paginated page of customer results.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/v1/customers/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/customer/index.js
var require_customer = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Customer API client for the MercadoPago Node.js SDK.
	*
	* Provides a high-level facade for managing customers and their saved
	* payment cards through the `/v1/customers` resource.  Card-related
	* convenience methods delegate to the {@link CustomerCard} client
	* internally.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post MercadoPago Customers API reference}
	* @module clients/customer
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Customer = void 0;
	var get_1 = __importDefault(require_get$12());
	var create_1 = __importDefault(require_create$11());
	var remove_1 = __importDefault(require_remove());
	var update_1 = __importDefault(require_update$6());
	var search_1 = __importDefault(require_search$9());
	var customerCard_1 = require_customerCard();
	/**
	* Client for the MercadoPago Customers API.
	*
	* Exposes CRUD operations on customers as well as convenience methods
	* for managing the saved payment cards associated with each customer.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/customers/create-customer/post API reference}
	*/
	var Customer = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
			this.customerCard = new customerCard_1.CustomerCard(mercadoPagoConfig);
		}
		/**
		* Create a new customer in MercadoPago.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/create.ts Usage Example  }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve a single customer by its unique identifier.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/get.ts Usage Example  }.
		*/
		get({ customerId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				customerId,
				config: this.config
			});
		}
		/**
		* Remove an existing customer by its unique identifier.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/remove.ts Usage Example  }.
		*/
		remove({ customerId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, remove_1.default)({
				customerId,
				config: this.config
			});
		}
		/**
		* Update an existing customer's information.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/update.ts Usage Example  }.
		*/
		update({ customerId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				customerId,
				body,
				config: this.config
			});
		}
		/**
		* Search for customers using optional filters and pagination.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/search.ts Usage Example  }.
		*/
		search(CustomerSearchOptions = {}) {
			const { options, requestOptions } = CustomerSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
		/**
		* Save a new payment card for a customer using a card token.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/createCard.ts Usage Example  }.
		*/
		createCard({ customerId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return this.customerCard.create({
				customerId,
				body
			});
		}
		/**
		* Retrieve a specific saved card for a customer.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/getCard.ts Usage Example  }.
		*/
		getCard({ customerId, cardId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return this.customerCard.get({
				customerId,
				cardId
			});
		}
		/**
		* Remove a saved card from a customer's account.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/removeCard.ts Usage Example  }.
		*/
		removeCard({ customerId, cardId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return this.customerCard.remove({
				customerId,
				cardId
			});
		}
		/**
		* List all saved payment cards for a customer.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/customer/listCards.ts Usage Example  }.
		*/
		listCards({ customerId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return this.customerCard.list({ customerId });
		}
	};
	exports.Customer = Customer;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/create/index.js
var require_create$10 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	/**
	* Create advanced-payment operation.
	*
	* Sends a `POST /v1/advanced_payments` request to create a marketplace
	* split payment distributed among multiple sellers.
	*
	* @module advancedPayment/create
	*/
	var restClient_1 = require_restClient();
	/**
	* Create a new advanced (split) payment.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/v1/advanced_payments", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/get/index.js
var require_get$11 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	/**
	* Get advanced-payment operation.
	*
	* Sends a `GET /v1/advanced_payments/:id` request.
	*
	* @module advancedPayment/get
	*/
	var restClient_1 = require_restClient();
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${id}`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/search/index.js
var require_search$8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	/**
	* Search advanced-payments operation.
	*
	* Sends a `GET /v1/advanced_payments/search` request.
	*
	* @module advancedPayment/search
	*/
	var restClient_1 = require_restClient();
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/v1/advanced_payments/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/update/index.js
var require_update$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	/**
	* Update advanced-payment operation.
	*
	* Sends a `PUT /v1/advanced_payments/:id` request.
	*
	* @module advancedPayment/update
	*/
	var restClient_1 = require_restClient();
	function update({ id, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/cancel/index.js
var require_cancel$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cancel;
	/**
	* Cancel advanced-payment operation.
	*
	* Sends a `PUT /v1/advanced_payments/:id` with `{ status: "cancelled" }`.
	*
	* @module advancedPayment/cancel
	*/
	var restClient_1 = require_restClient();
	function cancel({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify({ status: "cancelled" })
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/capture/index.js
var require_capture$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = capture;
	/**
	* Capture advanced-payment operation.
	*
	* Sends a `PUT /v1/advanced_payments/:id` with `{ capture: true }` to
	* finalise a two-step (authorise → capture) payment flow.
	*
	* @module advancedPayment/capture
	*/
	var restClient_1 = require_restClient();
	function capture({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify({ capture: true })
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/updateReleaseDate/index.js
var require_updateReleaseDate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = updateReleaseDate;
	/**
	* Update-release-date operation for advanced payments.
	*
	* Sends a `POST /v1/advanced_payments/:id/disburses` with the new release
	* date to control when funds become available to the sellers.
	*
	* @module advancedPayment/updateReleaseDate
	*/
	var restClient_1 = require_restClient();
	function updateReleaseDate({ id, releaseDate, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${id}/disburses`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify({ money_release_date: releaseDate })
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/advancedPayment/index.js
var require_advancedPayment = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AdvancedPayment = void 0;
	/**
	* AdvancedPayment (marketplace split-payments) client for the MercadoPago API.
	*
	* Enables marketplace integrations to collect a single payment and distribute
	* the funds among multiple sellers (disbursements). Supports two-step flows
	* (authorise → capture) and individual disbursement release-date control.
	*
	* @module advancedPayment
	*/
	var create_1 = __importDefault(require_create$10());
	var get_1 = __importDefault(require_get$11());
	var search_1 = __importDefault(require_search$8());
	var update_1 = __importDefault(require_update$5());
	var cancel_1 = __importDefault(require_cancel$2());
	var capture_1 = __importDefault(require_capture$2());
	var updateReleaseDate_1 = __importDefault(require_updateReleaseDate());
	/**
	* Client facade for MercadoPago advanced (split) payment operations.
	*/
	var AdvancedPayment = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new advanced (split) payment distributed among multiple sellers.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve an advanced payment by its ID.
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Search advanced payments with optional filters and pagination.
		*/
		search(advancedPaymentSearchOptions = {}) {
			const { options, requestOptions } = advancedPaymentSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
		/**
		* Update an existing advanced payment with arbitrary fields.
		*/
		update({ id, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				id,
				body,
				config: this.config
			});
		}
		/**
		* Cancel a pending advanced payment by setting its status to `cancelled`.
		*/
		cancel({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, cancel_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Capture a previously authorised advanced payment.
		*/
		capture({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, capture_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Change the money release date for all disbursements of an advanced payment.
		*/
		updateReleaseDate({ id, releaseDate, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, updateReleaseDate_1.default)({
				id,
				releaseDate,
				config: this.config
			});
		}
	};
	exports.AdvancedPayment = AdvancedPayment;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/chargeback/get/index.js
var require_get$10 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	/**
	* Get chargeback operation.
	*
	* Sends a `GET /v1/chargebacks/:id` request.
	*
	* @module chargeback/get
	*/
	var restClient_1 = require_restClient();
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/chargebacks/${id}`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/chargeback/search/index.js
var require_search$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	/**
	* Search chargebacks operation.
	*
	* Sends a `GET /v1/chargebacks/search` request.
	*
	* @module chargeback/search
	*/
	var restClient_1 = require_restClient();
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/v1/chargebacks/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/chargeback/index.js
var require_chargeback = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Chargeback = void 0;
	/**
	* Chargeback client for the MercadoPago API.
	*
	* Provides read-only access to chargeback dispute records initiated by
	* cardholders through their issuing bank.
	*
	* @module chargeback
	*/
	var get_1 = __importDefault(require_get$10());
	var search_1 = __importDefault(require_search$7());
	var Chargeback = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve a single chargeback by its ID.
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Search chargebacks with optional filters.
		*/
		search(chargebackSearchOptions = {}) {
			const { options, requestOptions } = chargebackSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
	};
	exports.Chargeback = Chargeback;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/disbursementRefund/listAll/index.js
var require_listAll = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = listAll;
	/**
	* List-all disbursement refunds operation.
	*
	* Sends a `GET /v1/advanced_payments/:id/refunds` request.
	*
	* @module disbursementRefund/listAll
	*/
	var restClient_1 = require_restClient();
	function listAll({ advancedPaymentId, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${advancedPaymentId}/refunds`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/disbursementRefund/createAll/index.js
var require_createAll = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = createAll;
	/**
	* Create-all disbursement refunds operation.
	*
	* Sends a `POST /v1/advanced_payments/:id/refunds` to refund all
	* disbursements of an advanced payment at once.
	*
	* @module disbursementRefund/createAll
	*/
	var restClient_1 = require_restClient();
	function createAll({ advancedPaymentId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${advancedPaymentId}/refunds`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/disbursementRefund/create/index.js
var require_create$9 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	/**
	* Create disbursement refund operation.
	*
	* Sends a `POST /v1/advanced_payments/:id/disbursements/:disbursementId/refunds`
	* to refund a specific disbursement by amount.
	*
	* @module disbursementRefund/create
	*/
	var restClient_1 = require_restClient();
	function create({ advancedPaymentId, disbursementId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/advanced_payments/${advancedPaymentId}/disbursements/${disbursementId}/refunds`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/disbursementRefund/index.js
var require_disbursementRefund = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DisbursementRefund = void 0;
	/**
	* DisbursementRefund client for the MercadoPago API.
	*
	* Enables full and partial refunds of individual disbursements within an
	* advanced (split) payment.
	*
	* @module disbursementRefund
	*/
	var listAll_1 = __importDefault(require_listAll());
	var createAll_1 = __importDefault(require_createAll());
	var create_1 = __importDefault(require_create$9());
	var DisbursementRefund = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* List all refunds for an advanced payment.
		*/
		listAll({ advancedPaymentId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, listAll_1.default)({
				advancedPaymentId,
				config: this.config
			});
		}
		/**
		* Refund all disbursements of an advanced payment at once.
		*/
		createAll({ advancedPaymentId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, createAll_1.default)({
				advancedPaymentId,
				body,
				config: this.config
			});
		}
		/**
		* Refund a specific disbursement by amount.
		*/
		create({ advancedPaymentId, disbursementId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				advancedPaymentId,
				disbursementId,
				body,
				config: this.config
			});
		}
	};
	exports.DisbursementRefund = DisbursementRefund;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/invoice/get/index.js
var require_get$9 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-invoice operation.
	*
	* Sends a `GET /authorized_payments/{id}` request to retrieve a single
	* subscription invoice by its unique identifier.
	*
	* @module invoice/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a subscription invoice (authorized payment) by ID.
	*
	* @returns The invoice details including status, amount, and payer information.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/authorized_payments/${id}`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/invoice/search/index.js
var require_search$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the search-invoices operation.
	*
	* Sends a `GET /authorized_payments/search` request to query subscription
	* invoices matching the given filter criteria.
	*
	* @module invoice/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search subscription invoices with optional filters.
	*
	* @returns A paginated response containing the matched invoices.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/authorized_payments/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/invoice/index.js
var require_invoice = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Invoice (subscription billing) client for the MercadoPago API.
	*
	* Provides methods to retrieve and search subscription invoices
	* (authorized payments) generated by recurring preapprovals.
	*
	* @module invoice
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Invoice = void 0;
	var get_1 = __importDefault(require_get$9());
	var search_1 = __importDefault(require_search$6());
	/**
	* Client facade for MercadoPago subscription invoice operations.
	*
	* Use this class to fetch a single invoice by ID or to search invoices
	* by subscription, payer, or payment criteria.
	*/
	var Invoice = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve a single subscription invoice by its ID.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/invoice/get.ts Usage Example }.
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Search subscription invoices with optional filters.
		*
		* Filters include preapproval ID, payer ID, payment ID, and pagination.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/invoice/search.ts Usage Example }.
		*/
		search(ivoicesSearchOptions = {}) {
			const { options, requestOptions } = ivoicesSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
	};
	exports.Invoice = Invoice;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/identificationType/list/index.js
var require_list$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the list-identification-types operation.
	*
	* Sends a `GET /v1/identification_types` request to retrieve the
	* accepted identification document types for the seller's country.
	*
	* @module identificationType/list
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = list;
	var restClient_1 = require_restClient();
	/**
	* Retrieve all accepted identification document types.
	*
	* @returns An array of identification types with their constraints.
	*/
	function list({ config }) {
		return restClient_1.RestClient.fetch("/v1/identification_types", Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/identificationType/index.js
var require_identificationType = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Identification Type client for the MercadoPago API.
	*
	* Provides a method to list the accepted identification document types
	* (e.g. CPF, DNI, CURP) for the seller's country, which are required
	* when collecting payer or cardholder information.
	*
	* @module identificationType
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IdentificationType = void 0;
	var list_1 = __importDefault(require_list$1());
	/**
	* Client facade for querying accepted identification document types.
	*
	* Each MercadoPago country/site accepts a specific set of ID document
	* types. Use this class to retrieve them so you can present the correct
	* options to the buyer during checkout.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api/identification-types/get Documentation }.
	*/
	var IdentificationType = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* List all accepted identification document types for the account's country.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/identificationtype/list.ts Usage Example }.
		*/
		list(identificationTypeListOptions = {}) {
			const { requestOptions } = identificationTypeListOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, list_1.default)({ config: this.config });
		}
	};
	exports.IdentificationType = IdentificationType;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentRefund/get/index.js
var require_get$8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-refund operation.
	*
	* Sends a `GET /v1/payments/{payment_id}/refunds/{refund_id}` request
	* to retrieve the details of a specific refund.
	*
	* @module paymentRefund/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a specific refund by payment ID and refund ID.
	*
	* @returns The refund details including status, amount, and source.
	*/
	function get({ payment_id, refund_id, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds/${refund_id}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentRefund/create/index.js
var require_create$8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the create-refund operation.
	*
	* Sends a `POST /v1/payments/{payment_id}/refunds` request to create a
	* partial refund on the specified payment.
	*
	* @module paymentRefund/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a partial refund on the specified payment.
	*
	* @returns The newly created refund with its status and amount.
	*/
	function create({ payment_id, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentRefund/list/index.js
var require_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the list-refunds operation.
	*
	* Sends a `GET /v1/payments/{payment_id}/refunds/` request to retrieve
	* all refunds associated with the specified payment.
	*
	* @module paymentRefund/list
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = list;
	var restClient_1 = require_restClient();
	/**
	* List all refunds for the specified payment.
	*
	* @returns An array of refund records for the payment.
	*/
	function list({ payment_id, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds/`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentRefund/total/index.js
var require_total = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the total-refund operation.
	*
	* Sends a `POST /v1/payments/{payment_id}/refunds` with an empty body
	* to refund the full amount of the specified payment.
	*
	* @module paymentRefund/total
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = total;
	var restClient_1 = require_restClient();
	/**
	* Create a total (full-amount) refund on the specified payment.
	*
	* @returns The newly created refund covering the full payment amount.
	*/
	function total({ payment_id, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${payment_id}/refunds`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify({})
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentRefund/index.js
var require_paymentRefund = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Payment Refund client for the MercadoPago API.
	*
	* Provides methods to create partial or total refunds on a payment,
	* retrieve a specific refund, and list all refunds associated with a payment.
	*
	* @module paymentRefund
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PaymentRefund = void 0;
	var get_1 = __importDefault(require_get$8());
	var create_1 = __importDefault(require_create$8());
	var list_1 = __importDefault(require_list());
	var total_1 = __importDefault(require_total());
	/**
	* Client facade for MercadoPago payment refund operations.
	*
	* Supports creating partial refunds (with a specified amount), total
	* refunds (full payment amount), retrieving individual refund details,
	* and listing all refunds for a given payment.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var PaymentRefund = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve a specific refund by payment ID and refund ID.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/get.ts Usage Example }.
		*/
		get({ payment_id, refund_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				payment_id,
				refund_id,
				config: this.config
			});
		}
		/**
		* Create a partial refund on a payment.
		*
		* To refund a specific amount, include the `amount` field in the body.
		* For a full refund, use the {@link total} method instead.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
		*/
		create({ payment_id, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				payment_id,
				body,
				config: this.config
			});
		}
		/**
		* Create a total (full-amount) refund on a payment.
		*
		* Refunds the entire payment amount. No request body is required.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
		*/
		total({ payment_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, total_1.default)({
				payment_id,
				config: this.config
			});
		}
		/**
		* List all refunds associated with a payment.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/list.ts Usage Example }.
		*/
		list({ payment_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, list_1.default)({
				payment_id,
				config: this.config
			});
		}
	};
	exports.PaymentRefund = PaymentRefund;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentMethod/get/index.js
var require_get$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-payment-methods operation.
	*
	* Sends a `GET /v1/payment_methods` request to retrieve all payment
	* methods available for the authenticated seller's site/country.
	*
	* @module paymentMethod/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve the list of available payment methods.
	*
	* @returns An array of payment methods with their configuration and constraints.
	*/
	function get({ config }) {
		return restClient_1.RestClient.fetch("/v1/payment_methods", Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/paymentMethod/index.js
var require_paymentMethod = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Payment Method client for the MercadoPago API.
	*
	* Provides a method to retrieve the list of payment methods available
	* for the authenticated account's country/site, including card brands,
	* bank transfers, and off-line payment options.
	*
	* @module paymentMethod
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PaymentMethod = void 0;
	var get_1 = __importDefault(require_get$7());
	/**
	* Client facade for querying available MercadoPago payment methods.
	*
	* Use this class to discover which payment methods (credit cards, debit
	* cards, bank transfers, tickets, etc.) are accepted for the seller's
	* site and country.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var PaymentMethod = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve all payment methods available for the authenticated account.
		*
		* Returns an array of payment methods with their settings, amount
		* constraints, and processing modes.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/paymentmethod/get.ts Usage Example }.
		*/
		get(paymentMethodsGetOptions = {}) {
			const { requestOptions } = paymentMethodsGetOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({ config: this.config });
		}
	};
	exports.PaymentMethod = PaymentMethod;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/capture/index.js
var require_capture$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = capture;
	/**
	* Capture-payment operation.
	*
	* Sends a `PUT /v1/payments/:id` request with `{ capture: true }` to
	* finalize a previously authorized (pre-auth) payment.  An optional
	* `transaction_amount` enables partial captures.
	*
	* @module clients/payment/capture
	*/
	var restClient_1 = require_restClient();
	/**
	* Capture an authorized payment.
	*
	* @param id                 - Identifier of the authorized payment to capture.
	* @param transaction_amount - Amount to capture; omit for a full capture, provide a
	*                             lower value for a partial capture.
	* @param config             - SDK configuration including the access token.
	* @returns The updated payment resource with `captured: true`.
	*/
	function capture({ id, transaction_amount, config }) {
		const captureBody = {
			capture: true,
			transaction_amount
		};
		return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(captureBody)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/search/index.js
var require_search$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	/**
	* Search-payments operation.
	*
	* Sends a `GET /v1/payments/search` request with the supplied query
	* parameters and returns a paginated list of matching payments.
	*
	* @module clients/payment/search
	*/
	var restClient_1 = require_restClient();
	/**
	* Search for payments belonging to the authenticated collector.
	*
	* All properties in `options` are forwarded as query-string parameters,
	* allowing pagination, sorting, date-range filtering, and custom filters.
	*
	* @param options - Search filters, sorting, and pagination parameters.
	* @param config  - SDK configuration including the access token.
	* @returns Paginated search results with paging metadata.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/v1/payments/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/cancel/index.js
var require_cancel$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cancel;
	/**
	* Cancel-payment operation.
	*
	* Sends a `PUT /v1/payments/:id` request with `{ status: "cancelled" }`
	* to transition a pending or in-process payment into the `cancelled` state.
	*
	* @module clients/payment/cancel
	*/
	var restClient_1 = require_restClient();
	/**
	* Cancel a payment that has not yet been approved.
	*
	* @param id     - Identifier of the payment to cancel.
	* @param config - SDK configuration including the access token.
	* @returns The updated payment resource with status `cancelled`.
	*/
	function cancel({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify({ status: "cancelled" })
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/create/index.js
var require_create$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	/**
	* Create-payment operation.
	*
	* Sends a `POST /v1/payments` request to the MercadoPago API and returns
	* the newly created {@link PaymentResponse}.
	*
	* @module clients/payment/create
	*/
	var restClient_1 = require_restClient();
	/**
	* Create a new payment.
	*
	* @param body   - Payment creation payload (amount, payer, method, etc.).
	* @param config - SDK configuration including the access token.
	* @returns The full payment resource as persisted by the API.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/v1/payments", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/get/index.js
var require_get$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	/**
	* Get-payment operation.
	*
	* Sends a `GET /v1/payments/:id` request to the MercadoPago API and
	* returns the full {@link PaymentResponse} for the given payment.
	*
	* @module clients/payment/get
	*/
	var restClient_1 = require_restClient();
	/**
	* Retrieve a single payment by its unique identifier.
	*
	* @param id     - Payment identifier to look up.
	* @param config - SDK configuration including the access token.
	* @returns The full payment resource.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/payments/${id}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/payment/index.js
var require_payment = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Payment = void 0;
	/**
	* Payment API client -- facade for the MercadoPago Payments v1 endpoints.
	*
	* Provides high-level methods to create, retrieve, search, capture, and
	* cancel payments.  Each method delegates to a dedicated operation module
	* that calls the underlying {@link RestClient}.
	*
	* @module clients/payment
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-api-payments/create-payment/post Payments API reference}
	*/
	var capture_1 = __importDefault(require_capture$1());
	var search_1 = __importDefault(require_search$5());
	var cancel_1 = __importDefault(require_cancel$1());
	var create_1 = __importDefault(require_create$7());
	var get_1 = __importDefault(require_get$6());
	/**
	* Client that exposes every operation available on the MercadoPago Payments API.
	*
	* Instantiate with a {@link MercadoPagoConfig} that holds the access token and
	* optional global request settings.  Per-call `requestOptions` are merged on
	* top of the global configuration for each request.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Payments API reference}
	*/
	var Payment = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Search payments that belong to the authenticated collector.
		*
		* Supports pagination, sorting, date-range filtering, and arbitrary
		* query-parameter filters forwarded to `GET /v1/payments/search`.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/search.ts Usage Example}
		*/
		search(paymentSearchOptions = {}) {
			const { options, requestOptions } = paymentSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
		/**
		* Cancel a pending or in-process payment by setting its status to `cancelled`.
		*
		* Only payments that have not yet been approved can be cancelled.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/cancel.ts Usage Example}
		*/
		cancel({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, cancel_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Capture a previously authorized (pre-auth) payment.
		*
		* When the payment was created with `capture: false`, this method finalizes
		* the charge.  An optional `transaction_amount` allows partial captures.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/capture.ts Usage Example}
		*/
		capture({ id, transaction_amount, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, capture_1.default)({
				id,
				transaction_amount,
				config: this.config
			});
		}
		/**
		* Create a new payment via `POST /v1/payments`.
		*
		* The request body must contain at least a `transaction_amount`, a `payer`,
		* and a `payment_method_id` (or a card `token`).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/create.ts Usage Example}
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve a single payment by its unique identifier.
		*
		* Calls `GET /v1/payments/:id` and returns the full payment resource.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/get.ts Usage Example}
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
	};
	exports.Payment = Payment;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApproval/create/index.js
var require_create$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "create subscription" operation.
	*
	* Sends a POST to `/preapproval/` and returns the newly created
	* subscription, including the `init_point` authorization URL.
	*
	* @module clients/preApproval/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new recurring subscription via the MercadoPago API.
	*
	* @returns The created subscription with its server-assigned `id` and `init_point`.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/preapproval/", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApproval/get/index.js
var require_get$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "get subscription" operation.
	*
	* Sends a GET to `/preapproval/{id}` and returns the full
	* subscription resource.
	*
	* @module clients/preApproval/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve an existing subscription by its unique identifier.
	*
	* @returns The full subscription resource.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/preapproval/${id}`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApproval/search/index.js
var require_search$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "search subscriptions" operation.
	*
	* Sends a GET to `/preapproval/search` with optional query parameters
	* and returns a paginated list of matching subscriptions.
	*
	* @module clients/preApproval/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search recurring subscriptions using optional filters.
	*
	* @returns A paginated result containing matching subscription records.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/preapproval/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApproval/update/index.js
var require_update$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "update subscription" operation.
	*
	* Sends a PUT to `/preapproval/{id}` with the modified fields
	* and returns the updated subscription resource.
	*
	* @module clients/preApproval/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing subscription (e.g. change status, amount, or card token).
	*
	* @returns The updated subscription resource.
	*/
	function update({ id, body, config }) {
		return restClient_1.RestClient.fetch(`/preapproval/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApproval/index.js
var require_preApproval = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Subscription (PreApproval) client for the MercadoPago Node SDK.
	*
	* A PreApproval represents an individual recurring subscription that
	* charges a buyer on a regular schedule. It is optionally linked to a
	* {@link PreApprovalPlan} template that defines the billing terms.
	* This module exposes CRUD + search operations against the
	* `/preapproval` endpoint.
	*
	* @module clients/preApproval
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreApproval = void 0;
	var create_1 = __importDefault(require_create$6());
	var get_1 = __importDefault(require_get$5());
	var search_1 = __importDefault(require_search$4());
	var update_1 = __importDefault(require_update$4());
	/**
	* Client for managing recurring subscriptions (pre-approvals).
	*
	* Each subscription ties a payer to a recurring billing schedule.
	* The `init_point` URL redirects the buyer to authorize the
	* recurring charge.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/subscriptions/create-preapproval/post Documentation }.
	*/
	var PreApproval = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new subscription for a buyer.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve an existing subscription by its unique identifier.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/get.ts Usage Example }.
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Search subscriptions using filters such as status, payer, or plan.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/search.ts Usage Example }.
		*/
		search(preApprovalSearchData = {}) {
			const { options, requestOptions } = preApprovalSearchData;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
		/**
		* Update an existing subscription (e.g. change status, amount, or card token).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preApproval/update.ts Usage Example }.
		*/
		update({ id, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				id,
				body,
				config: this.config
			});
		}
	};
	exports.PreApproval = PreApproval;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApprovalPlan/get/index.js
var require_get$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "get subscription plan" operation.
	*
	* Sends a GET to `/preapproval_plan/{id}` and returns the full
	* plan resource.
	*
	* @module clients/preApprovalPlan/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve an existing subscription plan by its unique identifier.
	*
	* @returns The full plan resource.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/preapproval_plan/${id}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApprovalPlan/create/index.js
var require_create$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "create subscription plan" operation.
	*
	* Sends a POST to `/preapproval_plan/` and returns the newly created
	* plan template, including the `init_point` subscription URL.
	*
	* @module clients/preApprovalPlan/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new subscription plan template via the MercadoPago API.
	*
	* @returns The created plan with its server-assigned `id` and `init_point`.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/preapproval_plan/", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApprovalPlan/update/index.js
var require_update$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "update subscription plan" operation.
	*
	* Sends a PUT to `/preapproval_plan/{id}` with the modified fields
	* and returns the updated plan resource.
	*
	* @module clients/preApprovalPlan/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing subscription plan template.
	*
	* @returns The updated plan resource.
	*/
	function update({ id, updatePreApprovalPlanRequest, config }) {
		return restClient_1.RestClient.fetch(`/preapproval_plan/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(updatePreApprovalPlanRequest)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApprovalPlan/search/index.js
var require_search$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "search subscription plans" operation.
	*
	* Sends a GET to `/preapproval_plan/search` with optional query
	* parameters and returns a paginated list of matching plans.
	*
	* @module clients/preApprovalPlan/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search subscription plan templates using optional filters.
	*
	* @returns A paginated result containing matching plan records.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/preapproval_plan/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preApprovalPlan/index.js
var require_preApprovalPlan = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Subscription Plan (PreApprovalPlan) client for the MercadoPago Node SDK.
	*
	* A PreApprovalPlan is a reusable template that defines the billing terms
	* (frequency, amount, free trial, allowed payment methods) for recurring
	* subscriptions. Individual {@link PreApproval} subscriptions can reference
	* a plan so they inherit its configuration. This module exposes CRUD + search
	* operations against the `/preapproval_plan` endpoint.
	*
	* @module clients/preApprovalPlan
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreApprovalPlan = void 0;
	var get_1 = __importDefault(require_get$4());
	var create_1 = __importDefault(require_create$5());
	var update_1 = __importDefault(require_update$3());
	var search_1 = __importDefault(require_search$3());
	/**
	* Client for managing subscription plan templates.
	*
	* Plans define billing rules (frequency, amount, trial) that are shared
	* across many individual subscriptions. The `init_point` URL lets
	* buyers subscribe to a plan directly.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var PreApprovalPlan = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new subscription plan template.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve an existing subscription plan by its unique identifier.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/get.ts Usage Example }.
		*/
		get({ preApprovalPlanId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id: preApprovalPlanId,
				config: this.config
			});
		}
		/**
		* Update an existing subscription plan (e.g. change amount, status, or allowed payment methods).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/update.ts Usage Example }.
		*/
		update({ id, updatePreApprovalPlanRequest, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				id,
				updatePreApprovalPlanRequest,
				config: this.config
			});
		}
		/**
		* Search subscription plans using filters such as status or free-text query.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/search.ts Usage Example }.
		*/
		search(preApprovalPlanSearchData = {}) {
			const { options, requestOptions } = preApprovalPlanSearchData;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
	};
	exports.PreApprovalPlan = PreApprovalPlan;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/cancelPaymentIntent/index.js
var require_cancelPaymentIntent = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the cancel-payment-intent operation for Point devices.
	*
	* Sends a `DELETE /point/integration-api/devices/{device_id}/payment-intents/{id}`
	* request to abort a pending payment intent on the terminal.
	*
	* @module point/cancelPaymentIntent
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cancelPaymentIntent;
	var restClient_1 = require_restClient();
	/**
	* Cancel a pending payment intent on the specified Point device.
	*
	* @returns Confirmation containing the cancelled payment intent ID.
	*/
	function cancelPaymentIntent({ device_id, payment_intent_id, config }) {
		return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}/payment-intents/${payment_intent_id}`, Object.assign({
			method: "DELETE",
			headers: { Authorization: `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/changeDeviceOperatingMode/index.js
var require_changeDeviceOperatingMode = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the change-device-operating-mode operation.
	*
	* Sends a `PATCH /point/integration-api/devices/{device_id}` request to
	* switch a Point terminal between integrated (PDV) and standalone modes.
	*
	* @module point/changeDeviceOperatingMode
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = changeDeviceOperatingMode;
	var restClient_1 = require_restClient();
	/**
	* Change the operating mode of a Point device.
	*
	* @returns Confirmation containing the new operating mode.
	*/
	function changeDeviceOperatingMode({ device_id, request, config }) {
		return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}`, Object.assign({
			method: "PATCH",
			headers: { Authorization: `Bearer ${config.accessToken}` },
			body: JSON.stringify(request)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/createPaymentIntent/index.js
var require_createPaymentIntent = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the create-payment-intent operation for Point devices.
	*
	* Sends a `POST /point/integration-api/devices/{device_id}/payment-intents`
	* request to instruct the terminal to begin a new payment flow.
	*
	* @module point/createPaymentIntent
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = createPaymentIntent;
	var restClient_1 = require_restClient();
	/**
	* Create a payment intent on the specified Point device.
	*
	* @returns The newly created payment intent with its current state.
	*/
	function createPaymentIntent({ device_id, request, config }) {
		return restClient_1.RestClient.fetch(`/point/integration-api/devices/${device_id}/payment-intents`, Object.assign({
			method: "POST",
			headers: { Authorization: `Bearer ${config.accessToken}` },
			body: JSON.stringify(request)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/getDevices/index.js
var require_getDevices = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-devices operation for Point terminals.
	*
	* Sends a `GET /point/integration-api/devices` request to retrieve the
	* list of Point devices registered to the authenticated seller.
	*
	* @module point/getDevices
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getDevices;
	var restClient_1 = require_restClient();
	/**
	* Retrieve the paginated list of Point devices.
	*
	* @returns A paginated response containing the matched devices.
	*/
	function getDevices({ options, config }) {
		return restClient_1.RestClient.fetch("/point/integration-api/devices", Object.assign({
			method: "GET",
			headers: { Authorization: `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/getPaymentIntentList/index.js
var require_getPaymentIntentList = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-payment-intent-list operation.
	*
	* Sends a `GET /point/integration-api/payment-intents/events` request
	* to retrieve lifecycle events for all payment intents.
	*
	* @module point/getPaymentIntentList
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getPaymentIntentList;
	var restClient_1 = require_restClient();
	/**
	* Retrieve payment intent events, optionally filtered by date range.
	*
	* @returns A list of payment intent lifecycle events.
	*/
	function getPaymentIntentList({ options, config }) {
		return restClient_1.RestClient.fetch("/point/integration-api/payment-intents/events", Object.assign({
			method: "GET",
			headers: { Authorization: `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/getPaymentIntentStatus/index.js
var require_getPaymentIntentStatus = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-payment-intent-status operation.
	*
	* Sends a `GET /point/integration-api/payment-intents/{id}/events` request
	* to retrieve the latest status event for a specific payment intent.
	*
	* @module point/getPaymentIntentStatus
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getPaymentIntentStatus;
	var restClient_1 = require_restClient();
	/**
	* Retrieve the current status of a payment intent.
	*
	* @returns The status and creation timestamp of the latest event.
	*/
	function getPaymentIntentStatus({ payment_intent_id, config }) {
		return restClient_1.RestClient.fetch(`/point/integration-api/payment-intents/${payment_intent_id}/events`, Object.assign({
			method: "GET",
			headers: { Authorization: `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/searchPaymentIntent/index.js
var require_searchPaymentIntent = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the search-payment-intent operation.
	*
	* Sends a `GET /point/integration-api/payment-intents/{id}` request to
	* retrieve the full details of a specific payment intent.
	*
	* @module point/searchPaymentIntent
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = searchPaymentIntent;
	var restClient_1 = require_restClient();
	/**
	* Retrieve the details of a payment intent by its ID.
	*
	* @returns The payment intent details including state, amount, and device info.
	*/
	function searchPaymentIntent({ payment_intent_id, config }) {
		return restClient_1.RestClient.fetch(`/point/integration-api/payment-intents/${payment_intent_id}`, Object.assign({
			method: "GET",
			headers: { Authorization: `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/point/index.js
var require_point = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Point (Smart POS) client for the MercadoPago API.
	*
	* Provides methods to manage payment intents on Point terminals and to
	* administer the registered Point devices (list, change operating mode).
	*
	* @module point
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Point = void 0;
	var cancelPaymentIntent_1 = __importDefault(require_cancelPaymentIntent());
	var changeDeviceOperatingMode_1 = __importDefault(require_changeDeviceOperatingMode());
	var createPaymentIntent_1 = __importDefault(require_createPaymentIntent());
	var getDevices_1 = __importDefault(require_getDevices());
	var getPaymentIntentList_1 = __importDefault(require_getPaymentIntentList());
	var getPaymentIntentStatus_1 = __importDefault(require_getPaymentIntentStatus());
	var searchPaymentIntent_1 = __importDefault(require_searchPaymentIntent());
	/**
	* Client facade for MercadoPago Point Integration API operations.
	*
	* Use this class to create, search, cancel, and list payment intents on
	* Point Smart POS terminals, as well as to query and configure the
	* registered devices.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var Point = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new payment intent on a specific Point device.
		*
		* The intent is sent to the terminal, which will prompt the buyer to
		* present a card or other payment method.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/createPaymentIntent.ts Usage Example }.
		*/
		createPaymentIntent({ device_id, request, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, createPaymentIntent_1.default)({
				device_id,
				request,
				config: this.config
			});
		}
		/**
		* Retrieve the details of an existing payment intent by its ID.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/searchPaymentIntent.ts Usage Example }.
		*/
		searchPaymentIntent({ payment_intent_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, searchPaymentIntent_1.default)({
				payment_intent_id,
				config: this.config
			});
		}
		/**
		* Cancel a pending payment intent on a specific Point device.
		*
		* Only intents that have not yet been completed can be cancelled.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/cancelPaymentIntent.ts Usage Example }.
		*/
		cancelPaymentIntent({ device_id, payment_intent_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, cancelPaymentIntent_1.default)({
				device_id,
				payment_intent_id,
				config: this.config
			});
		}
		/**
		* List payment intent events, optionally filtered by date range.
		*
		* Returns the lifecycle events (creation, completion, cancellation) for
		* all payment intents associated with the authenticated account.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentList.ts Usage Example }.
		*/
		getPaymentIntentList(pointGetPaymentIntentListOptions = {}) {
			const { body, requestOptions } = pointGetPaymentIntentListOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, getPaymentIntentList_1.default)({
				options: body === null || body === void 0 ? void 0 : body.options,
				config: this.config
			});
		}
		/**
		* Get the latest status event for a specific payment intent.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentStatus.ts Usage Example }.
		*/
		getPaymentIntentStatus({ payment_intent_id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, getPaymentIntentStatus_1.default)({
				payment_intent_id,
				config: this.config
			});
		}
		/**
		* List Point devices registered to the authenticated account.
		*
		* Results can be filtered by store and POS identifiers.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getDevices.ts Usage Example }.
		*/
		getDevices({ request, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, getDevices_1.default)({
				options: request === null || request === void 0 ? void 0 : request.options,
				config: this.config
			});
		}
		/**
		* Change the operating mode of a Point device (e.g. `PDV` or `STANDALONE`).
		*
		* In `PDV` mode the device receives payment intents from the integration;
		* in `STANDALONE` mode the seller operates the device manually.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/changeDeviceOperatingMode.ts Usage Example }.
		*/
		changeDeviceOperatingMode({ device_id, request, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, changeDeviceOperatingMode_1.default)({
				device_id,
				request,
				config: this.config
			});
		}
	};
	exports.Point = Point;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preference/get/index.js
var require_get$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "get preference" operation.
	*
	* Sends a GET to `/checkout/preferences/{id}` and returns the full
	* preference resource.
	*
	* @module clients/preference/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve an existing Checkout Pro preference by its unique identifier.
	*
	* @returns The full preference resource.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/checkout/preferences/${id}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preference/create/index.js
var require_create$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "create preference" operation.
	*
	* Sends a POST to `/checkout/preferences/` and returns the newly
	* created preference, including the `init_point` checkout URL.
	*
	* @module clients/preference/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new Checkout Pro preference via the MercadoPago API.
	*
	* @returns The created preference with its server-assigned `id` and `init_point`.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/checkout/preferences/", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preference/update/index.js
var require_update$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "update preference" operation.
	*
	* Sends a PUT to `/checkout/preferences/{id}` with the modified fields
	* and returns the updated preference resource.
	*
	* @module clients/preference/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing Checkout Pro preference.
	*
	* @returns The updated preference resource.
	*/
	function update({ id, updatePreferenceRequest, config }) {
		return restClient_1.RestClient.fetch(`/checkout/preferences/${id}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(updatePreferenceRequest)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preference/search/index.js
var require_search$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the "search preferences" operation.
	*
	* Sends a GET to `/checkout/preferences/search` with optional query
	* parameters and returns a paginated list of matching preferences.
	*
	* @module clients/preference/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search Checkout Pro preferences using optional filters.
	*
	* @returns A paginated result containing matching preference summaries.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/checkout/preferences/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/preference/index.js
var require_preference = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Checkout Pro Preference client for the MercadoPago Node SDK.
	*
	* A Preference defines everything the buyer sees in the Checkout Pro
	* payment flow: items, payer details, back URLs, shipping, payment
	* methods, and expiration rules. This module exposes CRUD + search
	* operations against the `/checkout/preferences` endpoint.
	*
	* @module clients/preference
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Preference = void 0;
	var get_1 = __importDefault(require_get$3());
	var create_1 = __importDefault(require_create$4());
	var update_1 = __importDefault(require_update$2());
	var search_1 = __importDefault(require_search$2());
	/**
	* Client for managing Checkout Pro payment preferences.
	*
	* Each preference generates an `init_point` URL that redirects buyers
	* to MercadoPago's hosted checkout. Use this client to create, retrieve,
	* update, and search preferences.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var Preference = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve a single preference by its unique identifier.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example }.
		*/
		get({ preferenceId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id: preferenceId,
				config: this.config
			});
		}
		/**
		* Create a new Checkout Pro preference and obtain an `init_point` URL.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Update an existing preference (e.g. change items, amounts, or expiration).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example }.
		*/
		update({ id, updatePreferenceRequest, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				id,
				updatePreferenceRequest,
				config: this.config
			});
		}
		/**
		* Search preferences using filters such as external reference or sponsor.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example }.
		*/
		search(preferenceSearchData = {}) {
			const { options, requestOptions } = preferenceSearchData;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
	};
	exports.Preference = Preference;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/oAuth/create/index.js
var require_create$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the OAuth token creation (authorization-code exchange).
	*
	* Sends a `POST /oauth/token` request with `grant_type=authorization_code`
	* to exchange a temporary authorization code for an access/refresh token pair.
	*
	* @module oAuth/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Exchange an authorization code for OAuth tokens via `POST /oauth/token`.
	*
	* @returns The OAuth response containing the new access token, refresh token, and metadata.
	*/
	function create({ body, config }) {
		const defaultRequest = Object.assign(Object.assign({}, body), { "grant_type": "authorization_code" });
		return restClient_1.RestClient.fetch("/oauth/token", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(defaultRequest)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/oAuth/refresh/index.js
var require_refresh = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the OAuth token refresh operation.
	*
	* Sends a `POST /oauth/token` request with `grant_type=refresh_token`
	* to obtain a new access token without requiring the seller to re-authorize.
	*
	* @module oAuth/refresh
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = refresh;
	var restClient_1 = require_restClient();
	/**
	* Refresh an OAuth access token via `POST /oauth/token`.
	*
	* @returns The OAuth response containing the new access token, refresh token, and metadata.
	*/
	function refresh({ body, config }) {
		const defaultRequest = Object.assign(Object.assign({}, body), { "grant_type": "refresh_token" });
		return restClient_1.RestClient.fetch("/oauth/token", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(defaultRequest)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/oAuth/getAuthorizationURL/index.js
var require_getAuthorizationURL = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the OAuth authorization URL builder.
	*
	* Constructs the full `https://auth.mercadopago.com/authorization` URL
	* with the required query parameters so the seller can grant permissions
	* to the integrator's application.
	*
	* @module oAuth/getAuthorizationURL
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getAuthorizationURL;
	var restClient_1 = require_restClient();
	/**
	* Build and return the MercadoPago OAuth authorization URL as a string.
	*
	* @returns Fully-qualified authorization URL including all query parameters.
	*/
	function getAuthorizationURL({ options }) {
		const defaultOptions = Object.assign(Object.assign({}, options), {
			response_type: "code",
			platform_id: "mp"
		});
		return restClient_1.RestClient.appendQueryParamsToUrl("https://auth.mercadopago.com/authorization", defaultOptions);
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/oAuth/index.js
var require_oAuth = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* OAuth client for the MercadoPago API.
	*
	* Provides methods for the full OAuth 2.0 authorization-code flow:
	* generating the authorization URL, exchanging an authorization code for
	* tokens, and refreshing expired access tokens.
	*
	* @module oAuth
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OAuth = void 0;
	var create_1 = __importDefault(require_create$3());
	var refresh_1 = __importDefault(require_refresh());
	var getAuthorizationURL_1 = __importDefault(require_getAuthorizationURL());
	/**
	* Client facade for MercadoPago OAuth operations.
	*
	* Use this class to authenticate third-party sellers via the OAuth 2.0
	* authorization-code grant, obtain access/refresh token pairs, and
	* refresh tokens before they expire.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/authentication/oauth/_oauth_token/post Documentation }.
	*/
	var OAuth = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Exchange an authorization code for an access token and refresh token.
		*
		* Call this after the seller is redirected back to your `redirect_uri`
		* with a temporary `code` query parameter.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Obtain a new access token using a previously issued refresh token.
		*
		* Access tokens have a limited lifetime; call this method to rotate
		* credentials without requiring the seller to re-authorize.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/refresh.ts Usage Example }.
		*/
		refresh({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, refresh_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Build the MercadoPago authorization URL to which the seller should be redirected.
		*
		* The returned URL points to `auth.mercadopago.com` and includes the
		* required OAuth query parameters. Redirect the seller to this URL so
		* they can grant your application the requested permissions.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/oauth/getAuthorizationURL.ts Usage Example }.
		*/
		getAuthorizationURL({ options }) {
			return (0, getAuthorizationURL_1.default)({ options });
		}
	};
	exports.OAuth = OAuth;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/merchantOrder/create/index.js
var require_create$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the create-merchant-order operation.
	*
	* Sends a `POST /merchant_orders` request to create a new order that
	* groups items, payments, and shipments.
	*
	* @module merchantOrder/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new merchant order via `POST /merchant_orders`.
	*
	* @returns The newly created merchant order with all its details.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/merchant_orders", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "POST"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/merchantOrder/get/index.js
var require_get$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-merchant-order operation.
	*
	* Sends a `GET /merchant_orders/{id}` request to retrieve a single
	* merchant order by its unique identifier.
	*
	* @module merchantOrder/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a merchant order by its ID.
	*
	* @returns The full merchant order including items, payments, and shipments.
	*/
	function get({ merchantOrderId, config }) {
		return restClient_1.RestClient.fetch(`/merchant_orders/${merchantOrderId}`, Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/merchantOrder/update/index.js
var require_update$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the update-merchant-order operation.
	*
	* Sends a `PUT /merchant_orders/{id}` request to modify an existing
	* merchant order's items, shipments, or metadata.
	*
	* @module merchantOrder/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = update;
	var restClient_1 = require_restClient();
	/**
	* Update an existing merchant order via `PUT /merchant_orders/{id}`.
	*
	* @returns The updated merchant order with all its details.
	*/
	function update({ merchantOrderId, body, config }) {
		return restClient_1.RestClient.fetch(`/merchant_orders/${merchantOrderId}`, Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			method: "PUT"
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/merchantOrder/search/index.js
var require_search$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the search-merchant-orders operation.
	*
	* Sends a `GET /merchant_orders/search` request to query orders
	* matching the given filter criteria.
	*
	* @module merchantOrder/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search merchant orders with optional filters.
	*
	* @returns A paginated page of merchant orders matching the criteria.
	*/
	function search({ options, config }) {
		return restClient_1.RestClient.fetch("/merchant_orders/search", Object.assign({
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams: Object.assign({}, options)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/merchantOrder/index.js
var require_merchantOrder = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Merchant Order client for the MercadoPago API.
	*
	* Provides methods to create, retrieve, update, and search merchant orders.
	* A merchant order groups multiple payments, items, and shipments under
	* a single order entity, typically originating from a checkout preference.
	*
	* @module merchantOrder
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerchantOrder = void 0;
	var create_1 = __importDefault(require_create$2());
	var get_1 = __importDefault(require_get$2());
	var update_1 = __importDefault(require_update$1());
	var search_1 = __importDefault(require_search$1());
	/**
	* Client facade for MercadoPago Merchant Order operations.
	*
	* Use this class to manage orders that aggregate payments, items, and
	* shipments originating from checkout preferences or marketplace flows.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/checkout-pro/merchant_orders/get-merchant-order/get Documentation }.
	*/
	var MerchantOrder = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new merchant order.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/create.ts Usage Example }.
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve a merchant order by its ID.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/get.ts Usage Example }.
		*/
		get({ merchantOrderId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				merchantOrderId,
				config: this.config
			});
		}
		/**
		* Update an existing merchant order (items, shipments, notification URL, etc.).
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/update.ts Usage Example }.
		*/
		update({ merchantOrderId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				merchantOrderId,
				body,
				config: this.config
			});
		}
		/**
		* Search merchant orders with optional filters such as status, payer, or date range.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/merchantOrder/search.ts Usage Example }.
		*/
		search(merchantOrderSearchOptions = {}) {
			const { options, requestOptions } = merchantOrderSearchOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
	};
	exports.MerchantOrder = MerchantOrder;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/user/get/index.js
var require_get$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Implementation of the get-user operation.
	*
	* Sends a `GET /users/me` request to retrieve the profile of the
	* user authenticated by the current access token.
	*
	* @module user/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve the authenticated user's profile via `GET /users/me`.
	*
	* @returns The user profile with personal data, reputation, and account status.
	*/
	function get({ config }) {
		return restClient_1.RestClient.fetch("/users/me", Object.assign({ headers: { "Authorization": `Bearer ${config.accessToken}` } }, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/user/index.js
var require_user = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* User client for the MercadoPago API.
	*
	* Provides a method to retrieve the profile of the user (seller)
	* authenticated by the current access token.
	*
	* @module user
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.User = void 0;
	var get_1 = __importDefault(require_get$1());
	/**
	* Client facade for retrieving the authenticated MercadoPago user profile.
	*
	* Use this class to obtain account details such as name, email, site,
	* reputation scores, and account status for the user who owns the
	* current access token.
	*
	* @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
	*/
	var User = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Retrieve the profile of the authenticated user.
		*
		* Calls the `GET /users/me` endpoint and returns comprehensive account
		* information including personal data, reputation, and status.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/user/get/get.ts Usage Example }.
		*/
		get(userGetData = {}) {
			const { requestOptions } = userGetData;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({ config: this.config });
		}
	};
	exports.User = User;
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/create/index.js
var require_create$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Create order operation -- sends `POST /v1/orders`.
	*
	* @module clients/order/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = create;
	var restClient_1 = require_restClient();
	/**
	* Create a new order via the MercadoPago Orders API.
	*
	* @returns The newly created order including its server-assigned `id` and initial `status`.
	*/
	function create({ body, config }) {
		return restClient_1.RestClient.fetch("/v1/orders", Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/get/index.js
var require_get = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Get order operation -- sends `GET /v1/orders/{id}`.
	*
	* @module clients/order/get
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = get;
	var restClient_1 = require_restClient();
	/**
	* Retrieve a single order by its unique identifier.
	*
	* @returns The full order representation including transactions and status.
	*/
	function get({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}`, Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/process/index.js
var require_process = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Process order operation -- sends `POST /v1/orders/{id}/process`.
	*
	* @module clients/order/process
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = process;
	var restClient_1 = require_restClient();
	/**
	* Process an order, triggering payment execution for its transactions.
	*
	* The order must already contain at least one payment transaction
	* before it can be processed.
	*
	* @returns The updated order with the resulting payment statuses.
	*/
	function process({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/process`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/capture/index.js
var require_capture = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Capture order operation -- sends `POST /v1/orders/{id}/capture`.
	*
	* @module clients/order/capture
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = capture;
	var restClient_1 = require_restClient();
	/**
	* Capture an authorized order, confirming the payment settlement.
	*
	* Only applicable to orders created with `capture_mode: "manual"`.
	*
	* @returns The updated order with captured payment status.
	*/
	function capture({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/capture`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/cancel/index.js
var require_cancel = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Cancel order operation -- sends `POST /v1/orders/{id}/cancel`.
	*
	* @module clients/order/cancel
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cancel;
	var restClient_1 = require_restClient();
	/**
	* Cancel an order that has not yet been captured.
	*
	* @returns The updated order with a `cancelled` status.
	*/
	function cancel({ id, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/cancel`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/refund/index.js
var require_refund = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Refund order operation -- sends `POST /v1/orders/{id}/refund`.
	*
	* @module clients/order/refund
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = refund;
	var restClient_1 = require_restClient();
	/**
	* Refund an order (total or partial).
	*
	* Omit the body for a full refund of all transactions. Provide
	* specific transaction IDs and amounts for a partial refund.
	*
	* @returns The updated order including the new refund records.
	*/
	function refund({ id, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/refund`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/search/index.js
var require_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Search orders operation -- sends `GET /v1/orders` with query parameters.
	*
	* @module clients/order/search
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = search;
	var restClient_1 = require_restClient();
	/**
	* Search for orders matching the given filters and date range.
	*
	* Builds query-string parameters from the provided options and
	* returns a paginated list of matching orders.
	*
	* @returns A paginated response containing matching orders and paging metadata.
	*/
	function search({ options, config }) {
		const queryParams = {};
		if (options) {
			for (const [key, value] of Object.entries(options)) if (typeof value !== "undefined") queryParams[key] = value;
		}
		return restClient_1.RestClient.fetch("/v1/orders", Object.assign({
			method: "GET",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			queryParams
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/transaction/create/index.js
var require_create = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Create transaction operation -- sends `POST /v1/orders/{id}/transactions`.
	*
	* @module clients/order/transaction/create
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = createTransaction;
	var restClient_1 = require_restClient();
	/**
	* Add one or more payment transactions to an existing order.
	*
	* @returns The created payment transactions.
	*/
	function createTransaction({ id, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/transactions`, Object.assign({
			method: "POST",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/transaction/update/index.js
var require_update = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Update transaction operation -- sends `PUT /v1/orders/{id}/transactions/{transactionId}`.
	*
	* @module clients/order/transaction/update
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = updateTransaction;
	var restClient_1 = require_restClient();
	/**
	* Update an existing payment transaction within an order.
	*
	* Replaces the transaction's payment data (amount, payment method)
	* with the values provided in the request body.
	*
	* @returns The updated payment method details.
	*/
	function updateTransaction({ id, transactionId, body, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/transactions/${transactionId}`, Object.assign({
			method: "PUT",
			headers: { "Authorization": `Bearer ${config.accessToken}` },
			body: JSON.stringify(body)
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/transaction/delete/index.js
var require_delete = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Delete transaction operation -- sends `DELETE /v1/orders/{id}/transactions/{transactionId}`.
	*
	* @module clients/order/transaction/delete
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = deleteTransaction;
	var restClient_1 = require_restClient();
	/**
	* Remove a payment transaction from an order.
	*
	* @returns A bare API response (status and headers only; no body).
	*/
	function deleteTransaction({ id, transactionId, config }) {
		return restClient_1.RestClient.fetch(`/v1/orders/${id}/transactions/${transactionId}`, Object.assign({
			method: "DELETE",
			headers: { "Authorization": `Bearer ${config.accessToken}` }
		}, config.options));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/clients/order/index.js
var require_order = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Order API client -- facade for the MercadoPago Orders v1 endpoints.
	*
	* Exposes every order lifecycle operation (create, get, process, capture,
	* cancel, refund, search) as well as transaction-level management
	* (create, update, delete) on an existing order.
	*
	* @module clients/order
	* @see {@link https://mercadopago.com/developers/en/docs/order/landing Orders API Documentation}
	*/
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Order = void 0;
	var create_1 = __importDefault(require_create$1());
	var get_1 = __importDefault(require_get());
	var process_1 = __importDefault(require_process());
	var capture_1 = __importDefault(require_capture());
	var cancel_1 = __importDefault(require_cancel());
	var refund_1 = __importDefault(require_refund());
	var search_1 = __importDefault(require_search());
	var create_2 = __importDefault(require_create());
	var update_1 = __importDefault(require_update());
	var delete_1 = __importDefault(require_delete());
	/**
	* Client for the MercadoPago Orders API.
	*
	* Each method maps 1-to-1 with an Orders REST endpoint and returns a
	* promise that resolves to the API response. Per-call `requestOptions`
	* are merged with the global {@link MercadoPagoConfig} options so
	* callers can override timeouts, idempotency keys, etc.
	*
	* @see {@link https://mercadopago.com/developers/en/docs/order/landing Documentation}
	*/
	var Order = class {
		constructor(mercadoPagoConfig) {
			this.config = mercadoPagoConfig;
		}
		/**
		* Create a new order.
		*
		* Sends a `POST /v1/orders` request with the provided order body.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/create.ts Usage Example}
		*/
		create({ body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_1.default)({
				body,
				config: this.config
			});
		}
		/**
		* Retrieve an existing order by its ID.
		*
		* Sends a `GET /v1/orders/{id}` request.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/get.ts Usage Example}
		*/
		get({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, get_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Process an order, triggering payment execution.
		*
		* Sends a `POST /v1/orders/{id}/process` request. The order must
		* already contain at least one payment transaction.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/process.ts Usage Example}
		*/
		process({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, process_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Capture an authorized order, confirming the payment settlement.
		*
		* Sends a `POST /v1/orders/{id}/capture` request. Only applicable
		* to orders created with `capture_mode: "manual"`.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/capture.ts Usage Example}
		*/
		capture({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, capture_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Cancel an order that has not yet been captured.
		*
		* Sends a `POST /v1/orders/{id}/cancel` request.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/cancel.ts Usage Example}
		*/
		cancel({ id, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, cancel_1.default)({
				id,
				config: this.config
			});
		}
		/**
		* Refund an order (total or partial).
		*
		* Sends a `POST /v1/orders/{id}/refund` request. Omit the body
		* for a full refund; provide specific transaction amounts for a
		* partial refund.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundTotal.ts Total Refund Example}
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/refundPartial.ts Partial Refund Example}
		*/
		refund({ id, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, refund_1.default)({
				id,
				body,
				config: this.config
			});
		}
		/**
		* Search orders by date range and optional filters.
		*
		* Sends a `GET /v1/orders` request with query parameters built from
		* the provided search options. Returns a paginated result set.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/search.ts Usage Example}
		*/
		search(searchData) {
			const options = searchData === null || searchData === void 0 ? void 0 : searchData.options;
			const requestOptions = searchData === null || searchData === void 0 ? void 0 : searchData.requestOptions;
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, search_1.default)({
				options,
				config: this.config
			});
		}
		/**
		* Add a payment transaction to an existing order.
		*
		* Sends a `POST /v1/orders/{id}/transactions` request.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/create.ts Usage Example}
		*/
		createTransaction({ id, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, create_2.default)({
				id,
				body,
				config: this.config
			});
		}
		/**
		* Update an existing payment transaction within an order.
		*
		* Sends a `PUT /v1/orders/{id}/transactions/{transactionId}` request.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/update.ts Usage Example}
		*/
		updateTransaction({ id, transactionId, body, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, update_1.default)({
				id,
				transactionId,
				body,
				config: this.config
			});
		}
		/**
		* Remove a payment transaction from an order.
		*
		* Sends a `DELETE /v1/orders/{id}/transactions/{transactionId}` request.
		*
		* @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/order/transaction/delete.ts Usage Example}
		*/
		deleteTransaction({ id, transactionId, requestOptions }) {
			this.config.options = Object.assign(Object.assign({}, this.config.options), requestOptions);
			return (0, delete_1.default)({
				id,
				transactionId,
				config: this.config
			});
		}
	};
	exports.Order = Order;
}));
//#endregion
//#region node_modules/mercadopago/dist/utils/webhook/index.js
var require_webhook = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebhookSignatureValidator = exports.InvalidWebhookSignatureError = exports.SignatureFailureReason = void 0;
	var crypto = __importStar(__require("crypto"));
	/**
	* MercadoPago webhook signature validator.
	*
	* Verifies the authenticity of incoming webhook notifications by recomputing
	* the HMAC-SHA256 signature locally and comparing it against the value carried
	* in the `x-signature` header. The implementation is stateless, performs no
	* outbound HTTP calls, and does not depend on `MercadoPagoConfig` — the
	* integrator passes the secret signature explicitly on every call.
	*
	* @module utils/webhook
	*/
	/**
	* Enumerates the reasons why {@link WebhookSignatureValidator} may reject a
	* MercadoPago webhook notification.
	*
	* Each value maps to a specific failure mode in the signature verification flow.
	* Integrators are encouraged to log this value alongside the
	* `x-request-id` for correlation against the MercadoPago notifications dashboard.
	*/
	var SignatureFailureReason;
	(function(SignatureFailureReason) {
		/** The `x-signature` header was missing, empty, or whitespace. */
		SignatureFailureReason["MissingSignatureHeader"] = "MissingSignatureHeader";
		/**
		* The `x-signature` header did not match the expected `ts=...,vN=...`
		* format and could not be parsed.
		*/
		SignatureFailureReason["MalformedSignatureHeader"] = "MalformedSignatureHeader";
		/** The header parsed correctly but no `ts=` component was present. */
		SignatureFailureReason["MissingTimestamp"] = "MissingTimestamp";
		/**
		* The header did not include a hash for any of the versions listed in
		* `supportedVersions`. Typically indicates that MercadoPago has migrated to
		* a new signature version (e.g. `v2`) and the SDK needs to be upgraded.
		*/
		SignatureFailureReason["MissingHash"] = "MissingHash";
		/**
		* The HMAC computed locally did not match the hash provided in the header.
		* Most often caused by an incorrect secret signature or by a forged request.
		*/
		SignatureFailureReason["SignatureMismatch"] = "SignatureMismatch";
		/**
		* The header timestamp was outside the configured `tolerance` window
		* against the current clock. May indicate clock drift on the integrator's
		* server or a replay attack.
		*/
		SignatureFailureReason["TimestampOutOfTolerance"] = "TimestampOutOfTolerance";
	})(SignatureFailureReason || (exports.SignatureFailureReason = SignatureFailureReason = {}));
	/**
	* Error thrown by {@link WebhookSignatureValidator.validate} when a webhook
	* notification cannot be confirmed as originating from MercadoPago.
	*
	* The instance carries enough context to support structured logging without
	* exposing internal details in the HTTP response.
	*/
	var InvalidWebhookSignatureError = class InvalidWebhookSignatureError extends Error {
		constructor(reason, requestId, timestamp) {
			super(`Invalid webhook signature: ${reason}`);
			this.name = "InvalidWebhookSignatureError";
			this.reason = reason;
			this.requestId = requestId;
			this.timestamp = timestamp;
			Object.setPrototypeOf(this, InvalidWebhookSignatureError.prototype);
		}
	};
	exports.InvalidWebhookSignatureError = InvalidWebhookSignatureError;
	var DEFAULT_VERSIONS = ["v1"];
	var VERSION_KEY_REGEX = /^v\d+$/;
	/**
	* Stateless utility that validates the signature of a MercadoPago webhook.
	*
	* On failure it throws {@link InvalidWebhookSignatureError}; on success it
	* returns nothing. The comparison is performed in constant time to mitigate
	* timing attacks.
	*
	* QR Code notifications are **not signed** by MercadoPago — do not call this
	* validator for those events; they will always fail signature verification.
	*/
	var WebhookSignatureValidator = class {
		/**
		* Validates the signature of a MercadoPago webhook notification.
		*
		* @param options - Validation inputs (see {@link ValidateOptions}).
		* @throws {@link InvalidWebhookSignatureError} when the signature is missing,
		*   malformed, or does not match the expected HMAC.
		*/
		static validate(options) {
			var _a, _b;
			const xSignature = normalise(options.xSignature);
			const xRequestId = normalise(options.xRequestId);
			const dataId = normalise(options.dataId);
			const secret = options.secret;
			const supportedVersions = (_a = options.supportedVersions) !== null && _a !== void 0 ? _a : DEFAULT_VERSIONS;
			const toleranceSeconds = options.toleranceSeconds;
			const now = (_b = options.now) !== null && _b !== void 0 ? _b : (() => Date.now());
			if (!xSignature) throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingSignatureHeader, xRequestId);
			const { ts, hashes } = parseSignatureHeader(xSignature);
			if (!ts && Object.keys(hashes).length === 0) throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId);
			if (!ts) throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingTimestamp, xRequestId);
			if (!/^\d+$/.test(ts)) throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId, ts);
			let receivedHash;
			for (const version of supportedVersions) if (hashes[version]) {
				receivedHash = hashes[version];
				break;
			}
			if (!receivedHash) throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingHash, xRequestId, ts);
			const manifest = buildManifest(dataId, xRequestId, ts);
			if (!constantTimeEquals(crypto.createHmac("sha256", secret).update(manifest).digest("hex"), receivedHash)) throw new InvalidWebhookSignatureError(SignatureFailureReason.SignatureMismatch, xRequestId, ts);
			if (toleranceSeconds !== void 0) {
				const tsMs = Number(ts);
				if (Math.abs(now() - tsMs) / 1e3 > toleranceSeconds) throw new InvalidWebhookSignatureError(SignatureFailureReason.TimestampOutOfTolerance, xRequestId, ts);
			}
		}
	};
	exports.WebhookSignatureValidator = WebhookSignatureValidator;
	/**
	* Coerces a header/query value (which may be string, array, null, or undefined)
	* into a trimmed non-empty string, or `undefined` when the value is missing.
	*/
	function normalise(value) {
		if (value === void 0 || value === null) return void 0;
		const raw = Array.isArray(value) ? value[0] : value;
		if (raw === void 0 || raw === null) return void 0;
		const trimmed = String(raw).trim();
		return trimmed.length > 0 ? trimmed : void 0;
	}
	/**
	* Parses the `x-signature` header into its `ts` and `vN` components.
	* Unknown keys are silently ignored.
	*/
	function parseSignatureHeader(header) {
		const hashes = {};
		let ts;
		for (const part of header.split(",")) {
			const eq = part.indexOf("=");
			if (eq === -1) continue;
			const key = part.substring(0, eq).trim().toLowerCase();
			const value = part.substring(eq + 1).trim();
			if (!key || !value) continue;
			if (key === "ts") ts = value;
			else if (VERSION_KEY_REGEX.test(key)) hashes[key] = value;
		}
		return {
			ts,
			hashes
		};
	}
	/**
	* Builds the manifest string that will be fed into the HMAC.
	* Pairs whose value is missing are omitted, per the documented rule.
	*/
	function buildManifest(dataId, requestId, ts) {
		const parts = [];
		if (dataId) parts.push(`id:${dataId}`);
		if (requestId) parts.push(`request-id:${requestId}`);
		parts.push(`ts:${ts}`);
		return parts.join(";") + ";";
	}
	/**
	* Constant-time hex-string comparison. Returns `false` (without divulging
	* lengths via timing) when the strings differ in length.
	*/
	function constantTimeEquals(a, b) {
		if (a.length !== b.length) return false;
		return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
	}
}));
//#endregion
//#region node_modules/mercadopago/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* MercadoPago Node.js SDK — public API surface.
	*
	* Re-exports every client class and the SDK configuration object so
	* consumers can import everything from a single entry point:
	*
	* ```ts
	* import MercadoPagoConfig, { Payment, Order } from 'mercadopago';
	* ```
	*
	* @module mercadopago
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SignatureFailureReason = exports.InvalidWebhookSignatureError = exports.WebhookSignatureValidator = exports.Order = exports.User = exports.MerchantOrder = exports.OAuth = exports.Preference = exports.Point = exports.PreApprovalPlan = exports.PreApproval = exports.Payment = exports.PaymentMethod = exports.PaymentRefund = exports.IdentificationType = exports.Invoice = exports.DisbursementRefund = exports.Chargeback = exports.AdvancedPayment = exports.Customer = exports.CustomerCard = exports.CardToken = exports.MercadoPagoConfig = void 0;
	var mercadoPagoConfig_1 = require_mercadoPagoConfig();
	Object.defineProperty(exports, "MercadoPagoConfig", {
		enumerable: true,
		get: function() {
			return mercadoPagoConfig_1.MercadoPagoConfig;
		}
	});
	exports.default = mercadoPagoConfig_1.MercadoPagoConfig;
	/** Tokenization client — creates secure, single-use card tokens for PCI compliance. */
	var cardToken_1 = require_cardToken();
	Object.defineProperty(exports, "CardToken", {
		enumerable: true,
		get: function() {
			return cardToken_1.CardToken;
		}
	});
	/** Customer-card client — manages saved payment cards linked to a customer. */
	var customerCard_1 = require_customerCard();
	Object.defineProperty(exports, "CustomerCard", {
		enumerable: true,
		get: function() {
			return customerCard_1.CustomerCard;
		}
	});
	/** Customer client — CRUD operations on buyer profiles stored in MercadoPago. */
	var customer_1 = require_customer();
	Object.defineProperty(exports, "Customer", {
		enumerable: true,
		get: function() {
			return customer_1.Customer;
		}
	});
	/** Advanced-payment client — marketplace split-payment management. */
	var advancedPayment_1 = require_advancedPayment();
	Object.defineProperty(exports, "AdvancedPayment", {
		enumerable: true,
		get: function() {
			return advancedPayment_1.AdvancedPayment;
		}
	});
	/** Chargeback client — retrieves and searches payment dispute records. */
	var chargeback_1 = require_chargeback();
	Object.defineProperty(exports, "Chargeback", {
		enumerable: true,
		get: function() {
			return chargeback_1.Chargeback;
		}
	});
	/** Disbursement-refund client — manages refunds for split-payment disbursements. */
	var disbursementRefund_1 = require_disbursementRefund();
	Object.defineProperty(exports, "DisbursementRefund", {
		enumerable: true,
		get: function() {
			return disbursementRefund_1.DisbursementRefund;
		}
	});
	/** Invoice client — retrieves and searches subscription-generated invoices. */
	var invoice_1 = require_invoice();
	Object.defineProperty(exports, "Invoice", {
		enumerable: true,
		get: function() {
			return invoice_1.Invoice;
		}
	});
	/** Identification-type client — lists accepted ID document types per country. */
	var identificationType_1 = require_identificationType();
	Object.defineProperty(exports, "IdentificationType", {
		enumerable: true,
		get: function() {
			return identificationType_1.IdentificationType;
		}
	});
	/** Payment-refund client — creates, retrieves, and lists refunds on a payment. */
	var paymentRefund_1 = require_paymentRefund();
	Object.defineProperty(exports, "PaymentRefund", {
		enumerable: true,
		get: function() {
			return paymentRefund_1.PaymentRefund;
		}
	});
	/** Payment-method client — lists available payment methods for a given country/site. */
	var paymentMethod_1 = require_paymentMethod();
	Object.defineProperty(exports, "PaymentMethod", {
		enumerable: true,
		get: function() {
			return paymentMethod_1.PaymentMethod;
		}
	});
	/** Payment client — creates, retrieves, searches, captures, and cancels payments. */
	var payment_1 = require_payment();
	Object.defineProperty(exports, "Payment", {
		enumerable: true,
		get: function() {
			return payment_1.Payment;
		}
	});
	/** Pre-approval (subscription) client — manages recurring billing agreements. */
	var preApproval_1 = require_preApproval();
	Object.defineProperty(exports, "PreApproval", {
		enumerable: true,
		get: function() {
			return preApproval_1.PreApproval;
		}
	});
	/** Pre-approval plan client — manages subscription plan templates. */
	var preApprovalPlan_1 = require_preApprovalPlan();
	Object.defineProperty(exports, "PreApprovalPlan", {
		enumerable: true,
		get: function() {
			return preApprovalPlan_1.PreApprovalPlan;
		}
	});
	/** Point (Smart POS) client — manages in-person payment intents and devices. */
	var point_1 = require_point();
	Object.defineProperty(exports, "Point", {
		enumerable: true,
		get: function() {
			return point_1.Point;
		}
	});
	/** Preference client — creates and manages Checkout Pro payment preferences. */
	var preference_1 = require_preference();
	Object.defineProperty(exports, "Preference", {
		enumerable: true,
		get: function() {
			return preference_1.Preference;
		}
	});
	/** OAuth client — handles authorization code exchange, token refresh, and auth URL generation. */
	var oAuth_1 = require_oAuth();
	Object.defineProperty(exports, "OAuth", {
		enumerable: true,
		get: function() {
			return oAuth_1.OAuth;
		}
	});
	/** Merchant-order client — groups multiple payments under a single commercial order. */
	var merchantOrder_1 = require_merchantOrder();
	Object.defineProperty(exports, "MerchantOrder", {
		enumerable: true,
		get: function() {
			return merchantOrder_1.MerchantOrder;
		}
	});
	/** User client — retrieves the authenticated MercadoPago account profile. */
	var user_1 = require_user();
	Object.defineProperty(exports, "User", {
		enumerable: true,
		get: function() {
			return user_1.User;
		}
	});
	/** Order client — creates, processes, captures, cancels, and refunds orders (v2 API). */
	var order_1 = require_order();
	Object.defineProperty(exports, "Order", {
		enumerable: true,
		get: function() {
			return order_1.Order;
		}
	});
	var webhook_1 = require_webhook();
	Object.defineProperty(exports, "WebhookSignatureValidator", {
		enumerable: true,
		get: function() {
			return webhook_1.WebhookSignatureValidator;
		}
	});
	Object.defineProperty(exports, "InvalidWebhookSignatureError", {
		enumerable: true,
		get: function() {
			return webhook_1.InvalidWebhookSignatureError;
		}
	});
	Object.defineProperty(exports, "SignatureFailureReason", {
		enumerable: true,
		get: function() {
			return webhook_1.SignatureFailureReason;
		}
	});
}));
//#endregion
export { require_dist as t };
