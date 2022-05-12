### 基于js的proxy属性开发的一个插件，处理前端应用中的公共数据状态。

+ 介绍

不依赖任何外部库也无关开发模式，核心是利用proxy的代理特性进行数据代理，监听对象状态变更返回回调，类似vue2源码中的数据劫持依赖收集。

兼容性同 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy 'Proxy')

<span class="color1">使用方式（以vue项目为例）</span>

+ 安装

```
pnpm i @akar/proxy-property 或 npm i @akar/proxy-property
```

+ 引入

```
/** store/index.ts */ 

import moon from '@akar/proxy-property'

const state = {
    todo : {
        github_account: 'kabudaaixuexi'
    }
}

export default moon(
    state,
    {
        usePersisted: false // 是否做session缓存
    }
)
```

+ 组件内使用

```
import moon from '@/store'

moon.getState('todo') // kabudaaixuexi

moon.watch('todo',(newVal,oldVal)=>{
    console.log(newVal) // { github_account: 'akar' }
    console.log(oldVal) // { github_account: 'kabudaaixuexi' } 
}, false) // 是否初始化时调用

moon.setState({
    github_account: 'akar'
}, 'todo')
```


+ 建议

@akar/proxy-property是一个小型的工具函数，代码简单，实现了单项数据流对数据的代理监控，只关心数据层，所以当涉及到视图层的时候需要利用watch函数主动更新视图。可以尝试在项目中使用。

[webpack5联邦模块学习点击这里](https://webpack.docschina.org/blog/2020-12-08-roadmap-2021/#hot-module-replacement-for-module-federation "Module Federation")