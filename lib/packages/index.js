"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Set = exports.Readonly = exports.Watch = exports.Get = exports.InitializeWarehouse = void 0;
const decorator_warehouse_1 = __importDefault(require("./decorator-warehouse"));
exports.InitializeWarehouse = decorator_warehouse_1.default;
const decorator_getter_1 = __importDefault(require("./decorator-getter"));
exports.Get = decorator_getter_1.default;
const decorator_setter_1 = __importDefault(require("./decorator-setter"));
exports.Set = decorator_setter_1.default;
const Readonly_1 = __importDefault(require("./Readonly"));
exports.Readonly = Readonly_1.default;
const Watch = require('./decorator-watch');
exports.Watch = Watch;
