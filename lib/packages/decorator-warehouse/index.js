"use strict";
module.exports = (prototies) => {
    prototies.prototype.proxyState = {};
    prototies.prototype.callbacks = [];
    prototies.prototype.flushCallbacks = () => {
    };
};
