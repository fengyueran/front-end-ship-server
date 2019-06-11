---
title: 什么是 Polyfill
tags: [OTHER]
type: SHORT_ANSWER
date: 2017-11-06 18:10:20
---

Polyfill 是英国 Web 开发者[Remy Sharp](https://remysharp.com/)想出来的名词，来源于英国的一个家装产品 Polyfilla(刮墙的,在中国称为腻子)，可以磨平墙上的裂缝。Remy Sharp 以此来表达用于实现一些浏览器不支持的原生 API 的代码。比如有些浏览器不支持 Array.isArray 函数，为了让这些浏览器可以支持这个 api，我们就可以实现如下 polyfill:

```
if(!Array.isArray) {
  Array.isArray = function(obj) {
    return Object.prototype.toString().call(obj) === "[object Array]";
  }
}
```
