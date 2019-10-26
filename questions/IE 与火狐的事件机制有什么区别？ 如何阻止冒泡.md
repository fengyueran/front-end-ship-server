---
title: IE 与火狐的事件机制有什么区别？ 如何阻止冒泡
tags: [OTHER]
type: SHORT_ANSWER
date: 2017-8-08 18:10:20
---

如下，inner 和 outer 都绑定单击事件，当点击 inner 时，事件应如何传递呢，是 inner 先触发单击事件，还是 outer 先触发？

```
<div id="outer">
  <span id="inner">
    Click
  </span>
</div>
```

**事件冒泡和事件捕获**

- 事件冒泡

  IE 的事件机制就是事件冒泡，事件冒泡，如同将石头丢入水底，泡泡会从水底，逐渐向上，直到水面，消失。也就是说事件会从最内层元素触发，并向上传播，直到 document 对象。
  因此，IE 事件机制处理上述的例子中 span 元素的单击事件顺序为: span=>div>body=>html=>document

- 事件捕获

  事件捕获是网景提出来的事件流，它和事件冒泡正好相反，事件会从最外层元素开始触发，直到具体的元素。
  因此，事件捕获机制处理上述的例子中 span 元素的单击事件顺序为: document=>html=>body=>div=>span
  火狐支持事件冒泡和事件捕获。

**addEventListener 函数**

W3C 折中了事件冒泡和事件捕获，制定了先捕获后冒泡的标准，addEventListener 的第三个参数决定了事件是在捕获阶段还是在冒泡阶段触发。

```
/*
  event: 事件名
  function: 触发事件时执行的函数
  useCapture: 默认值为false，指定事件是在捕获阶段还是在冒泡阶段触发
*/
element.addEventListener(event, function, useCapture)
```

**实例**

冒泡阶段触发:

```
  //点击span，输出innner，再输出outer
  <div id="outer">
    <span id="inner">
      Click
    </span>
  </div>
  <script>
    const outer = document.getElementById("outer");
    outer.addEventListener("click", (e) => console.log("outer"));
    const innner = document.getElementById("innner");
    innner.addEventListener("click", (e) => console.log("innner"));
  </script>
```

捕获阶段触发:

```
  //点击span，输出outer，再输出innner
  <div id="outer">
    <span id="inner">
      Click
    </span>
  </div>
  <script>
    const outer = document.getElementById("outer");
    outer.addEventListener("click", (e) => console.log("outer"), true);
    const innner = document.getElementById("innner");
    innner.addEventListener("click", (e) => console.log("innner")，true);
  </script>
```

如果元素同时绑定了捕获和冒泡阶段的事件，则先响应捕获阶段的事件，再响应冒泡阶段的事件。

阻止冒泡:
通过 e.stopPropagation 函数来阻止事件传播。

```
  //点击span，只输出outer，
  <div id="outer">
    <span id="inner">
      Click
    </span>
  </div>
  <script>
    const outer = document.getElementById("outer");
    outer.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("outer"), true);
    }
    const innner = document.getElementById("innner");
    innner.addEventListener("click", (e) => console.log("innner")，true);
  </script>
```
