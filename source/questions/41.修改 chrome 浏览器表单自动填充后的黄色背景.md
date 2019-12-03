---
title: 修改 chrome 浏览器表单自动填充后的黄色背景
tags: [HTML, CSS]
type: SHORT_ANSWER
date: 2019-1-06 18:10:20
---

- 取消 chrome 的自动填充

  ```
   <input autoComplete="new-password" />
  ```

- 设置内阴影来覆盖黄色背景

  ```
  &: -webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    -webkit-text-fill-color: black;
  }
  ```

- 设置动画

  通过动画设置其背景永远为透明。

  ```
  &:-webkit-autofill {
    animation: autofill-fix 1s infinite;
  }

  @keyframes autofill-fix {
    from {
      background-color: transparent;
    }
    to {
      background-color: transparent;
    }
  }
  ```
