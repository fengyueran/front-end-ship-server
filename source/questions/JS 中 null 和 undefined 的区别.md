---
title: JS 中 null 和 undefined 的区别
tags: [JavaScript]
type: SHORT_ANSWER
date: 2016-5-06 18:10:20
---

由于历史原因 JavaScript 中有 null 和 undefined 两个表示无的值，其区别很小，主要在于:

- null 的类型为 Object，undefined 的类型为 undefined
- Number(null)为 0，Number(undefined)为 NaN
- null 表示没有对象，此处不该有值，undefined 表示此处应该有值暂时缺少这个值
