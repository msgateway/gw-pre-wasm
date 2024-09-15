import * as wasm from "./recrypt_wasm_binding_bg.wasm";
import { __wbg_set_wasm } from "./recrypt_wasm_binding_bg.js";
__wbg_set_wasm(wasm);
export * from "./recrypt_wasm_binding_bg.js";
