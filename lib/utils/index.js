"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.getUuiD = void 0;
function getUuiD(randomLength = Math.random()) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}
exports.getUuiD = getUuiD;
function deepClone(O) {
    return new Promise((resolve, reject) => {
        try {
            const { port1, port2 } = new MessageChannel();
            port2.onmessage = function (e) {
                resolve(e.data);
            };
            port1.postMessage(O);
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.deepClone = deepClone;
