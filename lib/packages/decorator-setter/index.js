"use strict";
module.exports = (target, name, descriptor) => {
    descriptor.value = function (data, key) {
        const self = this;
        key && (self.proxyState[key] = data);
        !key && (Object.entries(data).forEach(([k, v]) => { self.proxyState[k] = v; }));
    };
};
