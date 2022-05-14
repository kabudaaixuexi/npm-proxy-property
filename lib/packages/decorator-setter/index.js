"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (target, name, descriptor) => {
    descriptor.value = function (data, key) {
        const self = this;
        key && (self.proxyState[key] = data);
        !key && (Object.entries(data).forEach(([k, v]) => { self.proxyState[k] = v; }));
        self.config.usePersisted && sessionStorage.setItem('l20ornzg', JSON.stringify(self.proxyState));
    };
};
