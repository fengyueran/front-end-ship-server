---
title: JavaScript 中 var 和 let 去区别
tags: [JavaScript]
type: SHORT_ANSWER
date: 2018-1-07 18:10:20
---

let 为 ES6 新增的命令，用来声明变量，用法与 var 类似，其区别如下:

- 有效范围

  在 ES6 之前，JS 函数只有函数作用域和全局作用域，没有块级作用域，所以`{}`不能限制 var 所声明的变量的访问范围，而 let 声明的变量只在 let 声明时的代码块内有效。

  ```
  {
    let a = 1;
    var b = 2;
  }

  a // ReferenceError: a is not defined.
  b // 2
  ```

- 变量提升

  let 不存在变量提升，var 存在变量提升。

  ```
    console.log(a); // undefined
    var a = 1;

    console.log(b); // Uncaught ReferenceError
    let b = 2;
  ```

- 重复声明

  let 不能重复声明，var 可以重复声明。

  ```
    var a = 1;
    var a = 2;

    let b = 1;
    let b = 2; //Identifier 'b' has already been declared
  ```

- 暂时性死区

  let 有暂时性死区约束，如下在全局声明了变量 a，又在块级作用域用 let 声明了 a，ES6 明确规定，如果块级作用域内存在 let 或 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭区域。凡是在声明之前使用这些变量，就会报错，这在语法上称为暂时性死区。

  ```
  var a = 1;
  if (true) {
    a = 2;// ReferenceError
    let a;
  }
  ```
