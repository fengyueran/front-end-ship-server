---
title: JS中加减乘除的规则
tags: [JavaScript]
type: SHORT_ANSWER
date: 2017-4-08 18:10:20
---

**3、** JS 中加减乘除的规则

**加法**
JS 中的加法要么是数值和数值相加，要么是字符串和字符串相加，所有其他类型都会转换为这两种类型。

- 如果有一个操作数为 NaN，则结果是 NaN;
- 如果 Infinity 加 Infinity，结果为 Infinity;
- 如果-Infinity 加-Infinity，结果为-Infinity;
- 如果 Infinity 加-Infinity，结果为 NaN;
- 如果+0 加+0，结果是+0;
- 如果-0 加-0，结果为-0;
- 如果+0 加-0，结果为+0;
- 如果两个操作数为字符串，则将两个数拼接起来;
- 如果只有一个操作数为字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来;
- 如果只有一个操作数为数值，另一个操作数为 null 或 undefined，则将 null 和 undefined 转换为数值，再将两个数值进行相加;
  ```
  '1' + null //"1null"
   1 + null // 1, Number(null) => 0
  '1' + undefined //"1undefined"
   1 + undefined //NaN, Number(undefined) => NaN
  ```
- 如果有一个操作数为对象，则调用对象的 toString()方法将其转换为字符串，再应用上面的规则进行计算
  ```
   var func = function(){};
   '1' + func //"1function(){}"
    1 + null //"1function(){}"
  ```
