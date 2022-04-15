"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creatStore = require('./initialize');
exports.default = (target, config = {
    usePersisted: false,
    useDecorator: false
}) => creatStore(target, config);
