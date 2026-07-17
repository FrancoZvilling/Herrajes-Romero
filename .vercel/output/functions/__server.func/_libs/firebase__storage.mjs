import { a as getApp, b as getDefaultEmulatorHostnameAndPort, h as createMockUserToken, i as _registerComponent, k as pingServer, n as _getProvider, p as FirebaseError, r as _isFirebaseServerApp, s as registerVersion, t as SDK_VERSION, u as Component, w as isCloudWorkstation, x as getModularInstance } from "./@firebase/app+[...].mjs";
//#region node_modules/@firebase/storage/dist/node-esm/index.node.esm.js
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @fileoverview Constants used in the Firebase Storage library.
*/
/**
* Domain name for firebase storage.
*/
var DEFAULT_HOST = "firebasestorage.googleapis.com";
/**
* The key in Firebase config json for the storage bucket.
*/
var CONFIG_STORAGE_BUCKET_KEY = "storageBucket";
/**
* 2 minutes
*
* The timeout for all operations except upload.
*/
var DEFAULT_MAX_OPERATION_RETRY_TIME = 120 * 1e3;
/**
* 10 minutes
*
* The timeout for upload.
*/
var DEFAULT_MAX_UPLOAD_RETRY_TIME = 600 * 1e3;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* An error returned by the Firebase Storage SDK.
* @public
*/
var StorageError = class StorageError extends FirebaseError {
	/**
	* @param code - A `StorageErrorCode` string to be prefixed with 'storage/' and
	*  added to the end of the message.
	* @param message  - Error message.
	* @param status_ - Corresponding HTTP Status Code
	*/
	constructor(code, message, status_ = 0) {
		super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
		this.status_ = status_;
		/**
		* Stores custom error data unique to the `StorageError`.
		*/
		this.customData = { serverResponse: null };
		this._baseMessage = this.message;
		Object.setPrototypeOf(this, StorageError.prototype);
	}
	get status() {
		return this.status_;
	}
	set status(status) {
		this.status_ = status;
	}
	/**
	* Compares a `StorageErrorCode` against this error's code, filtering out the prefix.
	*/
	_codeEquals(code) {
		return prependCode(code) === this.code;
	}
	/**
	* Optional response message that was added by the server.
	*/
	get serverResponse() {
		return this.customData.serverResponse;
	}
	set serverResponse(serverResponse) {
		this.customData.serverResponse = serverResponse;
		if (this.customData.serverResponse) this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
		else this.message = this._baseMessage;
	}
};
/**
* @public
* Error codes that can be attached to `StorageError` objects.
*/
var StorageErrorCode;
(function(StorageErrorCode) {
	StorageErrorCode["UNKNOWN"] = "unknown";
	StorageErrorCode["OBJECT_NOT_FOUND"] = "object-not-found";
	StorageErrorCode["BUCKET_NOT_FOUND"] = "bucket-not-found";
	StorageErrorCode["PROJECT_NOT_FOUND"] = "project-not-found";
	StorageErrorCode["QUOTA_EXCEEDED"] = "quota-exceeded";
	StorageErrorCode["UNAUTHENTICATED"] = "unauthenticated";
	StorageErrorCode["UNAUTHORIZED"] = "unauthorized";
	StorageErrorCode["UNAUTHORIZED_APP"] = "unauthorized-app";
	StorageErrorCode["RETRY_LIMIT_EXCEEDED"] = "retry-limit-exceeded";
	StorageErrorCode["INVALID_CHECKSUM"] = "invalid-checksum";
	StorageErrorCode["CANCELED"] = "canceled";
	StorageErrorCode["INVALID_EVENT_NAME"] = "invalid-event-name";
	StorageErrorCode["INVALID_URL"] = "invalid-url";
	StorageErrorCode["INVALID_DEFAULT_BUCKET"] = "invalid-default-bucket";
	StorageErrorCode["NO_DEFAULT_BUCKET"] = "no-default-bucket";
	StorageErrorCode["CANNOT_SLICE_BLOB"] = "cannot-slice-blob";
	StorageErrorCode["SERVER_FILE_WRONG_SIZE"] = "server-file-wrong-size";
	StorageErrorCode["NO_DOWNLOAD_URL"] = "no-download-url";
	StorageErrorCode["INVALID_ARGUMENT"] = "invalid-argument";
	StorageErrorCode["INVALID_ARGUMENT_COUNT"] = "invalid-argument-count";
	StorageErrorCode["APP_DELETED"] = "app-deleted";
	StorageErrorCode["INVALID_ROOT_OPERATION"] = "invalid-root-operation";
	StorageErrorCode["INVALID_FORMAT"] = "invalid-format";
	StorageErrorCode["INTERNAL_ERROR"] = "internal-error";
	StorageErrorCode["UNSUPPORTED_ENVIRONMENT"] = "unsupported-environment";
})(StorageErrorCode || (StorageErrorCode = {}));
function prependCode(code) {
	return "storage/" + code;
}
function unknown() {
	return new StorageError(StorageErrorCode.UNKNOWN, "An unknown error occurred, please check the error payload for server response.");
}
function retryLimitExceeded() {
	return new StorageError(StorageErrorCode.RETRY_LIMIT_EXCEEDED, "Max retry time for operation exceeded, please try again.");
}
function canceled() {
	return new StorageError(StorageErrorCode.CANCELED, "User canceled the upload/download.");
}
function invalidUrl(url) {
	return new StorageError(StorageErrorCode.INVALID_URL, "Invalid URL '" + url + "'.");
}
function invalidDefaultBucket(bucket) {
	return new StorageError(StorageErrorCode.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + bucket + "'.");
}
/**
* @internal
*/
function invalidArgument(message) {
	return new StorageError(StorageErrorCode.INVALID_ARGUMENT, message);
}
function appDeleted() {
	return new StorageError(StorageErrorCode.APP_DELETED, "The Firebase app was deleted.");
}
/**
* @param name - The name of the operation that was invalid.
*
* @internal
*/
function invalidRootOperation(name) {
	return new StorageError(StorageErrorCode.INVALID_ROOT_OPERATION, "The operation '" + name + "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Firebase Storage location data.
*
* @internal
*/
var Location = class Location {
	constructor(bucket, path) {
		this.bucket = bucket;
		this.path_ = path;
	}
	get path() {
		return this.path_;
	}
	get isRoot() {
		return this.path.length === 0;
	}
	fullServerUrl() {
		const encode = encodeURIComponent;
		return "/b/" + encode(this.bucket) + "/o/" + encode(this.path);
	}
	bucketOnlyServerUrl() {
		return "/b/" + encodeURIComponent(this.bucket) + "/o";
	}
	static makeFromBucketSpec(bucketString, host) {
		let bucketLocation;
		try {
			bucketLocation = Location.makeFromUrl(bucketString, host);
		} catch (e) {
			return new Location(bucketString, "");
		}
		if (bucketLocation.path === "") return bucketLocation;
		else throw invalidDefaultBucket(bucketString);
	}
	static makeFromUrl(url, host) {
		let location = null;
		const bucketDomain = "([A-Za-z0-9.\\-_]+)";
		function gsModify(loc) {
			if (loc.path.charAt(loc.path.length - 1) === "/") loc.path_ = loc.path_.slice(0, -1);
		}
		const gsRegex = /* @__PURE__ */ new RegExp("^gs://([A-Za-z0-9.\\-_]+)(/(.*))?$", "i");
		const gsIndices = {
			bucket: 1,
			path: 3
		};
		function httpModify(loc) {
			loc.path_ = decodeURIComponent(loc.path);
		}
		const version = "v[A-Za-z0-9_]+";
		const firebaseStorageHost = host.replace(/[.]/g, "\\.");
		const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o(/([^?#]*).*)?\$`, "i");
		const firebaseStorageIndices = {
			bucket: 1,
			path: 3
		};
		const cloudStorageRegExp = new RegExp(`^https?://${host === DEFAULT_HOST ? "(?:storage.googleapis.com|storage.cloud.google.com)" : host}/${bucketDomain}/([^?#]*)`, "i");
		const groups = [
			{
				regex: gsRegex,
				indices: gsIndices,
				postModify: gsModify
			},
			{
				regex: firebaseStorageRegExp,
				indices: firebaseStorageIndices,
				postModify: httpModify
			},
			{
				regex: cloudStorageRegExp,
				indices: {
					bucket: 1,
					path: 2
				},
				postModify: httpModify
			}
		];
		for (let i = 0; i < groups.length; i++) {
			const group = groups[i];
			const captures = group.regex.exec(url);
			if (captures) {
				const bucketValue = captures[group.indices.bucket];
				let pathValue = captures[group.indices.path];
				if (!pathValue) pathValue = "";
				location = new Location(bucketValue, pathValue);
				group.postModify(location);
				break;
			}
		}
		if (location == null) throw invalidUrl(url);
		return location;
	}
};
/**
* A request whose promise always fails.
*/
var FailRequest = class {
	constructor(error) {
		this.promise_ = Promise.reject(error);
	}
	/** @inheritDoc */
	getPromise() {
		return this.promise_;
	}
	/** @inheritDoc */
	cancel(_appDelete = false) {}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Accepts a callback for an action to perform (`doRequest`),
* and then a callback for when the backoff has completed (`backoffCompleteCb`).
* The callback sent to start requires an argument to call (`onRequestComplete`).
* When `start` calls `doRequest`, it passes a callback for when the request has
* completed, `onRequestComplete`. Based on this, the backoff continues, with
* another call to `doRequest` and the above loop continues until the timeout
* is hit, or a successful response occurs.
* @description
* @param doRequest Callback to perform request
* @param backoffCompleteCb Callback to call when backoff has been completed
*/
function start(doRequest, backoffCompleteCb, timeout) {
	let waitSeconds = 1;
	let retryTimeoutId = null;
	let globalTimeoutId = null;
	let hitTimeout = false;
	let cancelState = 0;
	function canceled() {
		return cancelState === 2;
	}
	let triggeredCallback = false;
	function triggerCallback(...args) {
		if (!triggeredCallback) {
			triggeredCallback = true;
			backoffCompleteCb.apply(null, args);
		}
	}
	function callWithDelay(millis) {
		retryTimeoutId = setTimeout(() => {
			retryTimeoutId = null;
			doRequest(responseHandler, canceled());
		}, millis);
	}
	function clearGlobalTimeout() {
		if (globalTimeoutId) clearTimeout(globalTimeoutId);
	}
	function responseHandler(success, ...args) {
		if (triggeredCallback) {
			clearGlobalTimeout();
			return;
		}
		if (success) {
			clearGlobalTimeout();
			triggerCallback.call(null, success, ...args);
			return;
		}
		if (canceled() || hitTimeout) {
			clearGlobalTimeout();
			triggerCallback.call(null, success, ...args);
			return;
		}
		if (waitSeconds < 64) waitSeconds *= 2;
		let waitMillis;
		if (cancelState === 1) {
			cancelState = 2;
			waitMillis = 0;
		} else waitMillis = (waitSeconds + Math.random()) * 1e3;
		callWithDelay(waitMillis);
	}
	let stopped = false;
	function stop(wasTimeout) {
		if (stopped) return;
		stopped = true;
		clearGlobalTimeout();
		if (triggeredCallback) return;
		if (retryTimeoutId !== null) {
			if (!wasTimeout) cancelState = 2;
			clearTimeout(retryTimeoutId);
			callWithDelay(0);
		} else if (!wasTimeout) cancelState = 1;
	}
	callWithDelay(0);
	globalTimeoutId = setTimeout(() => {
		hitTimeout = true;
		stop(true);
	}, timeout);
	return stop;
}
/**
* Stops the retry loop from repeating.
* If the function is currently "in between" retries, it is invoked immediately
* with the second parameter as "true". Otherwise, it will be invoked once more
* after the current invocation finishes iff the current invocation would have
* triggered another retry.
*/
function stop(id) {
	id(false);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isJustDef(p) {
	return p !== void 0;
}
function validateNumber(argument, minValue, maxValue, value) {
	if (value < minValue) throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
	if (value > maxValue) throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function makeQueryString(params) {
	const encode = encodeURIComponent;
	let queryPart = "?";
	for (const key in params) if (params.hasOwnProperty(key)) {
		const nextPart = encode(key) + "=" + encode(params[key]);
		queryPart = queryPart + nextPart + "&";
	}
	queryPart = queryPart.slice(0, -1);
	return queryPart;
}
/**
* Error codes for requests made by the XhrIo wrapper.
*/
var ErrorCode;
(function(ErrorCode) {
	ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
	ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
	ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Checks the status code to see if the action should be retried.
*
* @param status Current HTTP status code returned by server.
* @param additionalRetryCodes additional retry codes to check against
*/
function isRetryStatusCode(status, additionalRetryCodes) {
	const isFiveHundredCode = status >= 500 && status < 600;
	const isExtraRetryCode = [408, 429].indexOf(status) !== -1;
	const isAdditionalRetryCode = additionalRetryCodes.indexOf(status) !== -1;
	return isFiveHundredCode || isExtraRetryCode || isAdditionalRetryCode;
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Handles network logic for all Storage Requests, including error reporting and
* retries with backoff.
*
* @param I - the type of the backend's network response.
* @param - O the output type used by the rest of the SDK. The conversion
* happens in the specified `callback_`.
*/
var NetworkRequest = class {
	constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_, retry = true, isUsingEmulator = false) {
		this.url_ = url_;
		this.method_ = method_;
		this.headers_ = headers_;
		this.body_ = body_;
		this.successCodes_ = successCodes_;
		this.additionalRetryCodes_ = additionalRetryCodes_;
		this.callback_ = callback_;
		this.errorCallback_ = errorCallback_;
		this.timeout_ = timeout_;
		this.progressCallback_ = progressCallback_;
		this.connectionFactory_ = connectionFactory_;
		this.retry = retry;
		this.isUsingEmulator = isUsingEmulator;
		this.pendingConnection_ = null;
		this.backoffId_ = null;
		this.canceled_ = false;
		this.appDelete_ = false;
		this.promise_ = new Promise((resolve, reject) => {
			this.resolve_ = resolve;
			this.reject_ = reject;
			this.start_();
		});
	}
	/**
	* Actually starts the retry loop.
	*/
	start_() {
		const doTheRequest = (backoffCallback, canceled) => {
			if (canceled) {
				backoffCallback(false, new RequestEndStatus(false, null, true));
				return;
			}
			const connection = this.connectionFactory_();
			this.pendingConnection_ = connection;
			const progressListener = (progressEvent) => {
				const loaded = progressEvent.loaded;
				const total = progressEvent.lengthComputable ? progressEvent.total : -1;
				if (this.progressCallback_ !== null) this.progressCallback_(loaded, total);
			};
			if (this.progressCallback_ !== null) connection.addUploadProgressListener(progressListener);
			connection.send(this.url_, this.method_, this.isUsingEmulator, this.body_, this.headers_).then(() => {
				if (this.progressCallback_ !== null) connection.removeUploadProgressListener(progressListener);
				this.pendingConnection_ = null;
				const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
				const status = connection.getStatus();
				if (!hitServer || isRetryStatusCode(status, this.additionalRetryCodes_) && this.retry) {
					backoffCallback(false, new RequestEndStatus(false, null, connection.getErrorCode() === ErrorCode.ABORT));
					return;
				}
				backoffCallback(true, new RequestEndStatus(this.successCodes_.indexOf(status) !== -1, connection));
			});
		};
		/**
		* @param requestWentThrough - True if the request eventually went
		*     through, false if it hit the retry limit or was canceled.
		*/
		const backoffDone = (requestWentThrough, status) => {
			const resolve = this.resolve_;
			const reject = this.reject_;
			const connection = status.connection;
			if (status.wasSuccessCode) try {
				const result = this.callback_(connection, connection.getResponse());
				if (isJustDef(result)) resolve(result);
				else resolve();
			} catch (e) {
				reject(e);
			}
			else if (connection !== null) {
				const err = unknown();
				err.serverResponse = connection.getErrorText();
				if (this.errorCallback_) reject(this.errorCallback_(connection, err));
				else reject(err);
			} else if (status.canceled) reject(this.appDelete_ ? appDeleted() : canceled());
			else reject(retryLimitExceeded());
		};
		if (this.canceled_) backoffDone(false, new RequestEndStatus(false, null, true));
		else this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
	}
	/** @inheritDoc */
	getPromise() {
		return this.promise_;
	}
	/** @inheritDoc */
	cancel(appDelete) {
		this.canceled_ = true;
		this.appDelete_ = appDelete || false;
		if (this.backoffId_ !== null) stop(this.backoffId_);
		if (this.pendingConnection_ !== null) this.pendingConnection_.abort();
	}
};
/**
* A collection of information about the result of a network request.
* @param opt_canceled - Defaults to false.
*/
var RequestEndStatus = class {
	constructor(wasSuccessCode, connection, canceled) {
		this.wasSuccessCode = wasSuccessCode;
		this.connection = connection;
		this.canceled = !!canceled;
	}
};
function addAuthHeader_(headers, authToken) {
	if (authToken !== null && authToken.length > 0) headers["Authorization"] = "Firebase " + authToken;
}
function addVersionHeader_(headers, firebaseVersion) {
	headers["X-Firebase-Storage-Version"] = "webjs/" + (firebaseVersion ?? "AppManager");
}
function addGmpidHeader_(headers, appId) {
	if (appId) headers["X-Firebase-GMPID"] = appId;
}
function addAppCheckHeader_(headers, appCheckToken) {
	if (appCheckToken !== null) headers["X-Firebase-AppCheck"] = appCheckToken;
}
function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion, retry = true, isUsingEmulator = false) {
	const queryPart = makeQueryString(requestInfo.urlParams);
	const url = requestInfo.url + queryPart;
	const headers = Object.assign({}, requestInfo.headers);
	addGmpidHeader_(headers, appId);
	addAuthHeader_(headers, authToken);
	addVersionHeader_(headers, firebaseVersion);
	addAppCheckHeader_(headers, appCheckToken);
	return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory, retry, isUsingEmulator);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @fileoverview Contains helper methods for manipulating paths.
*/
/**
* @return Null if the path is already at the root.
*/
function parent(path) {
	if (path.length === 0) return null;
	const index = path.lastIndexOf("/");
	if (index === -1) return "";
	return path.slice(0, index);
}
/**
* Returns the last component of a path.
* '/foo/bar' -> 'bar'
* '/foo/bar/baz/' -> 'baz/'
* '/a' -> 'a'
*/
function lastComponent(path) {
	const index = path.lastIndexOf("/", path.length - 2);
	if (index === -1) return path;
	else return path.slice(index + 1);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provides methods to interact with a bucket in the Firebase Storage service.
* @internal
* @param _location - An fbs.location, or the URL at
*     which to base this object, in one of the following forms:
*         gs://<bucket>/<object-path>
*         http[s]://firebasestorage.googleapis.com/
*                     <api-version>/b/<bucket>/o/<object-path>
*     Any query or fragment strings will be ignored in the http[s]
*     format. If no value is passed, the storage object will use a URL based on
*     the project ID of the base firebase.App instance.
*/
var Reference = class Reference {
	constructor(_service, location) {
		this._service = _service;
		if (location instanceof Location) this._location = location;
		else this._location = Location.makeFromUrl(location, _service.host);
	}
	/**
	* Returns the URL for the bucket and path this object references,
	*     in the form gs://<bucket>/<object-path>
	* @override
	*/
	toString() {
		return "gs://" + this._location.bucket + "/" + this._location.path;
	}
	_newRef(service, location) {
		return new Reference(service, location);
	}
	/**
	* A reference to the root of this object's bucket.
	*/
	get root() {
		const location = new Location(this._location.bucket, "");
		return this._newRef(this._service, location);
	}
	/**
	* The name of the bucket containing this reference's object.
	*/
	get bucket() {
		return this._location.bucket;
	}
	/**
	* The full path of this object.
	*/
	get fullPath() {
		return this._location.path;
	}
	/**
	* The short name of this object, which is the last component of the full path.
	* For example, if fullPath is 'full/path/image.png', name is 'image.png'.
	*/
	get name() {
		return lastComponent(this._location.path);
	}
	/**
	* The `StorageService` instance this `StorageReference` is associated with.
	*/
	get storage() {
		return this._service;
	}
	/**
	* A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
	* this reference is the root.
	*/
	get parent() {
		const newPath = parent(this._location.path);
		if (newPath === null) return null;
		const location = new Location(this._location.bucket, newPath);
		return new Reference(this._service, location);
	}
	/**
	* Utility function to throw an error in methods that do not accept a root reference.
	*/
	_throwIfRoot(name) {
		if (this._location.path === "") throw invalidRootOperation(name);
	}
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function extractBucket(host, config) {
	const bucketString = config?.[CONFIG_STORAGE_BUCKET_KEY];
	if (bucketString == null) return null;
	return Location.makeFromBucketSpec(bucketString, host);
}
function connectStorageEmulator$1(storage, host, port, options = {}) {
	storage.host = `${host}:${port}`;
	const useSsl = isCloudWorkstation(host);
	if (useSsl) pingServer(`https://${storage.host}/b`);
	storage._isUsingEmulator = true;
	storage._protocol = useSsl ? "https" : "http";
	const { mockUserToken } = options;
	if (mockUserToken) storage._overrideAuthToken = typeof mockUserToken === "string" ? mockUserToken : createMockUserToken(mockUserToken, storage.app.options.projectId);
}
/**
* A service that provides Firebase Storage Reference instances.
* @param opt_url - gs:// url to a custom Storage Bucket
*
* @internal
*/
var FirebaseStorageImpl = class {
	constructor(app, _authProvider, _appCheckProvider, _url, _firebaseVersion, _isUsingEmulator = false) {
		this.app = app;
		this._authProvider = _authProvider;
		this._appCheckProvider = _appCheckProvider;
		this._url = _url;
		this._firebaseVersion = _firebaseVersion;
		this._isUsingEmulator = _isUsingEmulator;
		this._bucket = null;
		/**
		* This string can be in the formats:
		* - host
		* - host:port
		*/
		this._host = DEFAULT_HOST;
		this._protocol = "https";
		this._appId = null;
		this._deleted = false;
		this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
		this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
		this._requests = /* @__PURE__ */ new Set();
		if (_url != null) this._bucket = Location.makeFromBucketSpec(_url, this._host);
		else this._bucket = extractBucket(this._host, this.app.options);
	}
	/**
	* The host string for this service, in the form of `host` or
	* `host:port`.
	*/
	get host() {
		return this._host;
	}
	set host(host) {
		this._host = host;
		if (this._url != null) this._bucket = Location.makeFromBucketSpec(this._url, host);
		else this._bucket = extractBucket(host, this.app.options);
	}
	/**
	* The maximum time to retry uploads in milliseconds.
	*/
	get maxUploadRetryTime() {
		return this._maxUploadRetryTime;
	}
	set maxUploadRetryTime(time) {
		validateNumber("time", 0, Number.POSITIVE_INFINITY, time);
		this._maxUploadRetryTime = time;
	}
	/**
	* The maximum time to retry operations other than uploads or downloads in
	* milliseconds.
	*/
	get maxOperationRetryTime() {
		return this._maxOperationRetryTime;
	}
	set maxOperationRetryTime(time) {
		validateNumber("time", 0, Number.POSITIVE_INFINITY, time);
		this._maxOperationRetryTime = time;
	}
	async _getAuthToken() {
		if (this._overrideAuthToken) return this._overrideAuthToken;
		const auth = this._authProvider.getImmediate({ optional: true });
		if (auth) {
			const tokenData = await auth.getToken();
			if (tokenData !== null) return tokenData.accessToken;
		}
		return null;
	}
	async _getAppCheckToken() {
		if (_isFirebaseServerApp(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
		const appCheck = this._appCheckProvider.getImmediate({ optional: true });
		if (appCheck) return (await appCheck.getToken()).token;
		return null;
	}
	/**
	* Stop running requests and prevent more from being created.
	*/
	_delete() {
		if (!this._deleted) {
			this._deleted = true;
			this._requests.forEach((request) => request.cancel());
			this._requests.clear();
		}
		return Promise.resolve();
	}
	/**
	* Returns a new firebaseStorage.Reference object referencing this StorageService
	* at the given Location.
	*/
	_makeStorageReference(loc) {
		return new Reference(this, loc);
	}
	/**
	* @param requestInfo - HTTP RequestInfo object
	* @param authToken - Firebase auth token
	*/
	_makeRequest(requestInfo, requestFactory, authToken, appCheckToken, retry = true) {
		if (!this._deleted) {
			const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion, retry, this._isUsingEmulator);
			this._requests.add(request);
			request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
			return request;
		} else return new FailRequest(appDeleted());
	}
	async makeRequestWithTokens(requestInfo, requestFactory) {
		const [authToken, appCheckToken] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()]);
		return this._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
	}
};
var name = "@firebase/storage";
var version = "0.14.3";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Type constant for Firebase Storage.
*/
var STORAGE_TYPE = "storage";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Gets a {@link FirebaseStorage} instance for the given Firebase app.
* @public
* @param app - Firebase app to get {@link FirebaseStorage} instance for.
* @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
* If not passed, uses the app's default Storage Bucket.
* @returns A {@link FirebaseStorage} instance.
*/
function getStorage(app = getApp(), bucketUrl) {
	app = getModularInstance(app);
	const storageInstance = _getProvider(app, STORAGE_TYPE).getImmediate({ identifier: bucketUrl });
	const emulator = getDefaultEmulatorHostnameAndPort("storage");
	if (emulator) connectStorageEmulator(storageInstance, ...emulator);
	return storageInstance;
}
/**
* Modify this {@link FirebaseStorage} instance to communicate with the Cloud Storage emulator.
*
* @param storage - The {@link FirebaseStorage} instance
* @param host - The emulator host (ex: localhost)
* @param port - The emulator port (ex: 5001)
* @param options - Emulator options. `options.mockUserToken` is the mock auth
* token to use for unit testing Security Rules.
* @public
*/
function connectStorageEmulator(storage, host, port, options = {}) {
	connectStorageEmulator$1(storage, host, port, options);
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Cloud Storage for Firebase
*
* @packageDocumentation
*/
function factory(container, { instanceIdentifier: url }) {
	return new FirebaseStorageImpl(container.getProvider("app").getImmediate(), container.getProvider("auth-internal"), container.getProvider("app-check-internal"), url, SDK_VERSION);
}
function registerStorage() {
	_registerComponent(new Component(STORAGE_TYPE, factory, "PUBLIC").setMultipleInstances(true));
	registerVersion(name, version);
}
registerStorage();
//#endregion
export { getStorage as t };
