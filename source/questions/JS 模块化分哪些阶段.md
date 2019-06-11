---
title: JS 模块化分哪些阶段
tags: [JavaScript]
type: SHORT_ANSWER
date: 2018-3-16 18:10:20
---

- 无模块化

  js 最初的作用只是进行表单验证或添加一些简单的动画，js 文件通过`script`标签进行引用，没有模块化一说，随着前端复杂度提高想要引入更多的 js 文件就把多个`script`标签放在一起。

  ```
    <script src="script1.js"></script>
    <script src="script2.js"></script>
    <script src="script3.js"></script>
  ```

  - 优点

    相对于把所有逻辑放入一个文件，这种引入多个 js 文件实现简单模块化的思想是进步的。

  - 缺点

    污染全局作用域，文件间依赖关系不明显。

- CommonJS 规范

  CommonJS 是一个 JavaScript 模块化规范，最初用于服务端的 node。根据这个规范一个文件就是一个模块，其内部定义的变量函数只属于这个模块而不对外暴露。CommonJS 通过 exports 或 module.exports 来导出需要对外提供的接口，通过 require 方法来同步加载所要依赖的模块。

  - 模块定义

    ```
    // util.js
    var x = 0;
    var add = function (value) {
      return value + x;
    };
    exports.x = x;
    module.exports.add = add;
    ```

  - 模块使用

    ```
     var util = require(./util.js);
     console.log(util.x); // 0
     console.log(util.add(1)); // 1
    ```

  - 优点

    解决了全局污染及模块间依赖的问题

  - 缺点

    CommonJS 为同步加载，在服务端因其文件都在本地，同步加载没有问题，但在浏览器端文件需要异步加载 CommonJS 就不再适用了。

- AMD 规范

  AMD(Asynchronous Module Definition)规范为异步加载模块，并允许指定回调函数，实现 AMD 规范的加载器 JS 主要有两个 require.js 和 curl.js，AMD 推崇依赖前置。
  AMD 标准中定义了两个 API，define 和 require:

  - 模块定义: define(id, [depends], callback)

    ```
    //math.js，定义了一个math模块
    define(function () {
      var add = function (x, y) {
        return x + y;
      }
      return {
        add: add,
      };
    });
    ```

  - 模块使用: require([module], callback)

    ```
      require(['math'], function (math){
        console.log(math.add(1,1));
      });
    ```

  - 优点

    适合在浏览器环境中异步加载模块，并可以并行加载多个模块。

  - 缺点

    提高了开发成本，且不能按需加载，而是必须提前加载所有的依赖。

- CMD 规范

  CMD(Common Module Definition)规范是 seajs 推崇的规范，与 requirejs 类似，其不同点在于其加载模式为按需加载，CMD 推崇依赖就近。

  ```
  define(function(require, exports, module) {
    var a = require('pdf.js');
    a.doSomething();
    // 依赖就近书写，什么时候用到什么时候引入
    var b = require('./b');
    b.doSomething();
  });
  ```

  - 优点

    实现了异步加载模块，并可以按需加载。

  - 缺点

    依赖 SPM 打包，模块的加载逻辑偏重。

- ES6 模块化

  前面的模块化方法都是社区自己实现的，而 ES6 的模块化方案是真正的规范。在 ES6 中通过 import 关键字引入模块，export 关键字导出模块，目前浏览器尚不支持 ES6 因此需要用 babel 将代码转换为广泛支持的 require。

  ```
    import React from 'react';

    const Home = (<div>hello</div>);

    export default Home;
  ```
