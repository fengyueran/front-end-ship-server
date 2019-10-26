---
title: requireJS 的核心原理是什么
tags: [OTHER]
type: SHORT_ANSWER
date: 2018-6-06 18:10:20
---

requireJS 是基于 AMD 模块加载规范，使用回调函数来解决模块加载的问题。

- 核心原理

  通过创建 script 标签，给标签设置 src 属性来实现模块加载的。

- 避免二次加载

  模块定义了一个 function，这个 function 实际是一个 factory(工厂模式)，这个 factory 在需要(require("xxx"))的时候才有可能被调用，如果检查到已经调用过，生成了模块实例，则直接返回实例而不再调用工厂方法。

- 缓存

  - 第一次加载模块时，会缓存该模块，以后再加载该模块，就直接从缓存中取出该模块的 module.exports 属性(不会再次执行该模块)。
  - 如果需要多次执行模块中的代码，一般可以让模块暴露函数。
  - 模块的缓存可以通过 require.cache 拿到，同样也可以删除。
