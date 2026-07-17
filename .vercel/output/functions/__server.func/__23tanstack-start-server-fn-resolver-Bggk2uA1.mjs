//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Bggk2uA1.js
var manifest = { "2d004edce7ad7c7cf5a418fe9c731652ee988ecbf89fdba4fd187bb1e2a742c8": {
	functionName: "createPreferenceFn_createServerFn_handler",
	importer: () => import("./_ssr/checkout-wzC1-pwh.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
