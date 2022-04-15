"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
module.exports = (...[, , descriptor]) => {
    // const origin = descriptor.value;
    descriptor.value = function (key, callback, performance = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            self.callbacks = Object.assign({}, self.callbacks, {
                [key]: self.callbacks[key] || []
            });
            // 限制监听粒度
            self.callbacks[key] = [callback];
            // 代理仓库数据
            self.proxyState = new Proxy(self.proxyState, {
                get(t, n, r) {
                    return Reflect.get(t, n, r);
                },
                set(t, n, v, r) {
                    Array.isArray(self.callbacks[n]) && self.callbacks[n].forEach((copies) => copies(v, self.proxyState[n]));
                    return Reflect.set(t, n, v, r);
                }
            });
            // 初次加载监听
            performance && self.setState(self.proxyState);
            // session存储
            if (self.config.usePersisted) {
                const state = yield (0, utils_1.deepClone)(sessionStorage.getItem('l20ornzg'));
                state && self.setState(state);
                window.addEventListener("beforeunload", () => {
                    sessionStorage.setItem('l20ornzg', JSON.stringify(self.getState()));
                });
            }
        });
    };
};
