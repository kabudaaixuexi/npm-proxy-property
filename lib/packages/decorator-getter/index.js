"use strict";
module.exports = (target, name, descriptor) => {
    descriptor.value = function (key) {
        const self = this;
        // 暂时放到这里    
        // !self.initialize ? (self.proxyState = {...self.target, ...self.proxyState}, self.testInitialize() ) : false
        return key ? self.target[key] : self.target;
    };
};
