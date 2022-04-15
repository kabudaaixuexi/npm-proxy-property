module.exports = (target: Target, name: String, descriptor: PropertyDescriptor) => {
  descriptor.value = function (key?: Target) {
    const self: Target = this
    // 暂时放到这里
    !self.initialize ? (self.proxyState = {...self.target, ...self.proxyState}, self.ininitialize ++ ) : false
    return key ? self.proxyState[key]: self.proxyState
  };
};
