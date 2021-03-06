export default (...[,,descriptor]: any[]) => {
    // const origin = descriptor.value;
    descriptor.value = function (key: Target, callback: Target, performance: Boolean = false ): void {
      const self: Target = this
      self.callbacks = Object.assign({}, self.callbacks, {
        [key]: self.callbacks[key] || []
      });
      self.callbacks[key] = [...self.callbacks[key], callback]
      // 代理仓库数据
      self.proxyState = new Proxy(self.target, {
        get (t, n, r) {
            return Reflect.get(t, n, r)
        },
        set (t, n, v, r) {
            Array.isArray(self.callbacks[n]) && self.callbacks[n].forEach((copies: Target) => copies(v, self.proxyState[n]))
            return Reflect.set(t, n, v, r)
        }
      })
      // 初次加载监听
      performance && self.setState(self.proxyState)
      // session存储
      if (self.config.usePersisted && sessionStorage.getItem('l20ornzg')) {
          window.addEventListener("beforeunload",()=> self.setState(JSON.parse(sessionStorage.getItem("l20ornzg") || 'null')))
      }
    };
  };