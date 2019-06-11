---
title: link 和@import 的区别
tags: [HTML, CSS]
type: SHORT_ANSWER
date: 2018-5-06 18:10:20
---

- 从属关系不同

  link 属于 XHTML 提供的标签，除了加载 CSS 外还可以做其他事情，比如定义 RSS、定义 rel 连接属性等，而@import 只能用于加载 CSS。

- 加载时机不同

  link 引用 CSS 时，在页面加载的同时加载，而@import 引用的 CSS 要在页面加载完后再加载。

- 兼容性不同

  link 属于 XHTML 标签，无兼容性问题。而@import 是在 CSS2.1 提出的，低版本浏览器不支持。

- DOM 可控性的不同

  link 支持使用 JavaScript 控制 DOM 去改变样式，而@import 不支持。
