export default (target: Target, name: String, descriptor: PropertyDescriptor) => {
  descriptor.value = function (key?: Target) {
    const self: Target = this
    return key ? self.target[key] : self.target
  };
};
