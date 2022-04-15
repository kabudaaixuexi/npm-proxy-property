import { deepClone } from '../../utils'

module.exports = (...[,,descriptor]: PropertyDescriptor[]) => {
    // const origin = descriptor.value;
    descriptor.value = async function (key: Target, callback: Target, performance: Boolean = false ): Promise<void> {
      const self: Target = this
      self.callbacks = Object.assign({}, self.callbacks, {
        [key]: self.callbacks[key] || []
      });
      // 限制监听粒度
      self.callbacks[key] = [callback]
      // 代理仓库数据
      self.proxyState = new Proxy(self.proxyState, {
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
      if (self.config.usePersisted) {
        const state = await deepClone(sessionStorage.getItem('l20ornzg'))
        state && self.setState(state)
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem('l20ornzg',JSON.stringify(self.proxyState))
        })
    }
    };
  };