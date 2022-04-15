"use strict";
module.exports = (...[, , descriptor]) => {
    descriptor.writable = false;
    return descriptor;
};
