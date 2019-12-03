---
title: label 的作用是什么
tags: [HTML]
type: SHORT_ANSWER
date: 2017-1-06 18:10:20
---

label 标签用来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转移到和该标签相关联的表单控件上。
如下: 通过将 label 标签的属性 for 的值设置为 input 的 id 就可以将 label 和 input 关联起来，点击 label 时就可以选中 radio 类型的表单了。

```
  <div>
    <label for="Name">Number:</label>
    <input type="radio" id="Name"/>
  </div>
```
