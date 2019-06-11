---
title: Cookie, SessionStorage 与 LocalStorage 区别
tags: [HTML]
type: SHORT_ANSWER
date: 2017-5-06 18:10:20
---

[demo](https://github.com/fengyueran/web-cache-demo.git)

- 储存大小
  - Cookie: 4kb 左右
  - SessionStorage: 一般为 5M
  - LocalStorage: 一般为 5M
- 生命周期
  - Cookie: 默认是关闭浏览器后失效，可以设置失效时间
  - SessionStorage: 仅在当前会话有效，关闭 tab 页即失效
  - LocalStorage: 持久缓存除非主动清除(通过浏览器或 JS)
- 与服务器通信
  - Cookie: 每次请求都会携带在 http 请求头中，可能带来性能问题
  - SessionStorage: 只在客户端起作用
  - LocalStorage: 只在客户端起作用
