"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialize_1 = require("./initialize");
exports.default = (target, config = {
    usePersisted: false,
    useDecorator: false
}) => new initialize_1.initStore(target, config);
