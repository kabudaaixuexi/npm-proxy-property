"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (...[, , descriptor]) => {
    // const origin = descriptor.value;
    descriptor.value = function (key, callback, performance = false) {
        const self = this;
        self.callbacks = Object.assign({}, self.callbacks, {
            [key]: self.callbacks[key] || []
        });
        self.callbacks[key] = [...self.callbacks[key], callback];
        // 代理仓库数据
        self.proxyState = new Proxy(self.target, {
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
        if (self.config.usePersisted && sessionStorage.getItem('l20ornzg')) {
            window.addEventListener("beforeunload", () => self.setState(JSON.parse(sessionStorage.getItem("l20ornzg") || 'null')));
        }
    };
};
