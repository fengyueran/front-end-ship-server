---
title: 页面可见性 Page Visibility API 可以有哪些用途
tags: [HTML]
type: SHORT_ANSWER
date: 2019-1-15 18:10:20
---

在 web 页面的开发中，如何判断用户是不是还在与页面交互是一个重要的问题，比如页面最小化了或隐藏在其他标签页后面，这时我们就可以做关闭页面正在播放的音乐或其他什么事情。
Page Visibility API 由三部分构造:

- document.hidden: 表示页面是否隐藏的布尔值
- document.visibilityState: 有 4 个可能的状态值
  - hidden: 页面在后台标签页或浏览器最小化，此时页面对用户不可见
  - visible: 页面在前台标签页，此时页面至少有部分是可见的
  - prerender: 页面正在进行预渲染处理，文档只能从这个状态开始，不可能由其它状态变为这个状态，此时
    document.hidden 为 true，
  - unloaded: 页面从内存中卸载清除
- visibilitychange 事件: document.visibilityState 状态发生变化时触发

  ```
  document.addEventListener('visibilitychange', () => {
    console.log(document.visibilityState);
  });
  ```
