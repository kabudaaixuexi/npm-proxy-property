"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (...[, , descriptor]) => {
    descriptor.writable = false;
    return descriptor;
};
