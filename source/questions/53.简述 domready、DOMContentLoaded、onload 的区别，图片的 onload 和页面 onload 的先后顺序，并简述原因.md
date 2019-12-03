---
title: 简述 domready、DOMContentLoaded、onload 的区别，图片的 onload 和页面 onload 的先后顺序，并简述原因
tags: [HTML]
type: SHORT_ANSWER
date: 2017-4-08 18:10:20
---

**DOM 文档的加载步骤如下:**

- 1. 解析 html 文档结构
- 2. 加载外部的脚本和样式表文件
- 3. 解析并执行脚本
- 4. dom 树构建完成(DOMContentLoaded)
- 5. 加载图片等外部文件
- 6. 页面加载完毕

**domready:**

也就是 dom 构建完成，它不是一个标准的事件，DOMContentLoaded 后表明 dom ready 了。

**DOMContentLoaded:**

第四步完成后触发，即在 dom 解析完成后执行，无需等待样式表、图像、子框架等的加载，需要注意的是 DOMContentLoaded 事件必须等待所有 script 加载解析完成后才会触发。

```
document.addEventListener("DOMContentLoaded", () => alert("DOMContentLoaded"));
```

**图片 onload**:

第五步图片加载完成后触发

**页面 onload**:

dom，外部图片、javascript 文件、CSS 文件等资源都加载完成后(包括脚本里通过创建 dom 动态添加的资源)触发，所以一定是在图片的 onload 事件后触发。

```
window.onload = () => {
    alert("window onload");
};
```
