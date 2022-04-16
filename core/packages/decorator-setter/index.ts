module.exports = (target: Target, name: String, descriptor: PropertyDescriptor) => {
    descriptor.value = function (data: Target, key?: Target): void {
      const self: Target = this
      key && (self.proxyState[key] = data)
      !key && (
          Object.entries(data).forEach(([k, v]) => {self.proxyState[k] = v})
      )
      self.config.usePersisted && sessionStorage.setItem('l20ornzg',JSON.stringify(self.proxyState))
    };
  };
  