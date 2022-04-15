"use strict";
module.exports = (target, name, descriptor) => {
    descriptor.value = function (key) {
        const self = this;
        // 暂时放到这里
        !self.initialize ? (self.proxyState = Object.assign(Object.assign({}, self.target), self.proxyState), self.ininitialize++) : false;
        return key ? self.proxyState[key] : self.proxyState;
    };
};
