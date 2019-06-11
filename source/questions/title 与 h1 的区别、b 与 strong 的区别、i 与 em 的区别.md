---
title: title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别
tags: [HTML]
type: SHORT_ANSWER
date: 2016-10-06 18:10:20
---

- title vs h1

  title 是关于元素的额外信息，当鼠标移动元素上时显示一段提示文本，而 h1 表示层次明确的标题，对页面信息的抓取也有很大影响。

- b vs strong

  b 表示粗体文本，并没有明确的语义，而 strong 表示强调，有语气加强的含义，使用阅读设备阅读时`<strong>`会重读。

- i vs em

  i 表示斜体，em 表示强调的内容。

以上主要是自然样式标签和语义样式标签的差别，应该多用语义样式标签，但不能滥用。

- 自然样式标签
  ```
  b, i, u, s, pre
  ```
- 语义样式标签
  ```
  strong, em, ins, del, code
  ```
