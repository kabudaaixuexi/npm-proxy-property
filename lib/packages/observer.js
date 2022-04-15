"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRun = exports.computed = exports.observable = exports.observer = void 0;
require("reflect-metadata");
var DecoratorType;
(function (DecoratorType) {
    DecoratorType["Observable"] = "observable";
    DecoratorType["Computed"] = "computed";
})(DecoratorType || (DecoratorType = {}));
let runningEffect = null;
let runningComputed = null;
function subscribe(observer, effect) {
    observer.add(effect); // 收集 effect 回调信息
    effect.deps.add(observer); // effect 也需要和 observer 建立联系，用于后续解绑操作
}
function injectObservableKeys(obj, keys = []) {
    keys.forEach((key) => {
        let value = obj[key];
        let subscribes = new Set();
        Object.defineProperty(obj, key, {
            get() {
                // 依赖收集，runningComputed 优先
                subscribe(subscribes, runningComputed || runningEffect);
                return value;
            },
            set(updated) {
                value = updated;
                // 复制一份新的依赖队列遍历，千万不要在原对象上遍历，因为在执行回调时，又会绑定新的依赖项，造成无限循环
                [...subscribes].forEach((effect) => effect.execute());
            },
        });
    });
}
function injectComputedKeys(obj, keys = []) {
    keys.forEach((computed) => {
        let subscribes = new Set();
        const executeComputedGetter = () => {
            cleanup(effect);
            // 用另个标识标记 computed effect
            runningComputed = effect;
            try {
                return computed.fn.call(obj);
            }
            finally {
                runningComputed = null;
            }
        };
        // computed 的 execute 就是让其依赖回调都执行一遍
        const execute = () => {
            [...subscribes].forEach((effect) => effect.execute());
        };
        const effect = {
            execute,
            deps: new Set(),
        };
        Object.defineProperty(obj, computed.key, {
            get() {
                subscribe(subscribes, runningEffect);
                return executeComputedGetter();
            },
        });
    });
}
// observer
function observer(target) {
    // 拿到所有的 observable 属性名
    const observableKeys = Reflect.getMetadata(DecoratorType.Observable, target.prototype);
    const computedKeys = Reflect.getMetadata(DecoratorType.Computed, target.prototype);
    // 返回一个新的类
    return class extends target {
        constructor() {
            super(); // 调用 super 方法完成属性初始化
            injectObservableKeys(this, observableKeys); // 处理其中的 observable keys
            injectComputedKeys(this, computedKeys);
        }
    };
}
exports.observer = observer;
// observable 用于收集所有响应式属性
const observable = (target, key) => {
    var _a;
    const keys = (_a = Reflect.getMetadata(DecoratorType.Observable, target)) !== null && _a !== void 0 ? _a : [];
    keys.push(key);
    Reflect.defineMetadata(DecoratorType.Observable, keys, target);
};
exports.observable = observable;
const computed = (target, key, descriptor) => {
    var _a;
    const keys = (_a = Reflect.getMetadata(DecoratorType.Computed, target)) !== null && _a !== void 0 ? _a : [];
    // 假定所有 computed 都是 getter
    keys.push({ key, fn: descriptor.get });
    Reflect.defineMetadata(DecoratorType.Computed, keys, target);
};
exports.computed = computed;
function cleanup(effect) {
    effect.deps.forEach((dep) => {
        dep.delete(effect);
    });
    effect.deps.clear();
}
function autoRun(fn) {
    const execute = () => {
        // 双向解绑
        cleanup(effect);
        // 设置当前 effect 变量
        runningEffect = effect;
        try {
            fn();
        }
        finally {
            runningEffect = null;
        }
    };
    // 每一个 effect 需要包含一个需要在依赖属性变化执行的回调，以及它所依赖的属性的 subscribe 几何
    const effect = {
        execute,
        deps: new Set(),
    };
    // 先执行依次，建立依赖关系
    execute();
}
exports.autoRun = autoRun;
