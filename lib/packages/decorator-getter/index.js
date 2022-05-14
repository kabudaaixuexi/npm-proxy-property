"use strict";
module.exports = (target, name, descriptor) => {
    descriptor.value = function (key) {
        const self = this;
        console.log(self, 'self', key, 'key');
        return key ? self.target[key] : self.target;
    };
};
