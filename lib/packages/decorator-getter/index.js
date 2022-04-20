"use strict";
module.exports = (target, name, descriptor) => {
    descriptor.value = function (key) {
        const self = this;
        return key ? self.target[key] : self.target;
    };
};
