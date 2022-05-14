"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (target, name, descriptor) => {
    descriptor.value = function (key) {
        const self = this;
        return key ? (self.proxyState[key] || self.target[key]) : (self.proxyState || self.target);
    };
};
